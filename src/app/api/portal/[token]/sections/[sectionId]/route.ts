import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  req: Request,
  { params }: { params: { token: string; sectionId: string } }
) {
  try {
    // Verify project exists and is active
    const project = await prisma.onboardingProject.findUnique({
      where: { accessToken: params.token },
      include: {
        sections: {
          include: { responses: true },
        },
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    if (project.status === "draft" || project.status === "completed" || project.status === "archived") {
      return NextResponse.json(
        { error: "Project is not accepting updates" },
        { status: 400 }
      )
    }

    const { responses, markComplete, markNotApplicable } = await req.json()

    // Find the section
    const section = project.sections.find((s) => s.id === params.sectionId)
    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }

    // Update responses if provided
    if (responses && Array.isArray(responses)) {
      for (const response of responses) {
        await prisma.fieldResponse.update({
          where: { id: response.id },
          data: { value: response.value },
        })
      }
    }

    // Update section status
    let sectionStatus = section.status

    if (markNotApplicable) {
      sectionStatus = "not_applicable"
    } else if (markComplete) {
      sectionStatus = "completed"
    } else if (section.status === "pending") {
      sectionStatus = "in_progress"
    }

    await prisma.projectSection.update({
      where: { id: params.sectionId },
      data: { status: sectionStatus },
    })

    // Update project status if needed
    if (project.status === "sent") {
      await prisma.onboardingProject.update({
        where: { id: project.id },
        data: { status: "in_progress" },
      })
    }

    // Calculate new completion percentage
    const updatedSections = await prisma.projectSection.findMany({
      where: { projectId: project.id },
    })

    const completedCount = updatedSections.filter(
      (s) => s.status === "completed" || s.status === "not_applicable"
    ).length

    const completionPercent = Math.round((completedCount / updatedSections.length) * 100)

    await prisma.onboardingProject.update({
      where: { id: project.id },
      data: {
        completionPercent,
        lastClientActivity: new Date(),
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: markComplete ? "completed" : "updated",
        entityType: "section",
        entityId: params.sectionId,
        projectId: project.id,
        isClientAction: true,
        details: JSON.stringify({ sectionName: section.name }),
      },
    })

    return NextResponse.json({
      sectionStatus,
      completionPercent,
    })
  } catch (error) {
    console.error("Error updating section:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

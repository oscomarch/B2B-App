import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify project belongs to organization
    const project = await prisma.onboardingProject.findFirst({
      where: {
        id: params.id,
        organizationId: session.user.organizationId,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    if (project.status !== "draft") {
      return NextResponse.json(
        { error: "Project has already been sent" },
        { status: 400 }
      )
    }

    // Update project status
    const updated = await prisma.onboardingProject.update({
      where: { id: params.id },
      data: {
        status: "sent",
        sentAt: new Date(),
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "sent",
        entityType: "project",
        entityId: project.id,
        projectId: project.id,
        userId: session.user.id,
        details: JSON.stringify({
          clientEmail: project.clientEmail,
          sentAt: new Date().toISOString(),
        }),
      },
    })

    // TODO: Send email notification to client if email is provided

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error sending project:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

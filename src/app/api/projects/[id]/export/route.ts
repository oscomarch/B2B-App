import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
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
      include: {
        template: true,
        sections: {
          orderBy: { order: "asc" },
          include: {
            responses: { orderBy: { order: "asc" } },
          },
        },
        credentials: { orderBy: { createdAt: "asc" } },
        tasks: { orderBy: { order: "asc" } },
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Build CSV content
    const rows: string[] = []

    // Header info
    rows.push(`Onboarding Export - ${project.clientName}`)
    rows.push(`Template: ${project.template.name}`)
    rows.push(`Status: ${project.status}`)
    rows.push(`Completion: ${project.completionPercent}%`)
    rows.push(`Created: ${project.createdAt.toISOString()}`)
    rows.push("")

    // Sections and responses
    rows.push("SECTION,FIELD,VALUE,REQUIRED")

    for (const section of project.sections) {
      for (const response of section.responses) {
        const value = response.value || response.fileUrl || ""
        rows.push(
          `"${section.name}","${response.fieldLabel}","${value.replace(/"/g, '""')}","${response.isRequired ? "Yes" : "No"}"`
        )
      }
    }

    rows.push("")

    // Credentials
    rows.push("CREDENTIALS")
    rows.push("SYSTEM,TYPE,USERNAME,STATUS")

    for (const cred of project.credentials) {
      rows.push(
        `"${cred.systemName}","${cred.systemType || ""}","${cred.username || ""}","${cred.status}"`
      )
    }

    rows.push("")

    // Tasks
    rows.push("INTERNAL TASKS")
    rows.push("TASK,STATUS")

    for (const task of project.tasks) {
      rows.push(`"${task.title}","${task.status}"`)
    }

    const csv = rows.join("\n")

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "exported",
        entityType: "project",
        entityId: project.id,
        projectId: project.id,
        userId: session.user.id,
      },
    })

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${project.clientName.replace(/[^a-z0-9]/gi, "-")}-onboarding.csv"`,
      },
    })
  } catch (error) {
    console.error("Error exporting project:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

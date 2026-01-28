import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projects = await prisma.onboardingProject.findMany({
      where: { organizationId: session.user.organizationId },
      orderBy: { updatedAt: "desc" },
      include: {
        template: { select: { name: true, type: true } },
        _count: {
          select: {
            sections: true,
            credentials: true,
            tasks: true,
          },
        },
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { clientName, clientEmail, clientPhone, templateId, notes } = await req.json()

    if (!clientName || !templateId) {
      return NextResponse.json(
        { error: "Client name and template are required" },
        { status: 400 }
      )
    }

    // Get the template with its sections and fields
    const template = await prisma.onboardingTemplate.findUnique({
      where: { id: templateId },
      include: {
        sections: {
          orderBy: { order: "asc" },
          include: {
            fields: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    })

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      )
    }

    // Create the project with sections and field responses
    const project = await prisma.onboardingProject.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        notes,
        templateId,
        organizationId: session.user.organizationId,
        owners: {
          connect: { id: session.user.id },
        },
        sections: {
          create: template.sections.map((section) => ({
            name: section.name,
            description: section.description,
            icon: section.icon,
            order: section.order,
            isRequired: section.isRequired,
            responses: {
              create: section.fields.map((field) => ({
                fieldLabel: field.label,
                fieldType: field.type,
                isRequired: field.isRequired,
                order: field.order,
              })),
            },
          })),
        },
        // Create default internal tasks
        tasks: {
          create: [
            { title: "Review submitted information", order: 1 },
            { title: "Validate credentials access", order: 2 },
            { title: "Create internal accounts", order: 3 },
            { title: "Configure monitoring tools", order: 4 },
            { title: "Document in PSA/ITGlue", order: 5 },
            { title: "Final review and approval", order: 6 },
          ],
        },
      },
      include: {
        template: true,
        sections: {
          include: { responses: true },
        },
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "created",
        entityType: "project",
        entityId: project.id,
        projectId: project.id,
        userId: session.user.id,
        details: JSON.stringify({ clientName }),
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

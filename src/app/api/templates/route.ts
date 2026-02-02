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

    const templates = await prisma.onboardingTemplate.findMany({
      where: { organizationId: session.user.organizationId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { sections: true },
        },
      },
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error("Error fetching templates:", error)
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

    const { name, description, type, isDefault, sections } = await req.json()

    // If this is set as default, unset other defaults
    if (isDefault) {
      await prisma.onboardingTemplate.updateMany({
        where: {
          organizationId: session.user.organizationId,
          isDefault: true,
        },
        data: { isDefault: false },
      })
    }

    const template = await prisma.onboardingTemplate.create({
      data: {
        name,
        description,
        type: type || "new_client",
        isDefault: isDefault || false,
        organizationId: session.user.organizationId,
        sections: sections
          ? {
              create: sections.map((section: { name: string; description?: string; icon?: string; order: number; isRequired?: boolean }) => ({
                name: section.name,
                description: section.description || null,
                icon: section.icon || "folder",
                order: section.order,
                isRequired: section.isRequired !== false,
              })),
            }
          : undefined,
      },
      include: {
        sections: true,
      },
    })

    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error("Error creating template:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

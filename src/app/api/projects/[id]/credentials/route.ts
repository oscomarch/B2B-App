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
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const credentials = await prisma.credential.findMany({
      where: { projectId: params.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(credentials)
  } catch (error) {
    console.error("Error fetching credentials:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

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

    const { systemName, systemType, username, notes } = await req.json()

    if (!systemName) {
      return NextResponse.json(
        { error: "System name is required" },
        { status: 400 }
      )
    }

    const credential = await prisma.credential.create({
      data: {
        systemName,
        systemType,
        username,
        notes,
        projectId: params.id,
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "created",
        entityType: "credential",
        entityId: credential.id,
        projectId: params.id,
        userId: session.user.id,
        details: JSON.stringify({ systemName }),
      },
    })

    return NextResponse.json(credential, { status: 201 })
  } catch (error) {
    console.error("Error creating credential:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

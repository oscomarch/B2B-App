import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { encrypt } from "@/lib/encryption"

export async function PATCH(
  req: Request,
  { params }: { params: { token: string; credentialId: string } }
) {
  try {
    // Verify project exists and is active
    const project = await prisma.onboardingProject.findUnique({
      where: { accessToken: params.token },
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

    const { secureLink, oneTimeSecret, notes } = await req.json()

    const updateData: any = {
      status: "received",
      receivedAt: new Date(),
    }

    if (secureLink) {
      updateData.secureLink = secureLink
    }

    if (oneTimeSecret) {
      updateData.encryptedSecret = encrypt(oneTimeSecret)
    }

    if (notes !== undefined) {
      updateData.notes = notes
    }

    const credential = await prisma.credential.update({
      where: { id: params.credentialId },
      data: updateData,
    })

    // Update last client activity
    await prisma.onboardingProject.update({
      where: { id: project.id },
      data: { lastClientActivity: new Date() },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "provided",
        entityType: "credential",
        entityId: credential.id,
        projectId: project.id,
        isClientAction: true,
        details: JSON.stringify({ systemName: credential.systemName }),
      },
    })

    return NextResponse.json({
      id: credential.id,
      status: credential.status,
    })
  } catch (error) {
    console.error("Error updating credential:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { decrypt } from "@/lib/encryption"

// GET - Retrieve credential with decrypted secret (marks as viewed)
export async function GET(
  req: Request,
  { params }: { params: { id: string; credentialId: string } }
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

    const credential = await prisma.credential.findUnique({
      where: { id: params.credentialId },
    })

    if (!credential) {
      return NextResponse.json({ error: "Credential not found" }, { status: 404 })
    }

    // Decrypt the secret if it exists
    let decryptedSecret: string | null = null
    if (credential.encryptedSecret) {
      try {
        decryptedSecret = decrypt(credential.encryptedSecret)
      } catch {
        decryptedSecret = "[Decryption failed]"
      }

      // Mark as viewed if not already
      if (!credential.secretViewed) {
        await prisma.credential.update({
          where: { id: params.credentialId },
          data: {
            secretViewed: true,
            secretViewedAt: new Date(),
          },
        })

        // Log the view
        await prisma.activityLog.create({
          data: {
            action: "viewed_secret",
            entityType: "credential",
            entityId: credential.id,
            projectId: params.id,
            userId: session.user.id,
            details: JSON.stringify({ systemName: credential.systemName }),
          },
        })
      }
    }

    return NextResponse.json({
      ...credential,
      decryptedSecret,
    })
  } catch (error) {
    console.error("Error fetching credential:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; credentialId: string } }
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

    const data = await req.json()
    const updateData: any = {}

    if (data.status) {
      updateData.status = data.status
      if (data.status === "received" || data.status === "verified") {
        updateData.receivedAt = new Date()
      }
    }

    if (data.systemName) updateData.systemName = data.systemName
    if (data.systemType !== undefined) updateData.systemType = data.systemType
    if (data.username !== undefined) updateData.username = data.username
    if (data.notes !== undefined) updateData.notes = data.notes

    const credential = await prisma.credential.update({
      where: { id: params.credentialId },
      data: updateData,
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "updated",
        entityType: "credential",
        entityId: credential.id,
        projectId: params.id,
        userId: session.user.id,
        details: JSON.stringify(data),
      },
    })

    return NextResponse.json(credential)
  } catch (error) {
    console.error("Error updating credential:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; credentialId: string } }
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

    await prisma.credential.delete({
      where: { id: params.credentialId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting credential:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sendPortalInvite } from "@/lib/email"

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
      include: {
        organization: true,
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

    // Build portal URL
    const baseUrl = process.env.NEXTAUTH_URL || 'https://getrelay.fr'
    const portalUrl = `${baseUrl}/onboard/${project.accessToken}`

    // Send email if client email is provided
    let emailSent = false
    if (project.clientEmail && process.env.RESEND_API_KEY) {
      try {
        await sendPortalInvite({
          to: project.clientEmail,
          clientName: project.clientName,
          mspName: project.organization.name,
          portalUrl,
        })
        emailSent = true
      } catch (emailError) {
        console.error("Failed to send email:", emailError)
        // Continue anyway - we'll still update the status
      }
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
          emailSent,
          portalUrl,
          sentAt: new Date().toISOString(),
        }),
      },
    })

    return NextResponse.json({
      ...updated,
      portalUrl,
      emailSent,
    })
  } catch (error) {
    console.error("Error sending project:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

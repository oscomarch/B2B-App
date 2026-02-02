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

    // Parse request body for custom message
    let customMessage: string | undefined
    try {
      const body = await req.json()
      customMessage = body.customMessage
    } catch {
      // No body or invalid JSON - that's fine
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

    // Check if project is archived - don't allow sending
    if (project.status === "archived") {
      return NextResponse.json(
        { error: "Cannot send archived projects" },
        { status: 400 }
      )
    }

    const isResend = project.status !== "draft"

    // Build portal URL from request headers
    const host = req.headers.get('host') || 'getrelay.fr'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const portalUrl = `${protocol}://${host}/onboard/${project.accessToken}`

    // Send email if client email is provided
    let emailSent = false
    if (project.clientEmail && process.env.RESEND_API_KEY) {
      try {
        await sendPortalInvite({
          to: project.clientEmail,
          clientName: project.clientName,
          mspName: project.organization.name,
          portalUrl,
          customMessage,
        })
        emailSent = true
      } catch (emailError) {
        console.error("Failed to send email:", emailError)
        return NextResponse.json(
          { error: "Failed to send email. Please check your email configuration." },
          { status: 500 }
        )
      }
    } else if (!project.clientEmail) {
      return NextResponse.json(
        { error: "No client email address provided" },
        { status: 400 }
      )
    } else if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured. Please add RESEND_API_KEY." },
        { status: 500 }
      )
    }

    // Update project status (only set sentAt if it's the first time)
    const updated = await prisma.onboardingProject.update({
      where: { id: params.id },
      data: {
        status: "sent",
        sentAt: isResend ? project.sentAt : new Date(),
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: isResend ? "resent email" : "sent",
        entityType: "project",
        entityId: project.id,
        projectId: project.id,
        userId: session.user.id,
        details: JSON.stringify({
          clientEmail: project.clientEmail,
          emailSent,
          portalUrl,
          customMessage: customMessage || null,
          sentAt: new Date().toISOString(),
          isResend,
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

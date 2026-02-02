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

    // Get email activity logs for this project
    const activities = await prisma.activityLog.findMany({
      where: {
        projectId: params.id,
        action: {
          in: ["sent", "resent email"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Parse and format the email records
    const emails = activities.map((activity) => {
      let details: {
        clientEmail?: string
        customMessage?: string | null
        isResend?: boolean
        sentAt?: string
      } = {}

      try {
        details = JSON.parse(activity.details || "{}")
      } catch {
        // Invalid JSON, use empty object
      }

      return {
        id: activity.id,
        sentAt: details.sentAt || activity.createdAt.toISOString(),
        clientEmail: details.clientEmail || project.clientEmail || "",
        customMessage: details.customMessage || null,
        isResend: details.isResend || activity.action === "resent email",
      }
    })

    return NextResponse.json({ emails })
  } catch (error) {
    console.error("Failed to fetch email history:", error)
    return NextResponse.json(
      { error: "Failed to fetch email history" },
      { status: 500 }
    )
  }
}

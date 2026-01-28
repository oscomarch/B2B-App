import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ClientPortal } from "@/components/portal/client-portal"

async function getProject(token: string) {
  return prisma.onboardingProject.findUnique({
    where: { accessToken: token },
    include: {
      organization: {
        select: {
          name: true,
          logo: true,
          primaryColor: true,
        },
      },
      template: {
        select: {
          name: true,
          type: true,
        },
      },
      sections: {
        orderBy: { order: "asc" },
        include: {
          responses: {
            orderBy: { order: "asc" },
          },
        },
      },
      credentials: {
        orderBy: { createdAt: "asc" },
      },
    },
  })
}

export default async function OnboardingPortalPage({
  params,
}: {
  params: { token: string }
}) {
  const project = await getProject(params.token)

  if (!project) {
    notFound()
  }

  // Don't allow access to draft projects
  if (project.status === "draft") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portal Not Ready</h1>
          <p className="text-gray-500">
            This onboarding portal has not been activated yet. Please contact your MSP.
          </p>
        </div>
      </div>
    )
  }

  // Show completed state
  if (project.status === "completed" || project.status === "archived") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Onboarding Complete</h1>
          <p className="text-gray-500">
            Thank you for completing the onboarding process for {project.clientName}.
          </p>
        </div>
      </div>
    )
  }

  // Update last client activity
  await prisma.onboardingProject.update({
    where: { id: project.id },
    data: { lastClientActivity: new Date() },
  })

  // Log view activity
  await prisma.activityLog.create({
    data: {
      action: "viewed",
      entityType: "project",
      entityId: project.id,
      projectId: project.id,
      isClientAction: true,
    },
  })

  return <ClientPortal project={project} />
}

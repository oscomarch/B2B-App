import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { FolderKanban, Clock, CheckCircle, AlertCircle, ExternalLink, ArrowRight, Copy } from "lucide-react"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Projects | Relay",
  description: "Manage your client onboarding projects",
}

async function getProjects(organizationId: string) {
  return prisma.onboardingProject.findMany({
    where: { organizationId },
    orderBy: { updatedAt: "desc" },
    include: {
      template: { select: { name: true, type: true } },
      sections: {
        include: {
          responses: true,
        },
      },
      credentials: true,
      tasks: true,
      _count: {
        select: {
          sections: true,
          credentials: true,
          tasks: true,
        },
      },
    },
  })
}

const statusConfig = {
  draft: { label: "Draft", color: "bg-neutral-100 text-neutral-600" },
  sent: { label: "Sent", color: "bg-blue-50 text-blue-600" },
  in_progress: { label: "In Progress", color: "bg-amber-50 text-amber-600" },
  completed: { label: "Completed", color: "bg-green-50 text-green-600" },
  archived: { label: "Archived", color: "bg-neutral-100 text-neutral-500" },
}

function calculateBlocking(project: any) {
  let clientBlocking = 0
  let mspBlocking = 0

  // Check sections for incomplete fields
  project.sections?.forEach((section: any) => {
    section.responses?.forEach((response: any) => {
      if (!response.value && response.responsibility === "client") {
        clientBlocking++
      } else if (!response.value && response.responsibility === "msp") {
        mspBlocking++
      }
    })
  })

  // Check credentials
  project.credentials?.forEach((cred: any) => {
    if (cred.status === "requested") {
      clientBlocking++
    }
  })

  // Check tasks
  project.tasks?.forEach((task: any) => {
    if (!task.completed) {
      mspBlocking++
    }
  })

  return { clientBlocking, mspBlocking }
}

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const projects = await getProjects(session.user.organizationId)

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === "in_progress").length
  const totalBlocking = projects.reduce((acc, p) => {
    const { clientBlocking } = calculateBlocking(p)
    return acc + clientBlocking
  }, 0)

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-medium text-neutral-900 tracking-[-0.02em] mb-2">
          Projects
        </h1>
        <p className="text-[15px] text-neutral-500">
          Track client onboarding progress and see what's blocking.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/60">
          <p className="text-[12px] font-medium uppercase tracking-wider text-neutral-400 mb-1">Active Projects</p>
          <p className="text-[32px] font-medium text-neutral-900">{activeProjects}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/60">
          <p className="text-[12px] font-medium uppercase tracking-wider text-neutral-400 mb-1">Awaiting Client</p>
          <p className="text-[32px] font-medium text-amber-600">{totalBlocking}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/60">
          <p className="text-[12px] font-medium uppercase tracking-wider text-neutral-400 mb-1">Total Projects</p>
          <p className="text-[32px] font-medium text-neutral-900">{projects.length}</p>
        </div>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="p-16 rounded-2xl bg-white border border-neutral-200/60 text-center">
          <div
            className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, rgba(59, 130, 196, 0.1) 0%, rgba(155, 123, 170, 0.08) 100%)" }}
          >
            <FolderKanban className="h-8 w-8 text-[#3B82C4]" />
          </div>
          <h3 className="text-[18px] font-medium text-neutral-900 mb-2">No projects yet</h3>
          <p className="text-[14px] text-neutral-500 mb-6 max-w-md mx-auto">
            Create your first onboarding project to start collecting client information securely.
          </p>
          <Link
            href="/app/projects/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium text-white transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            Create Your First Project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const config = statusConfig[project.status as keyof typeof statusConfig]
            const { clientBlocking, mspBlocking } = calculateBlocking(project)
            const portalUrl = `/onboard/${project.accessToken}`

            return (
              <div
                key={project.id}
                className="group p-6 rounded-2xl bg-white border border-neutral-200/60 hover:border-neutral-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Link href={`/app/projects/${project.id}`}>
                        <h3 className="text-[17px] font-semibold text-neutral-900 hover:text-[#3B82C4] transition-colors truncate">
                          {project.clientName}
                        </h3>
                      </Link>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>

                    <p className="text-[13px] text-neutral-500 mb-4">
                      {project.template.name}
                      {project.clientEmail && (
                        <span className="text-neutral-300 mx-2">•</span>
                      )}
                      {project.clientEmail}
                    </p>

                    {/* Blocking indicators */}
                    {(clientBlocking > 0 || mspBlocking > 0) && (
                      <div className="flex items-center gap-4">
                        {clientBlocking > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50">
                            <Clock className="h-3.5 w-3.5 text-amber-500" />
                            <span className="text-[12px] font-medium text-amber-700">
                              {clientBlocking} awaiting client
                            </span>
                          </div>
                        )}
                        {mspBlocking > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50">
                            <AlertCircle className="h-3.5 w-3.5 text-blue-500" />
                            <span className="text-[12px] font-medium text-blue-700">
                              {mspBlocking} for your team
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-4 text-[12px] text-neutral-400">
                      <span>Created {formatDate(project.createdAt)}</span>
                      <span>{project._count.sections} sections</span>
                      <span>{project._count.credentials} credentials</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-6">
                    {/* Progress circle */}
                    <div className="relative">
                      <svg className="h-16 w-16 -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#f5f5f5"
                          strokeWidth="4"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="url(#progressGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${(project.completionPercent / 100) * 176} 176`}
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82C4" />
                            <stop offset="50%" stopColor="#9B7BAA" />
                            <stop offset="100%" stopColor="#C5A882" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[14px] font-semibold text-neutral-900">
                          {project.completionPercent}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/app/projects/${project.id}`}
                        className="px-4 py-2 rounded-xl text-[13px] font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                      >
                        View
                      </Link>
                      {project.status !== "draft" && (
                        <Link
                          href={portalUrl}
                          target="_blank"
                          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

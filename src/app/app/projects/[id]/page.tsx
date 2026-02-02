import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { headers } from "next/headers"
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  Mail,
  Shield,
  Monitor,
  Database,
  FileText,
  Users,
  AppWindow,
  Folder,
  Key,
  ClipboardList,
  Send,
  MoreHorizontal,
} from "lucide-react"
import { formatDate, formatDateTime } from "@/lib/utils"
import { ProjectActions } from "@/components/app/project-actions"
import { CredentialsList } from "@/components/app/credentials-list"
import { TasksList } from "@/components/app/tasks-list"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = await prisma.onboardingProject.findUnique({
    where: { id },
    select: { clientName: true },
  })

  return {
    title: project ? `${project.clientName} | Relay` : "Project | Relay",
    description: "View and manage client onboarding project details",
  }
}

const iconMap: Record<string, any> = {
  building: Building,
  mail: Mail,
  shield: Shield,
  monitor: Monitor,
  database: Database,
  "file-text": FileText,
  users: Users,
  "app-window": AppWindow,
  folder: Folder,
}

const statusConfig = {
  draft: { label: "Draft", color: "bg-neutral-100 text-neutral-600" },
  sent: { label: "Sent", color: "bg-blue-50 text-blue-600" },
  in_progress: { label: "In Progress", color: "bg-amber-50 text-amber-600" },
  completed: { label: "Completed", color: "bg-green-50 text-green-600" },
  archived: { label: "Archived", color: "bg-neutral-100 text-neutral-500" },
}

async function getProject(id: string, organizationId: string) {
  return prisma.onboardingProject.findFirst({
    where: { id, organizationId },
    include: {
      template: true,
      sections: {
        orderBy: { order: "asc" },
        include: {
          responses: {
            orderBy: { order: "asc" },
          },
        },
      },
      credentials: {
        orderBy: { createdAt: "desc" },
      },
      tasks: {
        orderBy: { order: "asc" },
      },
      owners: {
        select: { id: true, name: true, email: true },
      },
      activities: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          user: { select: { name: true } },
        },
      },
    },
  })
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const project = await getProject(params.id, session.user.organizationId)
  if (!project) notFound()

  const config = statusConfig[project.status as keyof typeof statusConfig]

  // Get the host from headers for correct portal URL
  const headersList = await headers()
  const host = headersList.get('host') || 'getrelay.fr'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const portalUrl = `${protocol}://${host}/onboard/${project.accessToken}`

  // Calculate section completion
  const completedSections = project.sections.filter(s => s.status === "completed" || s.status === "not_applicable").length
  const totalSections = project.sections.length

  // Calculate credentials status
  const receivedCredentials = project.credentials.filter(c => c.status === "received" || c.status === "verified").length
  const totalCredentials = project.credentials.length

  // Calculate tasks status
  const completedTasks = project.tasks.filter(t => t.status === "completed").length
  const totalTasks = project.tasks.length

  // Calculate what's blocking
  const clientBlocking = project.sections.reduce((acc, section) => {
    return acc + section.responses.filter(r => !r.value && !r.fileUrl && r.isRequired).length
  }, 0) + project.credentials.filter(c => c.status === "requested").length

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/app/projects"
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[24px] font-medium text-neutral-900 tracking-[-0.02em]">
                {project.clientName}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${config.color}`}>
                {config.label}
              </span>
            </div>
            <p className="text-[14px] text-neutral-500">
              {project.template.name}
              {project.clientEmail && (
                <>
                  <span className="text-neutral-300 mx-2">•</span>
                  {project.clientEmail}
                </>
              )}
            </p>
          </div>
        </div>
        <ProjectActions project={project} portalUrl={portalUrl} />
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/60">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-medium uppercase tracking-wider text-neutral-400">Progress</p>
            <svg className="h-12 w-12 -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#f5f5f5" strokeWidth="4" />
              <circle
                cx="24" cy="24" r="20" fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(project.completionPercent / 100) * 126} 126`}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82C4" />
                  <stop offset="50%" stopColor="#9B7BAA" />
                  <stop offset="100%" stopColor="#C5A882" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-[28px] font-medium text-neutral-900">{project.completionPercent}%</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/60">
          <p className="text-[12px] font-medium uppercase tracking-wider text-neutral-400 mb-3">Sections</p>
          <p className="text-[28px] font-medium text-neutral-900">
            {completedSections}<span className="text-neutral-300">/{totalSections}</span>
          </p>
          <div className="h-1.5 bg-neutral-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(completedSections / totalSections) * 100}%`,
                background: "linear-gradient(90deg, #3B82C4 0%, #9B7BAA 100%)"
              }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/60">
          <p className="text-[12px] font-medium uppercase tracking-wider text-neutral-400 mb-3">Credentials</p>
          <p className="text-[28px] font-medium text-neutral-900">
            {receivedCredentials}<span className="text-neutral-300">/{totalCredentials}</span>
          </p>
          <div className="h-1.5 bg-neutral-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${totalCredentials > 0 ? (receivedCredentials / totalCredentials) * 100 : 0}%`,
                background: "linear-gradient(90deg, #9B7BAA 0%, #C5A882 100%)"
              }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/60">
          <p className="text-[12px] font-medium uppercase tracking-wider text-neutral-400 mb-3">Tasks</p>
          <p className="text-[28px] font-medium text-neutral-900">
            {completedTasks}<span className="text-neutral-300">/{totalTasks}</span>
          </p>
          <div className="h-1.5 bg-neutral-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-neutral-400"
              style={{
                width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* What's Blocking */}
      {clientBlocking > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-amber-900">
                {clientBlocking} item{clientBlocking > 1 ? 's' : ''} awaiting client
              </p>
              <p className="text-[13px] text-amber-700">
                The client needs to provide missing information before you can proceed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Client Portal Link */}
      {project.status !== "draft" && (
        <div
          className="p-5 rounded-2xl mb-8"
          style={{ background: "linear-gradient(135deg, rgba(59, 130, 196, 0.08) 0%, rgba(155, 123, 170, 0.06) 50%, rgba(197, 168, 130, 0.08) 100%)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-neutral-900 mb-1">Client Portal Link</p>
              <p className="text-[13px] text-neutral-500 font-mono">{portalUrl}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors">
                <Copy className="h-4 w-4" />
                Copy
              </button>
              <Link
                href={portalUrl}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-white transition-all hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
              >
                <ExternalLink className="h-4 w-4" />
                Open Portal
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-6">
        {/* Sections */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[16px] font-semibold text-neutral-900 flex items-center gap-2">
              <Folder className="h-4 w-4 text-neutral-400" />
              Sections
            </h2>
          </div>

          {project.sections.map((section) => {
            const Icon = iconMap[section.icon] || Folder
            const completedResponses = section.responses.filter(r => r.value || r.fileUrl).length
            const isComplete = section.status === "completed"

            return (
              <div key={section.id} className="p-5 rounded-2xl bg-white border border-neutral-200/60">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: isComplete ? "rgba(34, 197, 94, 0.1)" : "rgba(59, 130, 196, 0.1)" }}
                    >
                      {isComplete ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Icon className="h-5 w-5 text-[#3B82C4]" />
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-neutral-900">{section.name}</p>
                      {section.description && (
                        <p className="text-[12px] text-neutral-500">{section.description}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[12px] text-neutral-400">
                    {completedResponses}/{section.responses.length} fields
                  </span>
                </div>

                <div className="space-y-2">
                  {section.responses.slice(0, 4).map((response) => (
                    <div key={response.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                      <p className="text-[13px] text-neutral-600">
                        {response.fieldLabel}
                        {response.isRequired && <span className="text-red-400 ml-0.5">*</span>}
                      </p>
                      {response.value || response.fileUrl ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-neutral-300" />
                      )}
                    </div>
                  ))}
                  {section.responses.length > 4 && (
                    <p className="text-[12px] text-neutral-400 pt-1">
                      +{section.responses.length - 4} more fields
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Credentials */}
          <div>
            <h2 className="text-[16px] font-semibold text-neutral-900 flex items-center gap-2 mb-4">
              <Key className="h-4 w-4 text-neutral-400" />
              Credentials
            </h2>
            <CredentialsList projectId={project.id} credentials={project.credentials} />
          </div>

          {/* Tasks */}
          <div>
            <h2 className="text-[16px] font-semibold text-neutral-900 flex items-center gap-2 mb-4">
              <ClipboardList className="h-4 w-4 text-neutral-400" />
              Internal Tasks
            </h2>
            <TasksList projectId={project.id} tasks={project.tasks} />
          </div>

          {/* Activity */}
          <div>
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">Recent Activity</h2>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/60">
              {project.activities.length === 0 ? (
                <p className="text-[13px] text-neutral-400 text-center py-4">No activity yet</p>
              ) : (
                <div className="space-y-3">
                  {project.activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div
                        className="h-2 w-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 100%)" }}
                      />
                      <div>
                        <p className="text-[13px] text-neutral-600">
                          <span className="font-medium text-neutral-900">
                            {activity.isClientAction ? "Client" : activity.user?.name || "System"}
                          </span>
                          {" "}{activity.action}
                        </p>
                        <p className="text-[11px] text-neutral-400">{formatDateTime(activity.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

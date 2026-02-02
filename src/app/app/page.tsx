import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  FolderKanban,
  Clock,
  CheckCircle,
  Send,
  ArrowRight,
  TrendingUp,
} from "lucide-react"

async function getDashboardData(organizationId: string) {
  const [projects, recentActivity] = await Promise.all([
    prisma.onboardingProject.findMany({
      where: { organizationId },
      include: {
        template: { select: { name: true } },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.activityLog.findMany({
      where: {
        project: { organizationId },
      },
      include: {
        project: { select: { clientName: true } },
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ])

  const stats = {
    total: projects.length,
    draft: projects.filter((p) => p.status === "draft").length,
    sent: projects.filter((p) => p.status === "sent").length,
    inProgress: projects.filter((p) => p.status === "in_progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
  }

  const recentProjects = projects.slice(0, 5)

  return { stats, recentProjects, recentActivity }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const { stats, recentProjects, recentActivity } = await getDashboardData(
    session.user.organizationId
  )

  const firstName = session.user.name?.split(" ")[0] || "there"

  const statCards = [
    {
      label: "Total Projects",
      value: stats.total,
      icon: FolderKanban,
      color: "bg-blue-500",
    },
    {
      label: "In Progress",
      value: stats.inProgress + stats.sent,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Awaiting Response",
      value: stats.sent,
      icon: Send,
      color: "bg-purple-500",
    },
  ]

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: "bg-neutral-100 text-neutral-600",
      sent: "bg-blue-100 text-blue-700",
      in_progress: "bg-amber-100 text-amber-700",
      completed: "bg-green-100 text-green-700",
      archived: "bg-neutral-100 text-neutral-500",
    }
    const labels: Record<string, string> = {
      draft: "Draft",
      sent: "Sent",
      in_progress: "In Progress",
      completed: "Completed",
      archived: "Archived",
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${styles[status] || styles.draft}`}>
        {labels[status] || status}
      </span>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-2">
          <FolderKanban className="h-4 w-4" />
          Dashboard
        </div>
        <h1 className="text-[28px] font-semibold text-neutral-900">
          Greetings {firstName},
        </h1>
        <p className="text-[15px] text-neutral-500 mt-1">
          Here's an overview of your client onboarding
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-neutral-200/60 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] text-neutral-500">{stat.label}</span>
                <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`h-4 w-4 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="text-[32px] font-semibold text-neutral-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-neutral-200/60 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-semibold text-neutral-900">Recent Projects</h2>
            <Link
              href="/app/projects"
              className="flex items-center gap-1 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="text-center py-8">
              <FolderKanban className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-[14px] text-neutral-500 mb-3">No projects yet</p>
              <Link
                href="/app/projects/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-white"
                style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
              >
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/app/projects/${project.id}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-[13px] font-semibold text-neutral-600">
                      {project.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {project.clientName}
                      </p>
                      <p className="text-[12px] text-neutral-500">{project.template.name}</p>
                    </div>
                  </div>
                  {getStatusBadge(project.status)}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-neutral-200/60 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-semibold text-neutral-900">Recent Activity</h2>
            <Link
              href="/app/activity"
              className="flex items-center gap-1 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-[14px] text-neutral-500">No activity yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-neutral-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-neutral-700">
                      <span className="font-medium">{activity.user?.name || "System"}</span>
                      {" "}{activity.action}{" "}
                      {activity.project && (
                        <span className="font-medium">{activity.project.clientName}</span>
                      )}
                    </p>
                    <p className="text-[12px] text-neutral-400">{formatDate(activity.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

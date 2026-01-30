import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, FolderKanban, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/lib/utils"

async function getStats(organizationId: string) {
  const [total, draft, inProgress, completed] = await Promise.all([
    prisma.onboardingProject.count({ where: { organizationId } }),
    prisma.onboardingProject.count({ where: { organizationId, status: "draft" } }),
    prisma.onboardingProject.count({ where: { organizationId, status: "in_progress" } }),
    prisma.onboardingProject.count({ where: { organizationId, status: "completed" } }),
  ])

  return { total, draft, inProgress, completed }
}

async function getRecentProjects(organizationId: string) {
  return prisma.onboardingProject.findMany({
    where: { organizationId },
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: {
      template: { select: { name: true } },
    },
  })
}

const statusConfig = {
  draft: { label: "Draft", color: "bg-neutral-100 text-neutral-600", icon: Clock },
  sent: { label: "Sent", color: "bg-blue-soft/10 text-blue-soft", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-coral/10 text-coral-dark", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-green-soft/10 text-green-soft", icon: CheckCircle },
  archived: { label: "Archived", color: "bg-neutral-100 text-neutral-500", icon: FolderKanban },
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const [stats, recentProjects] = await Promise.all([
    getStats(session.user.organizationId),
    getRecentProjects(session.user.organizationId),
  ])

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500 mt-1">Welcome back, {session.user.name}</p>
        </div>
        <Link href="/projects/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-soft p-6">
          <p className="text-sm text-neutral-500 mb-1">Total projects</p>
          <p className="text-3xl font-medium text-neutral-900">{stats.total}</p>
        </div>
        <div className="card-soft p-6">
          <p className="text-sm text-neutral-500 mb-1">Draft</p>
          <p className="text-3xl font-medium text-neutral-400">{stats.draft}</p>
        </div>
        <div className="card-soft p-6">
          <p className="text-sm text-neutral-500 mb-1">In progress</p>
          <p className="text-3xl font-medium text-coral">{stats.inProgress}</p>
        </div>
        <div className="card-soft p-6">
          <p className="text-sm text-neutral-500 mb-1">Completed</p>
          <p className="text-3xl font-medium text-green-soft">{stats.completed}</p>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card-elevated p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-neutral-900">Recent projects</h2>
            <p className="text-sm text-neutral-500">Your latest onboarding projects</p>
          </div>
          <Link href="/projects">
            <Button variant="outline" size="sm" className="gap-2">
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-6">
              <FolderKanban className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects yet</h3>
            <p className="text-neutral-500 mb-6 max-w-sm mx-auto">
              Get started by creating your first onboarding project.
            </p>
            <Link href="/projects/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentProjects.map((project) => {
              const config = statusConfig[project.status as keyof typeof statusConfig]
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-5 rounded-xl border border-neutral-200/60 hover:border-coral/30 hover:bg-coral/5 transition-all duration-200">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-neutral-900 truncate">
                          {project.clientName}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500">
                        {project.template.name} • Updated {formatDate(project.updatedAt)}
                      </p>
                    </div>
                    <div className="ml-6 flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-neutral-900 mb-1">
                          {project.completionPercent}%
                        </p>
                        <Progress value={project.completionPercent} className="w-24 h-1.5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-neutral-400" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/projects/new">
          <div className="card-soft p-6 hover:shadow-elevated transition-all duration-200 cursor-pointer group">
            <div className="h-11 w-11 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Plus className="h-5 w-5 text-coral" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">New client onboarding</h3>
            <p className="text-sm text-neutral-500">Start onboarding a new client</p>
          </div>
        </Link>
        <Link href="/templates">
          <div className="card-soft p-6 hover:shadow-elevated transition-all duration-200 cursor-pointer group">
            <div className="h-11 w-11 rounded-xl bg-blue-soft/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FolderKanban className="h-5 w-5 text-blue-soft" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Manage templates</h3>
            <p className="text-sm text-neutral-500">Customize your onboarding templates</p>
          </div>
        </Link>
        <Link href="/settings">
          <div className="card-soft p-6 hover:shadow-elevated transition-all duration-200 cursor-pointer group">
            <div className="h-11 w-11 rounded-xl bg-green-soft/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <CheckCircle className="h-5 w-5 text-green-soft" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-1">Organization settings</h3>
            <p className="text-sm text-neutral-500">Configure branding and preferences</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

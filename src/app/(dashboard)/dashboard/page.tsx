import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, FolderKanban, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  draft: { label: "Draft", variant: "secondary" as const, icon: Clock },
  sent: { label: "Sent", variant: "info" as const, icon: Clock },
  in_progress: { label: "In Progress", variant: "warning" as const, icon: AlertCircle },
  completed: { label: "Completed", variant: "success" as const, icon: CheckCircle },
  archived: { label: "Archived", variant: "secondary" as const, icon: FolderKanban },
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const [stats, recentProjects] = await Promise.all([
    getStats(session.user.organizationId),
    getRecentProjects(session.user.organizationId),
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {session.user.name}</p>
        </div>
        <Link href="/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Projects</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Draft</CardDescription>
            <CardTitle className="text-3xl text-gray-500">{stats.draft}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.inProgress}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.completed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest onboarding projects</CardDescription>
            </div>
            <Link href="/projects">
              <Button variant="outline" size="sm">View all</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first onboarding project.</p>
              <Link href="/projects/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((project) => {
                const config = statusConfig[project.status as keyof typeof statusConfig]
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {project.clientName}
                          </h3>
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {project.template.name} • Updated {formatDate(project.updatedAt)}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {project.completionPercent}%
                          </p>
                          <Progress value={project.completionPercent} className="w-24 h-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/projects/new">
          <Card className="hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                New Client Onboarding
              </CardTitle>
              <CardDescription>Start onboarding a new client</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/templates">
          <Card className="hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-blue-600" />
                Manage Templates
              </CardTitle>
              <CardDescription>Customize your onboarding templates</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/settings">
          <Card className="hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                Organization Settings
              </CardTitle>
              <CardDescription>Configure branding and preferences</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}

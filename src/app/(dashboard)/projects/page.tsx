import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, FolderKanban, Clock, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatDate, formatDateTime } from "@/lib/utils"

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
  draft: { label: "Draft", variant: "secondary" as const, icon: Clock },
  sent: { label: "Sent", variant: "info" as const, icon: Clock },
  in_progress: { label: "In Progress", variant: "warning" as const, icon: AlertCircle },
  completed: { label: "Completed", variant: "success" as const, icon: CheckCircle },
  archived: { label: "Archived", variant: "secondary" as const, icon: FolderKanban },
}

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const projects = await getProjects(session.user.organizationId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your client onboarding projects</p>
        </div>
        <Link href="/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <FolderKanban className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">
                Create your first onboarding project to start collecting client information securely.
              </p>
              <Link href="/projects/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const config = statusConfig[project.status as keyof typeof statusConfig]
            const portalUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/onboard/${project.accessToken}`

            return (
              <Card key={project.id} className="hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link href={`/projects/${project.id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                            {project.clientName}
                          </h3>
                        </Link>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </div>

                      <p className="text-sm text-gray-500 mb-4">
                        {project.template.name}
                        {project.clientEmail && ` • ${project.clientEmail}`}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>Created {formatDate(project.createdAt)}</span>
                        {project.lastClientActivity && (
                          <span>Last activity {formatDateTime(project.lastClientActivity)}</span>
                        )}
                        <span>{project._count.sections} sections</span>
                        <span>{project._count.credentials} credentials</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 ml-6">
                      <div className="text-right mr-4">
                        <p className="text-2xl font-bold text-gray-900">
                          {project.completionPercent}%
                        </p>
                        <Progress value={project.completionPercent} className="w-32 h-2 mt-1" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        {project.status !== "draft" && (
                          <Link href={`/onboard/${project.accessToken}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

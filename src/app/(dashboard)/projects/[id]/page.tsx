import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Send,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate, formatDateTime } from "@/lib/utils"
import { ProjectActions } from "@/components/projects/project-actions"
import { CredentialsList } from "@/components/projects/credentials-list"
import { TasksList } from "@/components/projects/tasks-list"

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
  draft: { label: "Draft", variant: "secondary" as const, color: "text-gray-500" },
  sent: { label: "Sent", variant: "info" as const, color: "text-blue-500" },
  in_progress: { label: "In Progress", variant: "warning" as const, color: "text-yellow-600" },
  completed: { label: "Completed", variant: "success" as const, color: "text-green-600" },
  archived: { label: "Archived", variant: "secondary" as const, color: "text-gray-400" },
}

const sectionStatusConfig = {
  pending: { label: "Pending", icon: Clock, color: "text-gray-400" },
  in_progress: { label: "In Progress", icon: AlertCircle, color: "text-yellow-500" },
  completed: { label: "Completed", icon: CheckCircle, color: "text-green-500" },
  not_applicable: { label: "N/A", icon: Clock, color: "text-gray-300" },
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
  const portalUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/onboard/${project.accessToken}`

  // Calculate section completion
  const completedSections = project.sections.filter(s => s.status === "completed" || s.status === "not_applicable").length
  const totalSections = project.sections.length

  // Calculate credentials status
  const receivedCredentials = project.credentials.filter(c => c.status === "received" || c.status === "verified").length
  const totalCredentials = project.credentials.length

  // Calculate tasks status
  const completedTasks = project.tasks.filter(t => t.status === "completed").length
  const totalTasks = project.tasks.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{project.clientName}</h1>
              <Badge variant={config.variant}>{config.label}</Badge>
            </div>
            <p className="text-gray-500 mt-1">
              {project.template.name}
              {project.clientEmail && ` • ${project.clientEmail}`}
            </p>
          </div>
        </div>
        <ProjectActions project={project} portalUrl={portalUrl} />
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overall Progress</CardDescription>
            <div className="flex items-center gap-2">
              <CardTitle className="text-3xl">{project.completionPercent}%</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={project.completionPercent} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sections</CardDescription>
            <CardTitle className="text-3xl">
              {completedSections}/{totalSections}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(completedSections / totalSections) * 100} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Credentials</CardDescription>
            <CardTitle className="text-3xl">
              {receivedCredentials}/{totalCredentials}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={totalCredentials > 0 ? (receivedCredentials / totalCredentials) * 100 : 0}
              className="h-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Internal Tasks</CardDescription>
            <CardTitle className="text-3xl">
              {completedTasks}/{totalTasks}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Client Portal Link */}
      {project.status !== "draft" && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-900">Client Portal Link</p>
                <p className="text-sm text-blue-700 font-mono">{portalUrl}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Link href={portalUrl} target="_blank">
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Portal
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="sections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sections" className="gap-2">
            <Folder className="h-4 w-4" />
            Sections ({totalSections})
          </TabsTrigger>
          <TabsTrigger value="credentials" className="gap-2">
            <Key className="h-4 w-4" />
            Credentials ({totalCredentials})
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            Tasks ({totalTasks})
          </TabsTrigger>
        </TabsList>

        {/* Sections Tab */}
        <TabsContent value="sections" className="space-y-4">
          {project.sections.map((section) => {
            const Icon = iconMap[section.icon] || Folder
            const sectionConfig = sectionStatusConfig[section.status as keyof typeof sectionStatusConfig]
            const StatusIcon = sectionConfig.icon
            const completedResponses = section.responses.filter(r => r.value || r.fileUrl).length
            const requiredResponses = section.responses.filter(r => r.isRequired)
            const completedRequired = requiredResponses.filter(r => r.value || r.fileUrl).length

            return (
              <Card key={section.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{section.name}</CardTitle>
                        {section.description && (
                          <CardDescription>{section.description}</CardDescription>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {completedResponses}/{section.responses.length} fields
                      </span>
                      <StatusIcon className={`h-5 w-5 ${sectionConfig.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.responses.map((response) => (
                      <div key={response.id} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">
                            {response.fieldLabel}
                            {response.isRequired && <span className="text-red-500 ml-1">*</span>}
                          </p>
                          {response.value ? (
                            <p className="text-sm text-gray-900 mt-1">{response.value}</p>
                          ) : response.fileUrl ? (
                            <a href={response.fileUrl} className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                              View uploaded file
                            </a>
                          ) : (
                            <p className="text-sm text-gray-400 mt-1 italic">Not provided</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* Credentials Tab */}
        <TabsContent value="credentials">
          <CredentialsList projectId={project.id} credentials={project.credentials} />
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <TasksList projectId={project.id} tasks={project.tasks} />
        </TabsContent>
      </Tabs>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {project.activities.length === 0 ? (
            <p className="text-sm text-gray-500">No activity yet</p>
          ) : (
            <div className="space-y-3">
              {project.activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <span className="font-medium">
                      {activity.isClientAction ? "Client" : activity.user?.name || "System"}
                    </span>
                    {" "}
                    <span className="text-gray-600">{activity.action}</span>
                    {" "}
                    <span className="text-gray-400">{activity.entityType}</span>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {formatDateTime(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

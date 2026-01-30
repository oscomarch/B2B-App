import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, LayoutTemplate, Users, Building, ArrowRightLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Templates | Relay",
  description: "Manage your onboarding templates",
}

const typeConfig = {
  new_client: { label: "New Client", icon: Users, color: "bg-blue-100 text-blue-700" },
  takeover: { label: "Takeover", icon: ArrowRightLeft, color: "bg-purple-100 text-purple-700" },
  offboarding: { label: "Offboarding", icon: Trash2, color: "bg-red-100 text-red-700" },
  new_site: { label: "New Site", icon: Building, color: "bg-green-100 text-green-700" },
}

async function getTemplates(organizationId: string) {
  return prisma.onboardingTemplate.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          sections: true,
          projects: true,
        },
      },
      sections: {
        select: {
          _count: {
            select: { fields: true },
          },
        },
      },
    },
  })
}

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const templates = await getTemplates(session.user.organizationId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-500 mt-1">Manage your onboarding templates</p>
        </div>
        <Link href="/templates/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </Link>
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <LayoutTemplate className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">
                Create your first onboarding template to start collecting client information.
              </p>
              <Link href="/templates/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => {
            const config = typeConfig[template.type as keyof typeof typeConfig] || typeConfig.new_client
            const Icon = config.icon
            const totalFields = template.sections.reduce(
              (acc, section) => acc + section._count.fields,
              0
            )

            return (
              <Link key={template.id} href={`/templates/${template.id}`}>
                <Card className="h-full hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${config.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {template.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-3">{template.name}</CardTitle>
                    {template.description && (
                      <CardDescription className="line-clamp-2">
                        {template.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{template._count.sections} sections</span>
                      <span>{totalFields} fields</span>
                      <span>{template._count.projects} projects</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      Created {formatDate(template.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

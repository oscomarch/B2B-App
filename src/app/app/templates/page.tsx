import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { FileText, Plus, MoreHorizontal, Users, Calendar } from "lucide-react"

async function getTemplates(organizationId: string) {
  const templates = await prisma.onboardingTemplate.findMany({
    where: { organizationId },
    include: {
      sections: {
        select: { id: true },
      },
      _count: {
        select: { projects: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return templates
}

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const templates = await getTemplates(session.user.organizationId)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const typeLabels: Record<string, string> = {
    new_client: "New Client",
    takeover: "Takeover",
    offboarding: "Offboarding",
    new_site: "New Site",
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-2">
            <FileText className="h-4 w-4" />
            Templates
          </div>
          <h1 className="text-[28px] font-semibold text-neutral-900">
            Onboarding Templates
          </h1>
          <p className="text-[15px] text-neutral-500 mt-1">
            Create and manage reusable templates for client onboarding
          </p>
        </div>
        <Link
          href="/app/templates/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
        >
          <Plus className="h-4 w-4" />
          New Template
        </Link>
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200/60 p-12 text-center">
          <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">No templates yet</h3>
          <p className="text-[14px] text-neutral-500 mb-6 max-w-md mx-auto">
            Templates help you standardize your onboarding process. Create your first template to get started.
          </p>
          <Link
            href="/app/templates/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium text-white"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            <Plus className="h-4 w-4" />
            Create Template
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-neutral-200/60 p-5 hover:border-neutral-300 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-neutral-600" />
                </div>
                <button className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 opacity-0 group-hover:opacity-100 transition-all">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">
                {template.name}
              </h3>
              {template.description && (
                <p className="text-[13px] text-neutral-500 mb-4 line-clamp-2">
                  {template.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-[12px] text-neutral-500 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  {typeLabels[template.type] || template.type}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {template.sections.length} sections
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-3 text-[12px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {template._count.projects} projects
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(template.createdAt)}
                  </span>
                </div>
                {template.isDefault && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

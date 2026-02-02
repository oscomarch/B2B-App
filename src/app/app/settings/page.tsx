import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Settings } from "lucide-react"
import { SettingsForm } from "@/components/app/settings-form"

async function getOrganization(organizationId: string) {
  return prisma.organization.findUnique({
    where: { id: organizationId },
  })
}

async function getUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  })
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const [organization, user] = await Promise.all([
    getOrganization(session.user.organizationId),
    getUser(session.user.id),
  ])

  if (!organization || !user) redirect("/login")

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-2">
          <Settings className="h-4 w-4" />
          Settings
        </div>
        <h1 className="text-[28px] font-semibold text-neutral-900">
          Settings
        </h1>
        <p className="text-[15px] text-neutral-500 mt-1">
          Manage your organization and account preferences
        </p>
      </div>

      <SettingsForm
        organization={{
          id: organization.id,
          name: organization.name,
          slug: organization.slug,
          primaryColor: organization.primaryColor,
        }}
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
        }}
      />
    </div>
  )
}

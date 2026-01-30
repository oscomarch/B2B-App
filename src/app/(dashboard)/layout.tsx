import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-cream">
      <DashboardSidebar user={session.user} />
      <main className="lg:pl-72">
        <div className="p-6 md:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  )
}

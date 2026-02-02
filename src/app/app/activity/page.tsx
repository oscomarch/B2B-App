import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Clock,
  Send,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  Mail,
  Key,
  FileText,
  User,
} from "lucide-react"

async function getActivity(organizationId: string) {
  const activities = await prisma.activityLog.findMany({
    where: {
      project: { organizationId },
    },
    include: {
      project: { select: { id: true, clientName: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  return activities
}

const actionIcons: Record<string, typeof Send> = {
  sent: Send,
  "resent email": Mail,
  created: Plus,
  updated: Edit,
  viewed: Eye,
  completed: CheckCircle,
  "submitted credentials": Key,
  "submitted section": FileText,
}

const actionColors: Record<string, string> = {
  sent: "bg-blue-100 text-blue-600",
  "resent email": "bg-purple-100 text-purple-600",
  created: "bg-green-100 text-green-600",
  updated: "bg-amber-100 text-amber-600",
  viewed: "bg-neutral-100 text-neutral-600",
  completed: "bg-green-100 text-green-600",
  "submitted credentials": "bg-orange-100 text-orange-600",
  "submitted section": "bg-blue-100 text-blue-600",
}

export default async function ActivityPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const activities = await getActivity(session.user.organizationId)

  const formatDate = (date: Date) => {
    const now = new Date()
    const activityDate = new Date(date)
    const diffInMs = now.getTime() - activityDate.getTime()
    const diffInMins = Math.floor(diffInMs / 60000)
    const diffInHours = Math.floor(diffInMs / 3600000)
    const diffInDays = Math.floor(diffInMs / 86400000)

    if (diffInMins < 1) return "Just now"
    if (diffInMins < 60) return `${diffInMins}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`

    return activityDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: activityDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    })
  }

  const formatFullDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = new Date(activity.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, typeof activities>)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-2">
          <Clock className="h-4 w-4" />
          Activity
        </div>
        <h1 className="text-[28px] font-semibold text-neutral-900">
          Activity Log
        </h1>
        <p className="text-[15px] text-neutral-500 mt-1">
          Track all actions and updates across your projects
        </p>
      </div>

      {/* Activity List */}
      {activities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200/60 p-12 text-center">
          <Clock className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">No activity yet</h3>
          <p className="text-[14px] text-neutral-500">
            Activity will appear here as you and your clients interact with projects.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <div key={date}>
              <h3 className="text-[13px] font-medium text-neutral-500 mb-4">{date}</h3>
              <div className="bg-white rounded-2xl border border-neutral-200/60 divide-y divide-neutral-100">
                {dayActivities.map((activity) => {
                  const Icon = actionIcons[activity.action] || Clock
                  const colorClass = actionColors[activity.action] || "bg-neutral-100 text-neutral-600"

                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 hover:bg-neutral-50 transition-colors"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-neutral-900">
                          {activity.isClientAction ? (
                            <span className="font-medium">Client</span>
                          ) : (
                            <span className="font-medium">{activity.user?.name || "System"}</span>
                          )}
                          {" "}<span className="text-neutral-600">{activity.action}</span>{" "}
                          {activity.project && (
                            <Link
                              href={`/app/projects/${activity.project.id}`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {activity.project.clientName}
                            </Link>
                          )}
                        </p>
                        <p className="text-[12px] text-neutral-400 mt-0.5" title={formatFullDate(activity.createdAt)}>
                          {formatDate(activity.createdAt)}
                        </p>
                      </div>
                      {activity.isClientAction && (
                        <span className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                          <User className="h-3 w-3" />
                          Client
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

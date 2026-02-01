"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Users,
  LogOut,
  Plus,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

const navigation = [
  {
    name: "Projects",
    href: "/app/projects",
    icon: FolderKanban,
  },
  {
    name: "Settings",
    href: "/app/settings",
    icon: Settings,
    children: [
      { name: "General", href: "/app/settings" },
      { name: "Team", href: "/app/settings/team" },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/app/projects") {
      return pathname === "/app/projects" || pathname.startsWith("/app/projects/")
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-neutral-200/60 flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-neutral-200/60">
        <Link href="/app/projects" className="flex items-center gap-2.5">
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            <span className="text-[12px] font-bold text-white">R</span>
          </div>
          <span className="text-[16px] font-semibold text-neutral-900">Relay</span>
        </Link>
      </div>

      {/* New Project Button */}
      <div className="px-4 pt-5 pb-2">
        <Link
          href="/app/projects/new"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:shadow-lg hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          if (item.children) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors",
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-[18px] w-[18px]" />
                    {item.name}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      settingsOpen && "rotate-180"
                    )}
                  />
                </button>
                {settingsOpen && (
                  <div className="mt-1 ml-9 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-[13px] transition-colors",
                          pathname === child.href
                            ? "text-neutral-900 font-medium"
                            : "text-neutral-500 hover:text-neutral-900"
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors",
                active
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-neutral-200/60">
        <div className="flex items-center gap-3 px-3 py-2">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 100%)" }}
          >
            {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-neutral-900 truncate">
              {session?.user?.name || "User"}
            </p>
            <p className="text-[11px] text-neutral-400 truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 w-full px-3 py-2 mt-1 rounded-lg text-[13px] text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}

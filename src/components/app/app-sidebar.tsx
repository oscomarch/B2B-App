"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  FileText,
  LogOut,
  Plus,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Clock,
} from "lucide-react"
import { useState } from "react"

const platformNav = [
  {
    name: "Dashboard",
    href: "/app",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/app/projects",
    icon: FolderKanban,
  },
  {
    name: "Templates",
    href: "/app/templates",
    icon: FileText,
  },
  {
    name: "Activity",
    href: "/app/activity",
    icon: Clock,
  },
]

const accountNav = [
  {
    name: "Settings",
    href: "/app/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/app") {
      return pathname === "/app"
    }
    if (href === "/app/projects") {
      return pathname === "/app/projects" || pathname.startsWith("/app/projects/")
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#1a1a1a] flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center">
        <Link href="/app" className="flex items-center gap-2.5">
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            <span className="text-[14px] font-bold text-white">R</span>
          </div>
          <span className="text-[18px] font-semibold text-white">Relay</span>
        </Link>
      </div>

      {/* New Project Button */}
      <div className="px-4 pt-2 pb-4">
        <Link
          href="/app/projects/new"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Platform Section */}
      <div className="px-4 py-2">
        <p className="px-3 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
          Platform
        </p>
      </div>
      <nav className="px-3 space-y-1">
        {platformNav.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Account Section */}
      <div className="px-4 py-2 mt-6">
        <p className="px-3 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
          Account
        </p>
      </div>
      <nav className="px-3 space-y-1">
        {accountNav.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Links */}
      <div className="px-3 py-2 space-y-1">
        <a
          href="mailto:support@getrelay.fr"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-neutral-500 hover:bg-white/5 hover:text-neutral-300 transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          Support
        </a>
        <a
          href="mailto:feedback@getrelay.fr"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-neutral-500 hover:bg-white/5 hover:text-neutral-300 transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          Feedback
        </a>
      </div>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 100%)" }}
            >
              {session?.user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ||
               session?.user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[13px] font-medium text-white truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[11px] text-neutral-500 truncate">
                {session?.user?.email}
              </p>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-neutral-500 transition-transform flex-shrink-0",
                userMenuOpen && "rotate-180"
              )}
            />
          </button>

          {userMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-2 py-1 rounded-xl bg-[#252525] border border-white/10 shadow-xl z-20">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

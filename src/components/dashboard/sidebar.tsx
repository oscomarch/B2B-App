"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  Settings,
  LogOut,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  user: {
    name: string
    email: string
    organizationName: string
  }
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-6 overflow-y-auto bg-cream border-r border-neutral-200/40 px-6 pb-6">
          {/* Logo */}
          <div className="flex h-20 shrink-0 items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center">
              <span className="text-lg font-semibold text-white">R</span>
            </div>
            <span className="text-xl font-medium text-neutral-900">Relay</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-8">
              <li>
                <ul role="list" className="-mx-3 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            isActive
                              ? "bg-white text-neutral-900 shadow-soft"
                              : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60",
                            "group flex gap-x-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200"
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive
                                ? "text-coral"
                                : "text-neutral-400 group-hover:text-coral",
                              "h-5 w-5 shrink-0 transition-colors"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>

              {/* User profile */}
              <li className="mt-auto">
                <div className="flex items-center gap-x-4 px-3 py-4 rounded-xl bg-white/60">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-coral/20 to-pink-soft/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-coral">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {user.organizationName}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    title="Sign out"
                    className="hover:bg-neutral-100"
                  >
                    <LogOut className="h-4 w-4 text-neutral-400" />
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-cream/80 backdrop-blur-md px-6 py-4 border-b border-neutral-200/40 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center">
            <span className="text-lg font-semibold text-white">R</span>
          </div>
          <span className="text-xl font-medium text-neutral-900">Relay</span>
        </div>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-neutral-600"
        >
          Sign out
        </Button>
      </div>

      {/* Mobile navigation */}
      <div className="sticky top-[73px] z-30 bg-cream/80 backdrop-blur-md border-b border-neutral-200/40 px-6 py-3 lg:hidden overflow-x-auto">
        <nav className="flex gap-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-white text-neutral-900 shadow-soft"
                    : "text-neutral-500 hover:text-neutral-700",
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4",
                  isActive ? "text-coral" : ""
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

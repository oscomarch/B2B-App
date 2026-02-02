"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Send,
  MoreHorizontal,
  Trash2,
  Archive,
  RefreshCw,
  Mail,
  Download,
} from "lucide-react"
import { SendEmailDialog } from "./send-email-dialog"

interface Project {
  id: string
  status: string
  clientName: string
  clientEmail: string | null
}

interface ProjectActionsProps {
  project: Project
  portalUrl: string
  mspName: string
}

export function ProjectActions({ project, portalUrl, mspName }: ProjectActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)

  const handleSendPortal = async (customMessage?: string) => {
    if (!project.clientEmail) {
      alert("Please add a client email address first")
      return
    }
    setLoading("send")
    try {
      const res = await fetch(`/api/projects/${project.id}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customMessage }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to send")
      }
      router.refresh()
    } catch (error) {
      console.error("Error sending portal:", error)
      throw error // Re-throw so dialog can handle it
    } finally {
      setLoading(null)
    }
  }

  const openEmailDialog = () => {
    if (!project.clientEmail) {
      alert("Please add a client email address first")
      return
    }
    setShowEmailDialog(true)
  }

  const handleStatusChange = async (status: string) => {
    setLoading(status)
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update")
      router.refresh()
      setShowMenu(false)
    } catch (error) {
      console.error("Error updating project:", error)
      alert("Failed to update project")
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${project.clientName}"? This action cannot be undone.`)) {
      return
    }
    setLoading("delete")
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete")
      router.push("/app/projects")
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Failed to delete project")
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
    <div className="flex items-center gap-2">
      {project.status === "draft" && (
        <button
          onClick={openEmailDialog}
          disabled={loading === "send"}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-white transition-all hover:shadow-lg disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
        >
          <Send className="h-4 w-4" />
          {loading === "send" ? "Sending..." : "Send to Client"}
        </button>
      )}

      {(project.status === "sent" || project.status === "in_progress") && (
        <button
          onClick={openEmailDialog}
          disabled={loading === "send"}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-50"
        >
          <Mail className="h-4 w-4" />
          {loading === "send" ? "Sending..." : "Resend Link"}
        </button>
      )}

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-full mt-1 w-48 py-1 rounded-xl bg-white border border-neutral-200 shadow-lg z-20">
              {project.status !== "completed" && (
                <button
                  onClick={() => handleStatusChange("completed")}
                  disabled={loading === "completed"}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${loading === "completed" ? "animate-spin" : ""}`} />
                  Mark as Completed
                </button>
              )}

              {project.status !== "archived" && (
                <button
                  onClick={() => handleStatusChange("archived")}
                  disabled={loading === "archived"}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Archive className="h-4 w-4" />
                  Archive Project
                </button>
              )}

              <button
                onClick={() => {/* TODO: Implement export */}}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                Export Data
              </button>

              <div className="my-1 border-t border-neutral-100" />

              <button
                onClick={handleDelete}
                disabled={loading === "delete"}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                {loading === "delete" ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>

    {/* Email Dialog */}
    <SendEmailDialog
      isOpen={showEmailDialog}
      onClose={() => setShowEmailDialog(false)}
      onSend={handleSendPortal}
      clientName={project.clientName}
      clientEmail={project.clientEmail || ""}
      mspName={mspName}
      portalUrl={portalUrl}
      isResend={project.status !== "draft"}
    />
    </>
  )
}

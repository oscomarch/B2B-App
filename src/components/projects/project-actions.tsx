"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Send, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProjectActionsProps {
  project: {
    id: string
    status: string
    clientName: string
    clientEmail: string | null
  }
  portalUrl: string
}

export function ProjectActions({ project, portalUrl }: ProjectActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)

  const handleSendToClient = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${project.id}/send`, {
        method: "POST",
      })

      if (!res.ok) throw new Error("Failed to send")

      router.refresh()
      setSendDialogOpen(false)
    } catch (error) {
      console.error(error)
      alert("Failed to send to client")
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const res = await fetch(`/api/projects/${project.id}/export`)
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${project.clientName.replace(/\s+/g, "-")}-onboarding.csv`
      a.click()
    } catch (error) {
      console.error(error)
      alert("Failed to export")
    }
  }

  const handleMarkComplete = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      })

      if (!res.ok) throw new Error("Failed to update")

      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to mark as complete")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {project.status === "draft" && (
        <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send to Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send to Client</DialogTitle>
              <DialogDescription>
                This will activate the client portal and mark the project as sent.
                {project.clientEmail && (
                  <span className="block mt-2">
                    An email will be sent to <strong>{project.clientEmail}</strong> with the portal link.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-1">Portal Link</p>
              <p className="text-sm font-mono text-gray-600 break-all">{portalUrl}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSendDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendToClient} disabled={loading}>
                {loading ? "Sending..." : "Send to Client"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {project.status === "in_progress" && (
        <Button onClick={handleMarkComplete} disabled={loading}>
          Mark Complete
        </Button>
      )}

      <Button variant="outline" onClick={handleExport}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Key, ExternalLink, Eye, EyeOff, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDateTime } from "@/lib/utils"

interface Credential {
  id: string
  systemName: string
  systemType: string | null
  username: string | null
  secureLink: string | null
  encryptedSecret: string | null
  secretViewed: boolean
  notes: string | null
  status: string
  receivedAt: Date | null
  createdAt: Date
}

interface CredentialsListProps {
  projectId: string
  credentials: Credential[]
}

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
  received: { label: "Received", variant: "warning" as const, icon: AlertCircle },
  verified: { label: "Verified", variant: "success" as const, icon: CheckCircle },
}

const systemTypes = [
  { value: "email", label: "Email / Identity" },
  { value: "network", label: "Network / Firewall" },
  { value: "server", label: "Server / Infrastructure" },
  { value: "application", label: "Application" },
  { value: "cloud", label: "Cloud Service" },
  { value: "vendor", label: "Vendor Portal" },
  { value: "other", label: "Other" },
]

export function CredentialsList({ projectId, credentials }: CredentialsListProps) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    systemName: "",
    systemType: "",
    username: "",
    notes: "",
  })

  const handleAddCredential = async () => {
    if (!formData.systemName) return

    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to add credential")

      setFormData({ systemName: "", systemType: "", username: "", notes: "" })
      setDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to add credential")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (credentialId: string, status: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/credentials/${credentialId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) throw new Error("Failed to update status")

      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update status")
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Credential Requests</CardTitle>
            <CardDescription>
              Manage credential handover for this client
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Credential
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Credential Request</DialogTitle>
                <DialogDescription>
                  Add a new credential that the client needs to provide
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name *</Label>
                  <Input
                    id="systemName"
                    placeholder="e.g., Microsoft 365 Global Admin"
                    value={formData.systemName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, systemName: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemType">System Type</Label>
                  <Select
                    value={formData.systemType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, systemType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {systemTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Expected Username</Label>
                  <Input
                    id="username"
                    placeholder="e.g., admin@client.com"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, username: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional notes..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCredential} disabled={loading || !formData.systemName}>
                  {loading ? "Adding..." : "Add Credential"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {credentials.length === 0 ? (
          <div className="text-center py-8">
            <Key className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No credentials requested yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Add credential requests for the client to provide
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {credentials.map((credential) => {
              const config = statusConfig[credential.status as keyof typeof statusConfig]
              const StatusIcon = config?.icon || Clock

              return (
                <div
                  key={credential.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Key className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{credential.systemName}</h4>
                        <Badge variant={config?.variant || "secondary"}>
                          {config?.label || credential.status}
                        </Badge>
                      </div>
                      {credential.systemType && (
                        <p className="text-sm text-gray-500 mt-0.5">
                          {systemTypes.find((t) => t.value === credential.systemType)?.label}
                        </p>
                      )}
                      {credential.username && (
                        <p className="text-sm text-gray-600 mt-1">
                          Username: {credential.username}
                        </p>
                      )}
                      {credential.secureLink && (
                        <a
                          href={credential.secureLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline mt-1 inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Secure link provided
                        </a>
                      )}
                      {credential.notes && (
                        <p className="text-sm text-gray-500 mt-1">{credential.notes}</p>
                      )}
                    </div>
                  </div>
                  <Select
                    value={credential.status}
                    onValueChange={(value) => handleStatusChange(credential.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

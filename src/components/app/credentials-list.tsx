"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Key,
  CheckCircle,
  Clock,
  ExternalLink,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react"

interface Credential {
  id: string
  systemName: string
  systemType: string | null
  status: string
  username: string | null
  secureLink: string | null
  encryptedSecret: string | null
  secretViewed: boolean
  notes: string | null
  createdAt: Date
  receivedAt: Date | null
}

interface CredentialsListProps {
  projectId: string
  credentials: Credential[]
}

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  received: { label: "Received", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  verified: { label: "Verified", icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-50" },
}

export function CredentialsList({ projectId, credentials }: CredentialsListProps) {
  const router = useRouter()
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, string>>({})
  const [revealingId, setRevealingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    systemName: "",
    systemType: "login",
    notes: "",
  })

  const handleRevealSecret = async (credentialId: string) => {
    if (revealedSecrets[credentialId]) {
      // Already revealed, just toggle visibility
      setRevealedSecrets(prev => {
        const next = { ...prev }
        delete next[credentialId]
        return next
      })
      return
    }

    setRevealingId(credentialId)
    try {
      const res = await fetch(`/api/projects/${projectId}/credentials/${credentialId}`)
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      if (data.decryptedSecret) {
        setRevealedSecrets(prev => ({ ...prev, [credentialId]: data.decryptedSecret }))
      }
      router.refresh()
    } catch (error) {
      console.error("Error revealing secret:", error)
      alert("Failed to reveal secret")
    } finally {
      setRevealingId(null)
    }
  }

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to add credential")
      setFormData({ systemName: "", systemType: "login", notes: "" })
      setShowAddForm(false)
      router.refresh()
    } catch (error) {
      console.error("Error adding credential:", error)
      alert("Failed to add credential request")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this credential?")) return
    try {
      const res = await fetch(`/api/projects/${projectId}/credentials/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete")
      router.refresh()
    } catch (error) {
      console.error("Error deleting credential:", error)
      alert("Failed to delete credential")
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/credentials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update")
      router.refresh()
    } catch (error) {
      console.error("Error updating credential:", error)
      alert("Failed to update credential")
    }
  }

  return (
    <div className="space-y-3">
      {credentials.length === 0 && !showAddForm ? (
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/60 text-center">
          <Key className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
          <p className="text-[13px] text-neutral-400">No credentials requested yet</p>
        </div>
      ) : (
        credentials.map((credential) => {
          const config = statusConfig[credential.status as keyof typeof statusConfig] || statusConfig.pending
          const StatusIcon = config.icon
          const isRevealed = !!revealedSecrets[credential.id]
          const isRevealing = revealingId === credential.id

          return (
            <div key={credential.id} className="p-4 rounded-2xl bg-white border border-neutral-200/60">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg ${config.bg} flex items-center justify-center`}>
                    <StatusIcon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-neutral-900">{credential.systemName}</p>
                    {credential.systemType && (
                      <p className="text-[11px] text-neutral-400 uppercase">{credential.systemType}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(credential.id)}
                  className="p-1.5 rounded-lg text-neutral-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {credential.status !== "pending" && (
                <div className="mt-3 pt-3 border-t border-neutral-100 space-y-2">
                  {credential.username && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400">Username</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[12px] text-neutral-700 font-mono">{credential.username}</span>
                        <button
                          onClick={() => handleCopy(credential.username!, `user-${credential.id}`)}
                          className="p-1 text-neutral-300 hover:text-neutral-600"
                        >
                          {copiedId === `user-${credential.id}` ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  {credential.secureLink && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400">Secure Link</span>
                      <a
                        href={credential.secureLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[12px] text-[#3B82C4] hover:underline"
                      >
                        Open <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                  {credential.encryptedSecret && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-neutral-400">One-time Secret</span>
                        <button
                          onClick={() => handleRevealSecret(credential.id)}
                          disabled={isRevealing}
                          className="flex items-center gap-1 text-[12px] text-[#3B82C4] hover:text-[#2d6ba0] disabled:opacity-50"
                        >
                          {isRevealing ? (
                            "Loading..."
                          ) : isRevealed ? (
                            <>Hide <EyeOff className="h-3 w-3" /></>
                          ) : (
                            <>Reveal <Eye className="h-3 w-3" /></>
                          )}
                        </button>
                      </div>
                      {isRevealed && revealedSecrets[credential.id] && (
                        <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-lg">
                          <div className="flex items-center justify-between gap-2">
                            <code className="text-[12px] text-amber-900 font-mono break-all flex-1">
                              {revealedSecrets[credential.id]}
                            </code>
                            <button
                              onClick={() => handleCopy(revealedSecrets[credential.id], `secret-${credential.id}`)}
                              className="p-1.5 rounded bg-amber-100 text-amber-700 hover:bg-amber-200 flex-shrink-0"
                            >
                              {copiedId === `secret-${credential.id}` ? (
                                <Check className="h-3.5 w-3.5 text-green-600" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-[10px] text-amber-600 mt-2">
                            {credential.secretViewed ? "Previously viewed" : "First time viewing - now marked as viewed"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {credential.notes && (
                    <div className="mt-2 pt-2 border-t border-neutral-100">
                      <p className="text-[11px] text-neutral-500">{credential.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {credential.status === "received" && (
                <button
                  onClick={() => handleStatusChange(credential.id, "verified")}
                  className="mt-3 w-full py-1.5 rounded-lg text-[11px] font-medium text-[#3B82C4] bg-[#3B82C4]/10 hover:bg-[#3B82C4]/20 transition-colors"
                >
                  Mark as Verified
                </button>
              )}
            </div>
          )
        })
      )}

      {showAddForm ? (
        <form onSubmit={handleAdd} className="p-4 rounded-2xl bg-white border border-neutral-200/60">
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">System Name</label>
              <input
                type="text"
                placeholder="e.g., Microsoft 365 Admin"
                value={formData.systemName}
                onChange={(e) => setFormData(prev => ({ ...prev, systemName: e.target.value }))}
                required
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Type</label>
              <select
                value={formData.systemType}
                onChange={(e) => setFormData(prev => ({ ...prev, systemType: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-[13px] text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4]"
              >
                <option value="login">Login Credentials</option>
                <option value="email">Email</option>
                <option value="network">Network</option>
                <option value="application">Application</option>
                <option value="api_key">API Key</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Notes (optional)</label>
              <input
                type="text"
                placeholder="Any specific instructions for the client"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4]"
              />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 rounded-lg text-[12px] font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.systemName}
                className="flex-1 py-2 rounded-lg text-[12px] font-medium text-white disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
              >
                {loading ? "Adding..." : "Request"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-neutral-200 text-[13px] font-medium text-neutral-400 hover:border-neutral-300 hover:text-neutral-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Request Credential
        </button>
      )}
    </div>
  )
}

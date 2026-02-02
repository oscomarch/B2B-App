"use client"

import { useState, useEffect } from "react"
import { X, Mail, Clock, CheckCircle, ChevronRight } from "lucide-react"

interface EmailRecord {
  id: string
  sentAt: string
  clientEmail: string
  customMessage: string | null
  isResend: boolean
}

interface EmailHistoryProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  clientName: string
}

export function EmailHistory({
  isOpen,
  onClose,
  projectId,
  clientName,
}: EmailHistoryProps) {
  const [emails, setEmails] = useState<EmailRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      fetch(`/api/projects/${projectId}/emails`)
        .then((res) => res.ok ? res.json() : Promise.reject())
        .then((data) => setEmails(data.emails || []))
        .catch((error) => console.error("Failed to fetch email history:", error))
        .finally(() => setLoading(false))
    }
  }, [isOpen, projectId])

  if (!isOpen) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl mx-4 overflow-hidden max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h2 className="text-[18px] font-semibold text-neutral-900">
              Email History
            </h2>
            <p className="text-[13px] text-neutral-500">
              Emails sent to {clientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin h-6 w-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full" />
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-[14px] text-neutral-500">No emails sent yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="rounded-xl border border-neutral-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === email.id ? null : email.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-neutral-50 transition-colors text-left"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-neutral-900">
                          {email.isResend ? "Email resent" : "Email sent"}
                        </span>
                        {email.customMessage && (
                          <span className="text-[11px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                            Personal note
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[12px] text-neutral-500">
                        <Clock className="h-3 w-3" />
                        {formatDate(email.sentAt)}
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-neutral-400 transition-transform ${
                        expandedId === email.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {expandedId === email.id && (
                    <div className="px-3 pb-3 space-y-2">
                      <div className="rounded-lg bg-neutral-50 p-3">
                        <p className="text-[11px] font-medium text-neutral-500 mb-1">
                          Sent to
                        </p>
                        <p className="text-[13px] text-neutral-900">{email.clientEmail}</p>
                      </div>
                      {email.customMessage && (
                        <div className="rounded-lg bg-blue-50 p-3">
                          <p className="text-[11px] font-medium text-blue-600 mb-1">
                            Personal message
                          </p>
                          <p className="text-[13px] text-blue-900 italic">
                            "{email.customMessage}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

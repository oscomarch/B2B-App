"use client"

import { useState } from "react"
import { X, Send, Mail, Eye, Edit3, CheckCircle } from "lucide-react"

interface SendEmailDialogProps {
  isOpen: boolean
  onClose: () => void
  onSend: (customMessage?: string) => Promise<void>
  clientName: string
  clientEmail: string
  mspName: string
  portalUrl: string
  isResend?: boolean
}

export function SendEmailDialog({
  isOpen,
  onClose,
  onSend,
  clientName,
  clientEmail,
  mspName,
  portalUrl,
  isResend = false,
}: SendEmailDialogProps) {
  const [customMessage, setCustomMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<"edit" | "preview">("edit")

  if (!isOpen) return null

  const handleSend = async () => {
    setLoading(true)
    setError(null)
    try {
      await onSend(customMessage || undefined)
      setSuccess(true)
      // Auto-close after showing success
      setTimeout(() => {
        setSuccess(false)
        setCustomMessage("")
        onClose()
      }, 2000)
    } catch (err) {
      console.error("Failed to send:", err)
      setError(err instanceof Error ? err.message : "Failed to send email")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSuccess(false)
    setError(null)
    setCustomMessage("")
    onClose()
  }

  // Success state
  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl mx-4 overflow-hidden">
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-[18px] font-semibold text-neutral-900 mb-2">
              Email Sent!
            </h3>
            <p className="text-[14px] text-neutral-500">
              The onboarding link has been sent to<br />
              <span className="font-medium text-neutral-700">{clientEmail}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h2 className="text-[18px] font-semibold text-neutral-900">
              {isResend ? "Resend Email" : "Send Onboarding Link"}
            </h2>
            <p className="text-[13px] text-neutral-500">
              Send the portal link to {clientName}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4">
          <button
            onClick={() => setView("edit")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              view === "edit"
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            Customize
          </button>
          <button
            onClick={() => setView("preview")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              view === "preview"
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {view === "edit" ? (
            <div className="space-y-4">
              {/* Recipient */}
              <div>
                <label className="block text-[12px] font-medium text-neutral-500 mb-1.5">
                  To
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <Mail className="h-4 w-4 text-neutral-400" />
                  <span className="text-[14px] text-neutral-900">{clientEmail}</span>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[12px] font-medium text-neutral-500 mb-1.5">
                  Subject
                </label>
                <div className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[14px] text-neutral-900">{mspName} - Complete Your Onboarding</span>
                </div>
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-[12px] font-medium text-neutral-500 mb-1.5">
                  Personal message <span className="text-neutral-400">(optional)</span>
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add a personal note to include in the email..."
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-[14px] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>

              {/* Portal Link */}
              <div>
                <label className="block text-[12px] font-medium text-neutral-500 mb-1.5">
                  Portal link
                </label>
                <div className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-[13px] text-neutral-600 font-mono break-all">{portalUrl}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Preview */
            <div className="rounded-xl border border-neutral-200 overflow-hidden">
              <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200">
                <p className="text-[11px] text-neutral-500">Email Preview</p>
              </div>
              <div className="p-6 bg-white">
                <div className="text-center mb-6">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white font-semibold text-lg"
                    style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                  >
                    R
                  </div>
                </div>

                <h3 className="text-[20px] font-medium text-neutral-900 mb-2">
                  Hello {clientName},
                </h3>
                <p className="text-[14px] text-neutral-600 mb-4">
                  <strong>{mspName}</strong> is ready to onboard you. Please complete the secure form to get started.
                </p>

                {customMessage && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 mb-4">
                    <p className="text-[14px] text-blue-900 italic">"{customMessage}"</p>
                  </div>
                )}

                <div className="text-center my-6">
                  <span
                    className="inline-block px-6 py-3 rounded-xl text-white font-medium text-[14px]"
                    style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                  >
                    Complete Onboarding
                  </span>
                </div>

                <p className="text-[12px] text-neutral-400">
                  This link is unique to you. Please don't share it with others.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mb-4 p-3 rounded-xl bg-red-50 border border-red-200">
            <p className="text-[13px] text-red-700">{error}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl text-[13px] font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-[13px] font-medium text-white transition-all hover:shadow-lg disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            <Send className="h-4 w-4" />
            {loading ? "Sending..." : isResend ? "Resend Email" : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  )
}

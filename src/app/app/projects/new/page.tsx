"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FolderPlus } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string | null
  type: string
}

export default function NewProjectPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    templateId: "",
    notes: "",
  })

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Failed to create project")
      }

      const project = await res.json()
      router.push(`/app/projects/${project.id}`)
    } catch (error) {
      console.error("Error creating project:", error)
      alert("Failed to create project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-8 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/app/projects"
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-[24px] font-medium text-neutral-900 tracking-[-0.02em]">
            New Project
          </h1>
          <p className="text-[14px] text-neutral-500">
            Create a new client onboarding project
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/60">
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">Client Information</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="clientName" className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                Client Name *
              </label>
              <input
                id="clientName"
                type="text"
                placeholder="Acme Corporation"
                value={formData.clientName}
                onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4] transition-colors"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="clientEmail" className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Client Email
                </label>
                <input
                  id="clientEmail"
                  type="email"
                  placeholder="contact@acme.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientEmail: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="clientPhone" className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Client Phone
                </label>
                <input
                  id="clientPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientPhone: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-200/60">
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">Onboarding Template</h2>

          <div className="space-y-2">
            {templates.length === 0 ? (
              <p className="text-[14px] text-neutral-500 py-4 text-center">
                Loading templates...
              </p>
            ) : (
              templates.map((template) => (
                <label
                  key={template.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.templateId === template.id
                      ? "border-[#3B82C4] bg-[#3B82C4]/5"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={formData.templateId === template.id}
                    onChange={(e) => setFormData((prev) => ({ ...prev, templateId: e.target.value }))}
                    className="mt-1 h-4 w-4 text-[#3B82C4] focus:ring-[#3B82C4]"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-neutral-900">{template.name}</p>
                    {template.description && (
                      <p className="text-[13px] text-neutral-500 mt-0.5">{template.description}</p>
                    )}
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-600 uppercase">
                      {template.type}
                    </span>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-200/60">
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">Internal Notes</h2>
          <textarea
            id="notes"
            placeholder="Any internal notes about this client or project..."
            value={formData.notes}
            onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4] transition-colors resize-none"
          />
          <p className="text-[12px] text-neutral-400 mt-2">
            These notes are only visible to your team, not the client.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/app/projects"
            className="px-5 py-2.5 rounded-xl text-[14px] font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || !formData.templateId || !formData.clientName}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            <FolderPlus className="h-4 w-4" />
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  )
}

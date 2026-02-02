"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  Building2,
  RefreshCw,
  UserMinus,
  MapPin,
  Check,
  Plus,
  Trash2,
  GripVertical,
  Briefcase,
  Shield,
  Mail,
  Server,
  Users,
  CreditCard,
} from "lucide-react"

const templateTypes = [
  {
    id: "new_client",
    name: "New Client",
    description: "Onboard a brand new client to your services",
    icon: Building2,
    color: "bg-blue-500",
    suggestedSections: [
      { name: "Company Information", icon: "building", description: "Basic company details and contacts" },
      { name: "IT Infrastructure", icon: "server", description: "Current systems, networks, and hardware" },
      { name: "User Accounts", icon: "users", description: "Staff list and access requirements" },
      { name: "Security & Compliance", icon: "shield", description: "Security policies and compliance needs" },
      { name: "Email & Communication", icon: "mail", description: "Email setup and communication tools" },
      { name: "Billing Information", icon: "credit-card", description: "Payment and invoicing details" },
    ],
  },
  {
    id: "takeover",
    name: "Takeover",
    description: "Take over IT management from another provider",
    icon: RefreshCw,
    color: "bg-amber-500",
    suggestedSections: [
      { name: "Current Provider Details", icon: "building", description: "Existing MSP contact and transition info" },
      { name: "Credentials & Access", icon: "shield", description: "All existing logins and admin access" },
      { name: "Documentation", icon: "file-text", description: "Existing documentation and contracts" },
      { name: "Infrastructure Audit", icon: "server", description: "Current systems inventory" },
      { name: "User Accounts", icon: "users", description: "Staff and their current access" },
      { name: "Urgent Issues", icon: "alert", description: "Known problems to address immediately" },
    ],
  },
  {
    id: "offboarding",
    name: "Offboarding",
    description: "Properly offboard a departing client",
    icon: UserMinus,
    color: "bg-red-500",
    suggestedSections: [
      { name: "Account Handover", icon: "shield", description: "Credentials to transfer back" },
      { name: "Data Export", icon: "file-text", description: "Data backup and export requirements" },
      { name: "Documentation", icon: "file-text", description: "Final documentation handover" },
      { name: "Final Invoice", icon: "credit-card", description: "Outstanding payments and billing" },
    ],
  },
  {
    id: "new_site",
    name: "New Site",
    description: "Set up a new office or location for existing client",
    icon: MapPin,
    color: "bg-green-500",
    suggestedSections: [
      { name: "Site Details", icon: "building", description: "Address and facility information" },
      { name: "Network Requirements", icon: "server", description: "Internet, networking, and connectivity" },
      { name: "Hardware Needs", icon: "server", description: "Workstations, printers, and equipment" },
      { name: "Staff & Access", icon: "users", description: "Employees and access requirements" },
      { name: "Phone & Communication", icon: "mail", description: "Phone systems and collaboration tools" },
    ],
  },
]

const iconMap: Record<string, typeof Building2> = {
  building: Building2,
  server: Server,
  users: Users,
  shield: Shield,
  mail: Mail,
  "credit-card": CreditCard,
  "file-text": FileText,
  briefcase: Briefcase,
  alert: RefreshCw,
}

interface Section {
  id: string
  name: string
  description: string
  icon: string
}

export default function NewTemplatePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)

  // Form state
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [sections, setSections] = useState<Section[]>([])
  const [isDefault, setIsDefault] = useState(false)

  const selectedTypeData = templateTypes.find((t) => t.id === selectedType)

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    const typeData = templateTypes.find((t) => t.id === typeId)
    if (typeData) {
      // Pre-populate sections
      setSections(
        typeData.suggestedSections.map((s, i) => ({
          id: `section-${i}`,
          name: s.name,
          description: s.description,
          icon: s.icon,
        }))
      )
      // Auto-fill template name
      setTemplateName(`${typeData.name} Onboarding`)
    }
  }

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: `section-${Date.now()}`,
        name: "",
        description: "",
        icon: "briefcase",
      },
    ])
  }

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id))
  }

  const updateSection = (id: string, field: keyof Section, value: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSubmit = async () => {
    if (!selectedType || !templateName || sections.length === 0) return

    setSaving(true)
    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: templateName,
          description: templateDescription,
          type: selectedType,
          isDefault,
          sections: sections.map((s, i) => ({
            name: s.name,
            description: s.description,
            icon: s.icon,
            order: i,
            isRequired: true,
          })),
        }),
      })

      if (!res.ok) throw new Error("Failed to create template")

      router.push("/app/templates")
      router.refresh()
    } catch (error) {
      console.error("Error creating template:", error)
      alert("Failed to create template")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/app/templates"
          className="inline-flex items-center gap-2 text-[13px] text-neutral-500 hover:text-neutral-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </Link>
        <h1 className="text-[28px] font-semibold text-neutral-900">
          Create Template
        </h1>
        <p className="text-[15px] text-neutral-500 mt-1">
          Build a reusable onboarding template for your clients
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium ${
                step >= s
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-200 text-neutral-500"
              }`}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            <span className={`text-[13px] ${step >= s ? "text-neutral-900" : "text-neutral-500"}`}>
              {s === 1 ? "Type" : s === 2 ? "Details" : "Sections"}
            </span>
            {s < 3 && <div className="w-12 h-px bg-neutral-200 ml-2" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Type */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">
            What type of template do you need?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templateTypes.map((type) => {
              const Icon = type.icon
              const isSelected = selectedType === type.id
              return (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${type.color} bg-opacity-10`}>
                      <Icon className={`h-6 w-6 ${type.color.replace("bg-", "text-")}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-semibold text-neutral-900">
                          {type.name}
                        </h3>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-[13px] text-neutral-500 mt-1">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedType}
              className="px-6 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Template Details */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-6">
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">
              Template Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., New Client Onboarding"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Describe what this template is used for..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
              <label className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 cursor-pointer hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-5 h-5 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <p className="text-[14px] font-medium text-neutral-900">Set as default template</p>
                  <p className="text-[13px] text-neutral-500">This template will be pre-selected when creating new projects</p>
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2.5 rounded-xl text-[14px] font-medium text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!templateName}
              className="px-6 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Sections */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[16px] font-semibold text-neutral-900">
                  Sections
                </h2>
                <p className="text-[13px] text-neutral-500 mt-1">
                  Customize the sections clients will fill out
                </p>
              </div>
              <button
                onClick={addSection}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
              >
                <Plus className="h-4 w-4" />
                Add Section
              </button>
            </div>

            <div className="space-y-3">
              {sections.map((section, index) => {
                const Icon = iconMap[section.icon] || Briefcase
                return (
                  <div
                    key={section.id}
                    className="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 bg-neutral-50"
                  >
                    <div className="flex items-center gap-2 text-neutral-400 pt-2">
                      <GripVertical className="h-4 w-4 cursor-move" />
                      <span className="text-[13px] font-medium w-5">{index + 1}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-neutral-200">
                      <Icon className="h-5 w-5 text-neutral-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => updateSection(section.id, "name", e.target.value)}
                        placeholder="Section name"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={section.description}
                        onChange={(e) => updateSection(section.id, "description", e.target.value)}
                        placeholder="Brief description (optional)"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
            </div>

            {sections.length === 0 && (
              <div className="text-center py-8 text-neutral-500">
                <FileText className="h-10 w-10 mx-auto mb-3 text-neutral-300" />
                <p className="text-[14px]">No sections added yet</p>
                <p className="text-[13px]">Add sections for clients to fill out</p>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl text-[14px] font-medium text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving || sections.length === 0 || sections.some((s) => !s.name)}
              className="px-6 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
              {saving ? "Creating..." : "Create Template"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

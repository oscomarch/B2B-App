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
  ChevronDown,
  ChevronUp,
  Type,
  AlignLeft,
  Mail,
  Phone,
  Link as LinkIcon,
  List,
  Upload,
  Key,
} from "lucide-react"

const templateTypes = [
  {
    id: "new_client",
    name: "New Client",
    description: "Onboard a brand new client to your services",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    id: "takeover",
    name: "Takeover",
    description: "Take over IT management from another provider",
    icon: RefreshCw,
    color: "bg-amber-500",
  },
  {
    id: "offboarding",
    name: "Offboarding",
    description: "Properly offboard a departing client",
    icon: UserMinus,
    color: "bg-red-500",
  },
  {
    id: "new_site",
    name: "New Site",
    description: "Set up a new office or location for existing client",
    icon: MapPin,
    color: "bg-green-500",
  },
]

const fieldTypes = [
  { id: "text", name: "Short Text", icon: Type, description: "Single line input" },
  { id: "textarea", name: "Long Text", icon: AlignLeft, description: "Multi-line text area" },
  { id: "email", name: "Email", icon: Mail, description: "Email address" },
  { id: "phone", name: "Phone", icon: Phone, description: "Phone number" },
  { id: "url", name: "URL", icon: LinkIcon, description: "Website link" },
  { id: "select", name: "Dropdown", icon: List, description: "Single choice from options" },
  { id: "file", name: "File Upload", icon: Upload, description: "Upload documents" },
  { id: "credential", name: "Credential", icon: Key, description: "Secure username/password" },
]

// Pre-built section templates with fields
const sectionPresets: Record<string, { name: string; description: string; icon: string; fields: Field[] }[]> = {
  new_client: [
    {
      name: "Company Information",
      description: "Basic company details and contacts",
      icon: "building",
      fields: [
        { id: "f1", label: "Company Legal Name", type: "text", isRequired: true, placeholder: "Enter legal business name" },
        { id: "f2", label: "Trading Name (if different)", type: "text", isRequired: false, placeholder: "DBA or trading name" },
        { id: "f3", label: "Business Address", type: "textarea", isRequired: true, placeholder: "Full business address" },
        { id: "f4", label: "Main Phone Number", type: "phone", isRequired: true, placeholder: "+1 (555) 000-0000" },
        { id: "f5", label: "Company Website", type: "url", isRequired: false, placeholder: "https://example.com" },
        { id: "f6", label: "Industry", type: "select", isRequired: true, options: ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Legal", "Other"] },
        { id: "f7", label: "Number of Employees", type: "select", isRequired: true, options: ["1-10", "11-50", "51-200", "201-500", "500+"] },
      ],
    },
    {
      name: "Primary Contact",
      description: "Main point of contact for IT matters",
      icon: "user",
      fields: [
        { id: "f8", label: "Full Name", type: "text", isRequired: true, placeholder: "Contact's full name" },
        { id: "f9", label: "Job Title", type: "text", isRequired: true, placeholder: "Their role in the company" },
        { id: "f10", label: "Email Address", type: "email", isRequired: true, placeholder: "contact@company.com" },
        { id: "f11", label: "Phone Number", type: "phone", isRequired: true, placeholder: "+1 (555) 000-0000" },
        { id: "f12", label: "Preferred Contact Method", type: "select", isRequired: false, options: ["Email", "Phone", "Teams/Slack", "No preference"] },
      ],
    },
    {
      name: "IT Infrastructure",
      description: "Current systems, networks, and hardware",
      icon: "server",
      fields: [
        { id: "f13", label: "Current IT Provider (if any)", type: "text", isRequired: false, placeholder: "Previous MSP or internal IT" },
        { id: "f14", label: "Number of Workstations", type: "text", isRequired: true, placeholder: "Total computers/laptops" },
        { id: "f15", label: "Number of Servers", type: "text", isRequired: false, placeholder: "Physical or virtual servers" },
        { id: "f16", label: "Current Email Platform", type: "select", isRequired: true, options: ["Microsoft 365", "Google Workspace", "On-premises Exchange", "Other", "None"] },
        { id: "f17", label: "Cloud Services Used", type: "textarea", isRequired: false, placeholder: "List any cloud services (AWS, Azure, etc.)" },
        { id: "f18", label: "Network Documentation", type: "file", isRequired: false, placeholder: "Upload any existing documentation" },
      ],
    },
    {
      name: "Security & Compliance",
      description: "Security requirements and compliance needs",
      icon: "shield",
      fields: [
        { id: "f19", label: "Compliance Requirements", type: "select", isRequired: true, options: ["HIPAA", "PCI-DSS", "SOC 2", "GDPR", "None", "Other"] },
        { id: "f20", label: "Current Antivirus/EDR", type: "text", isRequired: false, placeholder: "Current security software" },
        { id: "f21", label: "Backup Solution", type: "text", isRequired: false, placeholder: "Current backup system" },
        { id: "f22", label: "Security Concerns", type: "textarea", isRequired: false, placeholder: "Any specific security concerns or past incidents" },
      ],
    },
    {
      name: "Admin Credentials",
      description: "Administrative access for IT management",
      icon: "key",
      fields: [
        { id: "f23", label: "Microsoft 365 Global Admin", type: "credential", isRequired: false, placeholder: "Admin credentials" },
        { id: "f24", label: "Domain Registrar Login", type: "credential", isRequired: false, placeholder: "GoDaddy, Namecheap, etc." },
        { id: "f25", label: "Firewall/Router Admin", type: "credential", isRequired: false, placeholder: "Network equipment access" },
        { id: "f26", label: "Other Important Credentials", type: "credential", isRequired: false, placeholder: "Any other admin access needed" },
      ],
    },
  ],
  takeover: [
    {
      name: "Current Provider Details",
      description: "Information about the existing IT provider",
      icon: "building",
      fields: [
        { id: "t1", label: "Current Provider Name", type: "text", isRequired: true, placeholder: "Name of current MSP" },
        { id: "t2", label: "Provider Contact Email", type: "email", isRequired: false, placeholder: "Their contact email" },
        { id: "t3", label: "Contract End Date", type: "text", isRequired: true, placeholder: "When does current contract end?" },
        { id: "t4", label: "Reason for Change", type: "textarea", isRequired: false, placeholder: "Why are you switching providers?" },
      ],
    },
    {
      name: "All Credentials & Access",
      description: "Complete credential handover",
      icon: "key",
      fields: [
        { id: "t5", label: "Microsoft 365 Admin", type: "credential", isRequired: true },
        { id: "t6", label: "Google Workspace Admin", type: "credential", isRequired: false },
        { id: "t7", label: "Domain Registrar", type: "credential", isRequired: true },
        { id: "t8", label: "DNS Provider", type: "credential", isRequired: false },
        { id: "t9", label: "Firewall/Router", type: "credential", isRequired: true },
        { id: "t10", label: "Server Admin", type: "credential", isRequired: false },
        { id: "t11", label: "Backup System", type: "credential", isRequired: false },
        { id: "t12", label: "Antivirus/Security Console", type: "credential", isRequired: false },
      ],
    },
    {
      name: "Documentation",
      description: "Existing documentation to transfer",
      icon: "file",
      fields: [
        { id: "t13", label: "Network Diagram", type: "file", isRequired: false },
        { id: "t14", label: "Password/Credential List", type: "file", isRequired: false },
        { id: "t15", label: "Asset Inventory", type: "file", isRequired: false },
        { id: "t16", label: "Support History/Tickets", type: "file", isRequired: false },
      ],
    },
    {
      name: "Known Issues",
      description: "Current problems to address",
      icon: "alert",
      fields: [
        { id: "t17", label: "Urgent Issues", type: "textarea", isRequired: false, placeholder: "Any critical issues that need immediate attention" },
        { id: "t18", label: "Ongoing Problems", type: "textarea", isRequired: false, placeholder: "Recurring issues or complaints" },
        { id: "t19", label: "User Complaints", type: "textarea", isRequired: false, placeholder: "Common user feedback or frustrations" },
      ],
    },
  ],
  offboarding: [
    {
      name: "Account Handover",
      description: "Credentials to transfer back",
      icon: "key",
      fields: [
        { id: "o1", label: "New IT Contact Name", type: "text", isRequired: true },
        { id: "o2", label: "New IT Contact Email", type: "email", isRequired: true },
        { id: "o3", label: "Handover Date", type: "text", isRequired: true, placeholder: "When to complete transfer" },
      ],
    },
    {
      name: "Data Export",
      description: "Data backup and export needs",
      icon: "file",
      fields: [
        { id: "o4", label: "Data Export Required", type: "select", isRequired: true, options: ["Yes - Full export", "Yes - Partial", "No"] },
        { id: "o5", label: "Specific Data Needed", type: "textarea", isRequired: false, placeholder: "What data needs to be exported?" },
      ],
    },
    {
      name: "Final Billing",
      description: "Outstanding payments",
      icon: "credit-card",
      fields: [
        { id: "o6", label: "Outstanding Balance", type: "text", isRequired: false, placeholder: "Any unpaid invoices" },
        { id: "o7", label: "Final Invoice Date", type: "text", isRequired: true, placeholder: "Date for final invoice" },
      ],
    },
  ],
  new_site: [
    {
      name: "Site Details",
      description: "New location information",
      icon: "building",
      fields: [
        { id: "s1", label: "Site Name", type: "text", isRequired: true, placeholder: "Branch name or location identifier" },
        { id: "s2", label: "Full Address", type: "textarea", isRequired: true },
        { id: "s3", label: "Site Contact Name", type: "text", isRequired: true },
        { id: "s4", label: "Site Contact Phone", type: "phone", isRequired: true },
        { id: "s5", label: "Expected Go-Live Date", type: "text", isRequired: true, placeholder: "When should IT be ready?" },
      ],
    },
    {
      name: "Network Requirements",
      description: "Connectivity and networking needs",
      icon: "server",
      fields: [
        { id: "s6", label: "Internet Provider", type: "text", isRequired: false, placeholder: "ISP for this location" },
        { id: "s7", label: "Required Bandwidth", type: "select", isRequired: true, options: ["Basic (50 Mbps)", "Standard (100 Mbps)", "High (500 Mbps)", "Enterprise (1 Gbps+)"] },
        { id: "s8", label: "VPN to Main Office?", type: "select", isRequired: true, options: ["Yes", "No", "Not sure"] },
        { id: "s9", label: "WiFi Requirements", type: "textarea", isRequired: false, placeholder: "Coverage areas, guest network, etc." },
      ],
    },
    {
      name: "Hardware Needs",
      description: "Equipment for the new site",
      icon: "server",
      fields: [
        { id: "s10", label: "Number of Workstations", type: "text", isRequired: true },
        { id: "s11", label: "Printers/Copiers Needed", type: "text", isRequired: false },
        { id: "s12", label: "Phone System", type: "select", isRequired: true, options: ["VoIP - New", "VoIP - Extend existing", "Traditional", "Mobile only"] },
        { id: "s13", label: "Other Equipment", type: "textarea", isRequired: false, placeholder: "Servers, displays, conference room tech, etc." },
      ],
    },
  ],
}

interface Field {
  id: string
  label: string
  type: string
  isRequired: boolean
  placeholder?: string
  options?: string[]
}

interface Section {
  id: string
  name: string
  description: string
  icon: string
  fields: Field[]
  isExpanded: boolean
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

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    const presets = sectionPresets[typeId] || []
    setSections(
      presets.map((s, i) => ({
        id: `section-${i}`,
        name: s.name,
        description: s.description,
        icon: s.icon,
        fields: s.fields.map((f, j) => ({ ...f, id: `field-${i}-${j}` })),
        isExpanded: i === 0,
      }))
    )
    const typeData = templateTypes.find((t) => t.id === typeId)
    if (typeData) {
      setTemplateName(`${typeData.name} Onboarding`)
    }
  }

  const toggleSection = (sectionId: string) => {
    setSections(sections.map((s) => (s.id === sectionId ? { ...s, isExpanded: !s.isExpanded } : s)))
  }

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: `section-${Date.now()}`,
        name: "New Section",
        description: "",
        icon: "folder",
        fields: [],
        isExpanded: true,
      },
    ])
  }

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id))
  }

  const updateSection = (id: string, field: keyof Section, value: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const addField = (sectionId: string) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              fields: [
                ...s.fields,
                { id: `field-${Date.now()}`, label: "", type: "text", isRequired: false, placeholder: "" },
              ],
            }
          : s
      )
    )
  }

  const updateField = (sectionId: string, fieldId: string, key: keyof Field, value: string | boolean | string[]) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              fields: s.fields.map((f) => (f.id === fieldId ? { ...f, [key]: value } : f)),
            }
          : s
      )
    )
  }

  const removeField = (sectionId: string, fieldId: string) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId ? { ...s, fields: s.fields.filter((f) => f.id !== fieldId) } : s
      )
    )
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
            fields: s.fields.map((f, j) => ({
              label: f.label,
              type: f.type,
              isRequired: f.isRequired,
              placeholder: f.placeholder || null,
              options: f.options ? JSON.stringify(f.options) : null,
              order: j,
            })),
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

  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find((f) => f.id === type)
    return fieldType?.icon || Type
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
        <h1 className="text-[28px] font-semibold text-neutral-900">Create Template</h1>
        <p className="text-[15px] text-neutral-500 mt-1">
          Build a reusable onboarding template for your clients
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium ${
                step >= s ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"
              }`}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            <span className={`text-[13px] ${step >= s ? "text-neutral-900" : "text-neutral-500"}`}>
              {s === 1 ? "Type" : s === 2 ? "Details" : "Sections & Fields"}
            </span>
            {s < 3 && <div className="w-8 h-px bg-neutral-200 ml-2" />}
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
                    isSelected ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${type.color} bg-opacity-10`}>
                      <Icon className={`h-6 w-6 ${type.color.replace("bg-", "text-")}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-semibold text-neutral-900">{type.name}</h3>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-[13px] text-neutral-500 mt-1">{type.description}</p>
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

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-6">
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">Template Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
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
                  rows={2}
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
                  <p className="text-[13px] text-neutral-500">Pre-selected when creating new projects</p>
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

      {/* Step 3: Sections & Fields */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[16px] font-semibold text-neutral-900">Sections & Fields</h2>
              <p className="text-[13px] text-neutral-500">Configure what information clients provide</p>
            </div>
            <button
              onClick={addSection}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section, sectionIndex) => (
              <div key={section.id} className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden">
                {/* Section Header */}
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer hover:bg-neutral-50"
                  onClick={() => toggleSection(section.id)}
                >
                  <GripVertical className="h-4 w-4 text-neutral-400" />
                  <span className="text-[13px] font-medium text-neutral-400 w-6">{sectionIndex + 1}</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) => {
                        e.stopPropagation()
                        updateSection(section.id, "name", e.target.value)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[14px] font-semibold text-neutral-900 bg-transparent border-none focus:outline-none w-full"
                      placeholder="Section name"
                    />
                    <p className="text-[12px] text-neutral-500">{section.fields.length} fields</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSection(section.id)
                    }}
                    className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {section.isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-neutral-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-400" />
                  )}
                </div>

                {/* Section Content */}
                {section.isExpanded && (
                  <div className="border-t border-neutral-100 p-4 space-y-3">
                    <input
                      type="text"
                      value={section.description}
                      onChange={(e) => updateSection(section.id, "description", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Section description (optional)"
                    />

                    {/* Fields */}
                    <div className="space-y-2">
                      {section.fields.map((field, fieldIndex) => {
                        const FieldIcon = getFieldIcon(field.type)
                        return (
                          <div key={field.id} className="flex items-start gap-2 p-3 rounded-xl bg-neutral-50">
                            <span className="text-[12px] text-neutral-400 pt-2 w-5">{fieldIndex + 1}</span>
                            <div className="p-2 rounded-lg bg-white border border-neutral-200">
                              <FieldIcon className="h-4 w-4 text-neutral-500" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={field.label}
                                  onChange={(e) => updateField(section.id, field.id, "label", e.target.value)}
                                  className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                  placeholder="Field label"
                                />
                                <select
                                  value={field.type}
                                  onChange={(e) => updateField(section.id, field.id, "type", e.target.value)}
                                  className="px-3 py-1.5 rounded-lg border border-neutral-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                                >
                                  {fieldTypes.map((ft) => (
                                    <option key={ft.id} value={ft.id}>{ft.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex items-center gap-3">
                                <input
                                  type="text"
                                  value={field.placeholder || ""}
                                  onChange={(e) => updateField(section.id, field.id, "placeholder", e.target.value)}
                                  className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-200 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                  placeholder="Placeholder text"
                                />
                                <label className="flex items-center gap-2 text-[12px] text-neutral-600 whitespace-nowrap">
                                  <input
                                    type="checkbox"
                                    checked={field.isRequired}
                                    onChange={(e) => updateField(section.id, field.id, "isRequired", e.target.checked)}
                                    className="rounded border-neutral-300"
                                  />
                                  Required
                                </label>
                              </div>
                              {field.type === "select" && (
                                <input
                                  type="text"
                                  value={field.options?.join(", ") || ""}
                                  onChange={(e) =>
                                    updateField(section.id, field.id, "options", e.target.value.split(",").map((o) => o.trim()))
                                  }
                                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-200 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                  placeholder="Options (comma-separated): Option 1, Option 2, Option 3"
                                />
                              )}
                            </div>
                            <button
                              onClick={() => removeField(section.id, field.id)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => addField(section.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium text-neutral-600 hover:bg-neutral-100 w-full justify-center border border-dashed border-neutral-300"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Field
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {sections.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200/60">
              <FileText className="h-10 w-10 mx-auto mb-3 text-neutral-300" />
              <p className="text-[14px] text-neutral-500">No sections added yet</p>
              <button
                onClick={addSection}
                className="mt-3 text-[13px] text-blue-600 hover:underline"
              >
                Add your first section
              </button>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl text-[14px] font-medium text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving || sections.length === 0}
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

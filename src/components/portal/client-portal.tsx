"use client"

import { useState, useEffect } from "react"
import {
  CheckCircle,
  ChevronRight,
  Building,
  Mail,
  Shield,
  Monitor,
  Database,
  FileText,
  Users,
  AppWindow,
  Folder,
  Key,
  AlertCircle,
  Loader2,
  LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  building: Building,
  mail: Mail,
  shield: Shield,
  monitor: Monitor,
  database: Database,
  "file-text": FileText,
  users: Users,
  "app-window": AppWindow,
  folder: Folder,
}

interface Section {
  id: string
  name: string
  description: string | null
  icon: string
  order: number
  isRequired: boolean
  status: string
  responses: Response[]
}

interface Response {
  id: string
  fieldLabel: string
  fieldType: string
  value: string | null
  fileUrl: string | null
  isRequired: boolean
  order: number
}

interface Credential {
  id: string
  systemName: string
  systemType: string | null
  username: string | null
  secureLink: string | null
  notes: string | null
  status: string
}

interface Project {
  id: string
  clientName: string
  accessToken: string
  status: string
  completionPercent: number
  organization: {
    name: string
    logo: string | null
    primaryColor: string
  }
  template: {
    name: string
    type: string
  }
  sections: Section[]
  credentials: Credential[]
}

interface ClientPortalProps {
  project: Project
}

export function ClientPortal({ project: initialProject }: ClientPortalProps) {
  const [project, setProject] = useState(initialProject)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Initialize form data from existing responses
  useEffect(() => {
    const initialData: Record<string, string> = {}
    project.sections.forEach((section) => {
      section.responses.forEach((response) => {
        if (response.value) {
          initialData[response.id] = response.value
        }
      })
    })
    setFormData(initialData)
  }, [project])

  const currentSection = project.sections[currentSectionIndex]
  const completedSections = project.sections.filter(
    (s) => s.status === "completed" || s.status === "not_applicable"
  ).length
  const progressPercent = Math.round((completedSections / project.sections.length) * 100)

  const handleInputChange = (responseId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [responseId]: value }))
    setSaved(false)
  }

  const handleSaveSection = async (markComplete = false) => {
    setSaving(true)

    try {
      const responses = currentSection.responses.map((response) => ({
        id: response.id,
        value: formData[response.id] || null,
      }))

      const res = await fetch(`/api/portal/${project.accessToken}/sections/${currentSection.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses,
          markComplete,
        }),
      })

      if (!res.ok) throw new Error("Failed to save")

      const updated = await res.json()

      // Update local state
      setProject((prev) => ({
        ...prev,
        completionPercent: updated.completionPercent,
        sections: prev.sections.map((s) =>
          s.id === currentSection.id ? { ...s, status: updated.sectionStatus } : s
        ),
      }))

      setSaved(true)

      if (markComplete && currentSectionIndex < project.sections.length - 1) {
        setCurrentSectionIndex((prev) => prev + 1)
        setSaved(false)
      }
    } catch (error) {
      console.error(error)
      alert("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleMarkNotApplicable = async () => {
    setSaving(true)

    try {
      const res = await fetch(`/api/portal/${project.accessToken}/sections/${currentSection.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markNotApplicable: true }),
      })

      if (!res.ok) throw new Error("Failed to update")

      const updated = await res.json()

      setProject((prev) => ({
        ...prev,
        completionPercent: updated.completionPercent,
        sections: prev.sections.map((s) =>
          s.id === currentSection.id ? { ...s, status: "not_applicable" } : s
        ),
      }))

      if (currentSectionIndex < project.sections.length - 1) {
        setCurrentSectionIndex((prev) => prev + 1)
      }
    } catch (error) {
      console.error(error)
      alert("Failed to update. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const isSectionComplete = () => {
    return currentSection.responses
      .filter((r) => r.isRequired)
      .every((r) => formData[r.id]?.trim())
  }

  const renderField = (response: Response) => {
    const value = formData[response.id] || ""

    switch (response.fieldType) {
      case "textarea":
        return (
          <Textarea
            id={response.id}
            value={value}
            onChange={(e) => handleInputChange(response.id, e.target.value)}
            placeholder={`Enter ${response.fieldLabel.toLowerCase()}...`}
            rows={3}
          />
        )

      case "select":
        let options: string[] = []
        try {
          // Try to get options from field - in real implementation, this would come from the field definition
          options = ["Option 1", "Option 2", "Option 3"]
        } catch {
          options = []
        }
        return (
          <Select
            value={value}
            onValueChange={(v) => handleInputChange(response.id, v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${response.fieldLabel.toLowerCase()}...`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "email":
        return (
          <Input
            id={response.id}
            type="email"
            value={value}
            onChange={(e) => handleInputChange(response.id, e.target.value)}
            placeholder="email@example.com"
          />
        )

      case "phone":
        return (
          <Input
            id={response.id}
            type="tel"
            value={value}
            onChange={(e) => handleInputChange(response.id, e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        )

      case "url":
        return (
          <Input
            id={response.id}
            type="url"
            value={value}
            onChange={(e) => handleInputChange(response.id, e.target.value)}
            placeholder="https://..."
          />
        )

      case "file":
        return (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
            <input
              type="file"
              id={response.id}
              className="hidden"
              onChange={(e) => {
                // File upload handling would go here
                const file = e.target.files?.[0]
                if (file) {
                  handleInputChange(response.id, file.name)
                }
              }}
            />
            <label
              htmlFor={response.id}
              className="cursor-pointer text-sm text-gray-600"
            >
              {value ? (
                <span className="text-blue-600">{value}</span>
              ) : (
                <>
                  <span className="text-blue-600 hover:underline">Click to upload</span>
                  {" "}or drag and drop
                </>
              )}
            </label>
          </div>
        )

      default:
        return (
          <Input
            id={response.id}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(response.id, e.target.value)}
            placeholder={`Enter ${response.fieldLabel.toLowerCase()}...`}
          />
        )
    }
  }

  const SectionIcon = iconMap[currentSection?.icon] || Folder

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {project.organization.logo ? (
                <img
                  src={project.organization.logo}
                  alt={project.organization.name}
                  className="h-10 w-10 rounded-lg object-contain"
                />
              ) : (
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: project.organization.primaryColor }}
                >
                  {project.organization.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="font-semibold text-gray-900">
                  {project.organization.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Onboarding: {project.clientName}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{progressPercent}% Complete</p>
              <Progress value={progressPercent} className="w-32 h-2 mt-1" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {project.sections.map((section, index) => {
                const Icon = iconMap[section.icon] || Folder
                const isActive = index === currentSectionIndex
                const isComplete = section.status === "completed" || section.status === "not_applicable"

                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSectionIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-100 text-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "h-6 w-6 rounded flex items-center justify-center",
                        isComplete
                          ? "bg-green-100 text-green-600"
                          : isActive
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                      )}
                    >
                      {isComplete ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium truncate">{section.name}</span>
                    {section.isRequired && !isComplete && (
                      <span className="text-red-500 text-xs">*</span>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Credentials Section */}
            {project.credentials.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Credentials
                </h3>
                <div className="space-y-2">
                  {project.credentials.map((cred) => (
                    <div
                      key={cred.id}
                      className="text-sm p-2 rounded bg-gray-50 flex items-center gap-2"
                    >
                      {cred.status === "received" || cred.status === "verified" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="truncate">{cred.systemName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content - Current Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div
                    className="h-12 w-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${project.organization.primaryColor}15` }}
                  >
                    <SectionIcon
                      className="h-6 w-6"
                      style={{ color: project.organization.primaryColor }}
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{currentSection.name}</CardTitle>
                    {currentSection.description && (
                      <CardDescription className="mt-1">
                        {currentSection.description}
                      </CardDescription>
                    )}
                  </div>
                  {currentSection.status === "completed" && (
                    <Badge variant="success">Completed</Badge>
                  )}
                  {currentSection.status === "not_applicable" && (
                    <Badge variant="secondary">N/A</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentSection.responses.map((response) => (
                  <div key={response.id} className="space-y-2">
                    <Label htmlFor={response.id}>
                      {response.fieldLabel}
                      {response.isRequired && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>
                    {renderField(response)}
                  </div>
                ))}

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {saved && (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Saved
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {!currentSection.isRequired && currentSection.status !== "not_applicable" && (
                      <Button
                        variant="outline"
                        onClick={handleMarkNotApplicable}
                        disabled={saving}
                      >
                        Mark N/A
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => handleSaveSection(false)}
                      disabled={saving}
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Save Progress"
                      )}
                    </Button>
                    <Button
                      onClick={() => handleSaveSection(true)}
                      disabled={saving || !isSectionComplete()}
                      style={{ backgroundColor: project.organization.primaryColor }}
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : currentSectionIndex < project.sections.length - 1 ? (
                        <>
                          Save & Continue
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        "Complete Section"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation hint */}
            <p className="text-sm text-gray-500 mt-4 text-center">
              Your progress is automatically saved. You can return anytime to complete this form.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

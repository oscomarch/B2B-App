"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  Building2,
  User,
  Bell,
  Palette,
  Save,
  Check,
  AlertTriangle,
  X,
} from "lucide-react"

interface SettingsFormProps {
  organization: {
    id: string
    name: string
    slug: string
    primaryColor: string
  }
  user: {
    id: string
    name: string
    email: string
  }
}

export function SettingsForm({ organization, user }: SettingsFormProps) {
  const router = useRouter()
  const { update: updateSession } = useSession()
  const [activeTab, setActiveTab] = useState("organization")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Organization form state
  const [orgName, setOrgName] = useState(organization.name)
  const [orgSlug, setOrgSlug] = useState(organization.slug)
  const [primaryColor, setPrimaryColor] = useState(organization.primaryColor)

  // User form state
  const [userName, setUserName] = useState(user.name)

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [projectUpdates, setProjectUpdates] = useState(true)
  const [clientActivity, setClientActivity] = useState(true)

  // Delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")
  const [deletePasswordConfirm, setDeletePasswordConfirm] = useState("")
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [deleting, setDeleting] = useState(false)

  const tabs = [
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  const handleSaveOrganization = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/organization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orgName,
          slug: orgSlug,
          primaryColor,
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      router.refresh()
    } catch (error) {
      console.error("Error saving:", error)
      alert("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
        }),
      })
      if (!res.ok) throw new Error("Failed to save")

      // Update the session to reflect the new name
      await updateSession({ name: userName })

      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      router.refresh()
    } catch (error) {
      console.error("Error saving:", error)
      alert("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteOrganization = async () => {
    if (deletePassword !== deletePasswordConfirm) {
      alert("Passwords do not match")
      return
    }
    if (deleteConfirmText !== `delete ${organization.name}`) {
      alert("Please type the confirmation text exactly")
      return
    }

    setDeleting(true)
    try {
      const res = await fetch("/api/organization", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: deletePassword,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to delete")
      }
      // Redirect to login after deletion
      window.location.href = "/login"
    } catch (error) {
      console.error("Error deleting:", error)
      alert(error instanceof Error ? error.message : "Failed to delete organization")
    } finally {
      setDeleting(false)
    }
  }

  const canDelete =
    deletePassword.length >= 6 &&
    deletePassword === deletePasswordConfirm &&
    deleteConfirmText === `delete ${organization.name}`

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Organization Tab */}
      {activeTab === "organization" && (
        <>
          <div className="bg-white rounded-2xl border border-neutral-200/60 p-6 space-y-6">
            <div>
              <h3 className="text-[16px] font-semibold text-neutral-900 mb-1">
                Organization Details
              </h3>
              <p className="text-[13px] text-neutral-500">
                Update your organization information
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  URL Slug
                </label>
                <div className="flex items-center">
                  <span className="px-4 py-2.5 bg-neutral-100 border border-r-0 border-neutral-200 rounded-l-xl text-[14px] text-neutral-500">
                    getrelay.fr/
                  </span>
                  <input
                    type="text"
                    value={orgSlug}
                    onChange={(e) => setOrgSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    className="flex-1 px-4 py-2.5 rounded-r-xl border border-neutral-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Brand Color
                  </div>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 rounded-xl border border-neutral-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-32 px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <button
                onClick={handleSaveOrganization}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
              >
                {saved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Danger Zone - Only in Organization tab */}
          <div className="bg-white rounded-2xl border border-red-200 p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-semibold text-neutral-900 mb-1">
                  Danger Zone
                </h3>
                <p className="text-[13px] text-neutral-500 mb-4">
                  Once you delete your organization, there is no going back. This will permanently delete all projects, templates, and data.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 rounded-xl text-[13px] font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                >
                  Delete Organization
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-neutral-200/60 p-6 space-y-6">
          <div>
            <h3 className="text-[16px] font-semibold text-neutral-900 mb-1">
              Your Profile
            </h3>
            <p className="text-[13px] text-neutral-500">
              Update your personal information
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] bg-neutral-50 text-neutral-500"
              />
              <p className="text-[12px] text-neutral-400 mt-1">
                Contact support to change your email address
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-neutral-200/60 p-6 space-y-6">
          <div>
            <h3 className="text-[16px] font-semibold text-neutral-900 mb-1">
              Notification Preferences
            </h3>
            <p className="text-[13px] text-neutral-500">
              Choose what notifications you receive
            </p>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors">
              <div>
                <p className="text-[14px] font-medium text-neutral-900">Email Notifications</p>
                <p className="text-[13px] text-neutral-500">Receive email notifications for important updates</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors">
              <div>
                <p className="text-[14px] font-medium text-neutral-900">Project Updates</p>
                <p className="text-[13px] text-neutral-500">Get notified when projects are completed</p>
              </div>
              <input
                type="checkbox"
                checked={projectUpdates}
                onChange={(e) => setProjectUpdates(e.target.checked)}
                className="w-5 h-5 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors">
              <div>
                <p className="text-[14px] font-medium text-neutral-900">Client Activity</p>
                <p className="text-[13px] text-neutral-500">Get notified when clients submit information</p>
              </div>
              <input
                type="checkbox"
                checked={clientActivity}
                onChange={(e) => setClientActivity(e.target.checked)}
                className="w-5 h-5 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <p className="text-[12px] text-neutral-400">
              Notification preferences are saved automatically
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-[18px] font-semibold text-neutral-900">
                  Delete Organization
                </h2>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-[13px] text-red-800">
                  <strong>Warning:</strong> This action cannot be undone. This will permanently delete the organization <strong>{organization.name}</strong>, all projects, templates, and associated data.
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Enter your password
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Confirm your password
                </label>
                <input
                  type="password"
                  value={deletePasswordConfirm}
                  onChange={(e) => setDeletePasswordConfirm(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1.5">
                  Type <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-red-600">delete {organization.name}</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={`delete ${organization.name}`}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-[14px] font-mono focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl text-[13px] font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrganization}
                disabled={!canDelete || deleting}
                className="px-5 py-2 rounded-xl text-[13px] font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting..." : "Delete Organization"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

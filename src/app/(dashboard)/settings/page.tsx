"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Building, Palette, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    name: "",
    primaryColor: "#2563eb",
    logo: "",
  })

  useEffect(() => {
    fetch("/api/organization")
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          name: data.name || "",
          primaryColor: data.primaryColor || "#2563eb",
          logo: data.logo || "",
        })
      })
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSaved(false)

    try {
      const res = await fetch("/api/organization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (!res.ok) throw new Error("Failed to save")

      setSaved(true)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your organization settings</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Organization Details
            </CardTitle>
            <CardDescription>
              These settings affect how your organization appears to clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your Company Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                type="url"
                value={settings.logo}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, logo: e.target.value }))
                }
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-gray-500">
                Enter a URL to your logo image. Recommended size: 200x200px
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryColor" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Brand Color
              </Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id="primaryColor"
                  value={settings.primaryColor}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, primaryColor: e.target.value }))
                  }
                  className="h-10 w-20 rounded border border-gray-200 cursor-pointer"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, primaryColor: e.target.value }))
                  }
                  placeholder="#2563eb"
                  className="w-32"
                />
              </div>
              <p className="text-xs text-gray-500">
                This color will be used in the client portal
              </p>
            </div>

            {/* Preview */}
            <div className="pt-4 border-t">
              <Label className="mb-3 block">Preview</Label>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {settings.logo ? (
                  <img
                    src={settings.logo}
                    alt="Logo preview"
                    className="h-12 w-12 rounded-lg object-contain"
                  />
                ) : (
                  <div
                    className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    {settings.name.charAt(0) || "H"}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{settings.name || "Your Organization"}</p>
                  <p className="text-sm text-gray-500">Client Onboarding Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              {saved && (
                <span className="text-sm text-green-600">Settings saved!</span>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

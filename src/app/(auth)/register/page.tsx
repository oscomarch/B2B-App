"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          organizationName: formData.organizationName,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed")
      } else {
        router.push("/login?registered=true")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center">
              <span className="text-xl font-semibold text-white">R</span>
            </div>
            <span className="text-2xl font-medium text-neutral-900">Relay</span>
          </Link>
          <h1 className="text-2xl font-medium text-neutral-900 mb-2">
            Create your account
          </h1>
          <p className="text-neutral-500">
            Start streamlining your client onboarding
          </p>
        </div>

        {/* Form Card */}
        <div className="card-elevated p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 text-sm text-coral-dark bg-coral/10 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="organizationName" className="text-sm font-medium text-neutral-700">
                Company name
              </Label>
              <Input
                id="organizationName"
                name="organizationName"
                placeholder="Acme MSP"
                value={formData.organizationName}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border-neutral-200/60 bg-neutral-50/50 focus:bg-white focus:border-coral/50 focus:ring-coral/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-neutral-700">
                Your name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border-neutral-200/60 bg-neutral-50/50 focus:bg-white focus:border-coral/50 focus:ring-coral/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border-neutral-200/60 bg-neutral-50/50 focus:bg-white focus:border-coral/50 focus:ring-coral/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-xl border-neutral-200/60 bg-neutral-50/50 focus:bg-white focus:border-coral/50 focus:ring-coral/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700">
                  Confirm
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-xl border-neutral-200/60 bg-neutral-50/50 focus:bg-white focus:border-coral/50 focus:ring-coral/20"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 gap-2 mt-2" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="text-coral hover:text-coral-dark font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

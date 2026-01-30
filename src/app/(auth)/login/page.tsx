"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered") === "true"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
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
          Welcome back
        </h1>
        <p className="text-neutral-500">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form Card */}
      <div className="card-elevated p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {registered && (
            <div className="p-4 text-sm text-green-soft bg-green-soft/10 rounded-xl">
              Account created successfully! Please sign in.
            </div>
          )}
          {error && (
            <div className="p-4 text-sm text-coral-dark bg-coral/10 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-xl border-neutral-200/60 bg-neutral-50/50 focus:bg-white focus:border-coral/50 focus:ring-coral/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-xl border-neutral-200/60 bg-neutral-50/50 focus:bg-white focus:border-coral/50 focus:ring-coral/20"
            />
          </div>

          <Button type="submit" className="w-full h-12 gap-2" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </div>

      {/* Footer */}
      <p className="text-center mt-8 text-sm text-neutral-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-coral hover:text-coral-dark font-medium transition-colors">
          Create one
        </Link>
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center">
            <span className="text-xl font-semibold text-white">R</span>
          </div>
          <span className="text-2xl font-medium text-neutral-900">Relay</span>
        </div>
        <h1 className="text-2xl font-medium text-neutral-900 mb-2">
          Welcome back
        </h1>
        <p className="text-neutral-500">Loading...</p>
      </div>
      <div className="card-elevated p-8 animate-pulse">
        <div className="space-y-6">
          <div className="h-12 bg-neutral-100 rounded-xl" />
          <div className="h-12 bg-neutral-100 rounded-xl" />
          <div className="h-12 bg-neutral-200 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-12">
      <Suspense fallback={<LoadingState />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

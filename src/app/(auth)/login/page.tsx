"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
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
        router.push("/app/projects")
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
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
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
      <div className="bg-white rounded-2xl border border-neutral-200/60 p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {registered && (
            <div className="p-4 text-sm text-green-700 bg-green-50 rounded-xl border border-green-200/60">
              Account created successfully! Please sign in.
            </div>
          )}
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200/60">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-[13px] font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-[13px] font-medium text-neutral-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl text-[15px] font-medium text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="text-center mt-8 text-sm text-neutral-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#3B82C4] hover:text-[#2d6ba0] font-medium transition-colors">
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
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            <span className="text-xl font-semibold text-white">R</span>
          </div>
          <span className="text-2xl font-medium text-neutral-900">Relay</span>
        </div>
        <h1 className="text-2xl font-medium text-neutral-900 mb-2">
          Welcome back
        </h1>
        <p className="text-neutral-500">Loading...</p>
      </div>
      <div className="bg-white rounded-2xl border border-neutral-200/60 p-8 animate-pulse">
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
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6 py-12">
      <Suspense fallback={<LoadingState />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="text-center max-w-md">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center">
            <span className="text-lg font-semibold text-white">R</span>
          </div>
          <span className="text-xl font-medium text-neutral-900">Relay</span>
        </Link>

        {/* Icon */}
        <div className="h-20 w-20 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="h-10 w-10 text-coral" />
        </div>

        {/* Content */}
        <h1 className="text-3xl font-medium text-neutral-900 mb-4">Something went wrong</h1>
        <p className="text-body-lg mb-10">
          An unexpected error occurred. Please try again or contact support if the
          problem persists.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button variant="outline" className="gap-2 min-w-[140px]">
              <Home className="h-4 w-4" />
              Go home
            </Button>
          </Link>
          <Button
            onClick={reset}
            className="gap-2 min-w-[140px] bg-gradient-to-r from-coral to-pink-soft hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}

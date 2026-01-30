import Link from "next/link"
import { FileQuestion, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
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
        <div className="h-20 w-20 rounded-2xl bg-neutral-100/80 flex items-center justify-center mx-auto mb-8">
          <FileQuestion className="h-10 w-10 text-neutral-400" />
        </div>

        {/* Content */}
        <h1 className="text-3xl font-medium text-neutral-900 mb-4">Page not found</h1>
        <p className="text-body-lg mb-10">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
          moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button variant="outline" className="gap-2 min-w-[140px]">
              <Home className="h-4 w-4" />
              Go home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="gap-2 min-w-[140px] bg-gradient-to-r from-coral to-pink-soft hover:opacity-90">
              Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

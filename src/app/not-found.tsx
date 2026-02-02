import Link from "next/link"
import { FileQuestion, ArrowRight, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6">
      <div className="text-center max-w-md">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            <span className="text-lg font-semibold text-white">R</span>
          </div>
          <span className="text-xl font-medium text-neutral-900">Relay</span>
        </Link>

        {/* Icon */}
        <div className="h-20 w-20 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-8">
          <FileQuestion className="h-10 w-10 text-neutral-400" />
        </div>

        {/* Content */}
        <h1 className="text-3xl font-medium text-neutral-900 mb-4">Page not found</h1>
        <p className="text-neutral-500 text-lg mb-10">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors min-w-[140px]"
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-white min-w-[140px] transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

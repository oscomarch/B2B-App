"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-[14px] font-medium">Back to home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
              <span className="text-[12px] font-bold text-white">R</span>
            </div>
            <span className="text-[16px] font-semibold text-neutral-900">Relay</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer nav */}
      <footer className="border-t border-neutral-200/60 py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[12px] text-neutral-400 mb-4">Legal documents</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/terms" className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/privacy" className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/cgv" className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">
              CGV
            </Link>
            <Link href="/legal/cookies" className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

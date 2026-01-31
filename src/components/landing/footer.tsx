"use client"

import Link from "next/link"

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-neutral-200/60">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
              >
                <span className="text-[12px] font-bold text-white">R</span>
              </div>
              <span className="text-[16px] font-semibold text-neutral-900">Relay</span>
            </Link>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Secure client onboarding for MSPs.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">Features</Link></li>
              <li><Link href="#vision" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">How it works</Link></li>
              <li><Link href="/login" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">Sign in</Link></li>
              <li><Link href="/register" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">Get started</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">Contact</Link></li>
              <li><a href="mailto:hello@getrelay.fr" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">hello@getrelay.fr</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/terms" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/cgv" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">CGV</Link></li>
              <li><Link href="/legal/cookies" className="text-[14px] text-neutral-600 hover:text-neutral-900 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-neutral-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-neutral-400">
            © {currentYear} Relay. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/getrelayapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/company/getrelay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import {
  Navbar,
  Hero,
  SocialProof,
  Statement,
  ProductSections,
  Comparison,
  CTA,
  Footer,
} from "@/components/landing"

export function LandingPage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-white relative">
        {/* Global gradient background */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50/80 via-white to-orange-50/60 pointer-events-none" />

        {/* Global dotted pattern */}
        <div
          className="fixed inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <SocialProof />
          <Statement />
          <ProductSections />
          <Comparison />
          <CTA />
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  )
}

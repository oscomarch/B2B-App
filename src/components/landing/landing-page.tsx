"use client"

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { DottedSurface } from "@/components/ui/dotted-surface"
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
      <div className="min-h-screen bg-[#FAFAFA] relative">
        {/* 3D Dotted Surface Background */}
        <DottedSurface className="opacity-50" />

        {/* Subtle gradient overlay for depth */}
        <div className="fixed inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#FAFAFA]/90 pointer-events-none z-0" />

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

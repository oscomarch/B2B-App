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
      <div className="min-h-screen bg-[#FAFAFA] relative">
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

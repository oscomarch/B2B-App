"use client"

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import {
  Navbar,
  Hero,
  Comparison,
  TrustedBy,
  Features,
  HowItWorks,
  CTA,
  Footer,
} from "@/components/landing"

export function LandingPage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <Hero />
        <Comparison />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <CTA />
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}

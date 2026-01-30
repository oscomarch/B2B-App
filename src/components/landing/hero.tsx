"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn, TextReveal, AnimatedGradient } from "@/components/animations/motion"
import { AnimatedButton } from "@/components/ui/animated-button"

export function Hero() {
  return (
    <section className="pt-32 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Rounded rectangle hero container */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white to-cream-dark border border-neutral-200/40 px-8 py-20 md:px-16 md:py-28">
          {/* Animated gradient accents */}
          <AnimatedGradient />
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-coral/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-soft/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.8, 0.5, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 mb-8">
                <motion.span
                  className="w-2 h-2 rounded-full bg-coral"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-medium uppercase tracking-wider text-coral-dark">
                  Built for MSPs
                </span>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.2}>
              <h1 className="text-display text-neutral-900 mb-8">
                <TextReveal text="Send one link." delay={0.3} />
                <br />
                <span className="bg-gradient-to-r from-coral to-pink-soft bg-clip-text text-transparent">
                  <TextReveal text="Collect everything." delay={0.5} />
                </span>
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.4}>
              <p className="text-body-lg max-w-2xl mx-auto mb-12">
                Relay replaces spreadsheets, PDFs, and email chaos with a single,
                structured onboarding portal for your MSP clients.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <AnimatedButton variant="primary" size="lg" className="min-w-[200px] shadow-lg shadow-coral/25">
                    Book a demo
                    <ArrowRight className="h-4 w-4" />
                  </AnimatedButton>
                </Link>
                <Link href="#how-it-works">
                  <AnimatedButton variant="outline" size="lg" className="min-w-[200px] bg-white/60">
                    See how it works
                  </AnimatedButton>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

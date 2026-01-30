"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn, TextReveal } from "@/components/animations/motion"

export function Hero() {
  return (
    <section className="relative pt-28 pb-8 px-6 min-h-[85vh] flex items-center">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Rounded rectangle hero container */}
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] bg-white/50 backdrop-blur-sm border border-neutral-200 shadow-sm px-8 py-20 md:px-16 md:py-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Inner gradient accents */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <FadeIn delay={0.3}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 mb-8">
                Unlock efficiency with streamlined onboarding
              </p>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.4}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-900 mb-8 tracking-tight leading-[1.1]">
                <TextReveal text="Meet the MSP" delay={0.5} />
                <br />
                <TextReveal text="onboarding agent." delay={0.7} />
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.6}>
              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                Relay is an agent that collects client information and sends you
                everything you need at the right time.
              </p>
            </FadeIn>

            {/* CTA Button */}
            <FadeIn delay={0.7}>
              <div className="flex justify-center">
                <Link href="/register">
                  <motion.button
                    className="flex items-center gap-3 pl-8 pr-3 py-3 bg-neutral-900 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book a demo
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-neutral-900">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </motion.button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

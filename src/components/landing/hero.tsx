"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { FadeIn } from "@/components/animations/motion"

export function Hero() {
  return (
    <section className="relative pt-28 pb-12 px-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main hero container */}
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] bg-white/50 backdrop-blur-sm border border-neutral-200 shadow-sm px-8 py-16 md:px-16 md:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Inner gradient accents */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-[1fr,380px] gap-12 items-start">
            {/* Left content */}
            <div className="max-w-2xl">
              {/* Kicker */}
              <FadeIn delay={0.3}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-6">
                  Secure client onboarding for MSPs
                </p>
              </FadeIn>

              {/* Headline */}
              <FadeIn delay={0.4}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 mb-6 tracking-tight leading-[1.1]">
                  Meet the client handoff portal for MSPs.
                </h1>
              </FadeIn>

              {/* Subheadline */}
              <FadeIn delay={0.5}>
                <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
                  Relay replaces onboarding spreadsheets + email threads with one secure intake link. Collect access, credentials, and IT discovery details, track what's missing, and hand off cleanly to your team.
                </p>
              </FadeIn>

              {/* CTA Button */}
              <FadeIn delay={0.6}>
                <div className="mb-6">
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

              {/* Microcopy */}
              <FadeIn delay={0.7}>
                <p className="text-sm text-neutral-500">
                  No more "can you resend the DNS login?" · No passwords in email · Clear status for every request
                </p>
              </FadeIn>
            </div>

            {/* Right card - Onboarding play */}
            <FadeIn delay={0.6} direction="right">
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200 shadow-sm p-6 hidden lg:block"
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Play className="h-5 w-5 text-white fill-white" />
                  </div>
                  <span className="text-sm font-medium text-neutral-500">Onboarding play</span>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Take over a new client
                </h3>
                <p className="text-sm text-neutral-600 mb-5 leading-relaxed">
                  Turn a messy transition into a structured intake your client actually completes.
                </p>

                <div className="pt-4 border-t border-neutral-100">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">
                    Happens when
                  </p>
                  <p className="text-sm text-neutral-600">
                    Contract signed · Kickoff done · Cutover scheduled
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main hero container */}
        <motion.div
          className="relative overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-xl border border-neutral-200/60 px-8 py-16 md:px-14 md:py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative z-10 grid lg:grid-cols-[1fr,340px] gap-12 items-start">
            {/* Left content */}
            <div className="max-w-xl">
              {/* Kicker */}
              <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Secure client onboarding for MSPs
              </motion.p>

              {/* Headline */}
              <motion.h1
                className="text-[42px] md:text-[52px] font-medium text-neutral-900 mb-6 tracking-[-0.02em] leading-[1.08]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Meet the client handoff portal for MSPs.
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-[17px] text-neutral-500 mb-10 leading-[1.6] max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Relay replaces onboarding spreadsheets + email threads with one secure intake link. Collect access, credentials, and IT discovery details, track what's missing, and hand off cleanly to your team.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link href="/register">
                  <motion.button
                    className="group flex items-center gap-3 pl-6 pr-2 py-2 bg-neutral-900 rounded-full text-[14px] font-medium text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book a demo
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-neutral-900 group-hover:bg-neutral-100 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Microcopy */}
              <motion.p
                className="text-[13px] text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                No more "can you resend the DNS login?" · No passwords in email · Clear status for every request
              </motion.p>
            </div>

            {/* Right card - Onboarding play */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-200/60 p-5 hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0, 0, 0, 0.06)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-neutral-900 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
                <span className="text-[12px] font-medium text-neutral-400 uppercase tracking-wide">Onboarding play</span>
              </div>

              <h3 className="text-[17px] font-semibold text-neutral-900 mb-2 tracking-tight">
                Take over a new client
              </h3>
              <p className="text-[14px] text-neutral-500 mb-5 leading-relaxed">
                Turn a messy transition into a structured intake your client actually completes.
              </p>

              <div className="pt-4 border-t border-neutral-100">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-400 mb-2">
                  Happens when
                </p>
                <p className="text-[13px] text-neutral-500">
                  Contract signed · Kickoff done · Cutover scheduled
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

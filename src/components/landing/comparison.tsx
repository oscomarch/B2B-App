"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, ArrowRight } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/motion"

const oldWayItems = [
  "Spreadsheet intake + random docs",
  "Credentials handled in unsafe workarounds",
  "Techs ask \"where's the login?\" all day",
  "No reliable \"what's missing\" view",
  "Old MSP access sometimes left active (real risk)",
]

const relayWayItems = [
  "One secure intake portal per client",
  "Clear checklist: requested → received → verified",
  "Credential handoff with expiry + audit trail",
  "Built-in \"remove old MSP access\" step",
  "Clean handoff to delivery (so coordinators stop being the bottleneck)",
]

export function Comparison() {
  return (
    <section id="vision" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <motion.div
            className="relative overflow-hidden rounded-[2rem] bg-neutral-900 p-8 md:p-16 border border-neutral-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Gradient accents */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Section Header */}
              <div className="max-w-2xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">
                  From spreadsheet chaos to controlled client takeovers.
                </h2>
                <p className="text-neutral-400 text-lg">
                  Most MSP onboarding systems were not designed for handoffs and transitions. People improvise with checklists, PDFs, and tickets.
                </p>
              </div>

              {/* Comparison Grid */}
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
                {/* The Old Way */}
                <motion.div
                  className="bg-neutral-800/50 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-700 mb-6">
                    <span className="text-sm font-medium text-neutral-300">The old way</span>
                  </div>

                  <StaggerContainer delay={0.2} staggerDelay={0.08}>
                    <ul className="space-y-4">
                      {oldWayItems.map((item, index) => (
                        <StaggerItem key={index}>
                          <li className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <X className="h-3 w-3 text-neutral-500" />
                            </div>
                            <span className="text-neutral-400 text-sm">{item}</span>
                          </li>
                        </StaggerItem>
                      ))}
                    </ul>
                  </StaggerContainer>
                </motion.div>

                {/* The Relay Way */}
                <motion.div
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 mb-6">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-blue-400"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-blue-300">The Relay way</span>
                  </div>

                  <StaggerContainer delay={0.3} staggerDelay={0.08}>
                    <ul className="space-y-4">
                      {relayWayItems.map((item, index) => (
                        <StaggerItem key={index}>
                          <li className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-neutral-200 text-sm">{item}</span>
                          </li>
                        </StaggerItem>
                      ))}
                    </ul>
                  </StaggerContainer>
                </motion.div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-700 rounded-full text-sm font-medium text-neutral-400">
                    Stuck there?
                  </span>
                </motion.div>
                <Link href="/register">
                  <motion.button
                    className="flex items-center gap-3 pl-6 pr-3 py-3 bg-white rounded-full text-neutral-900 font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Move forward
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}

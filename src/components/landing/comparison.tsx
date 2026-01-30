"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/motion"

const oldWayItems = [
  "Scattered emails with passwords in plain text",
  "Spreadsheets nobody can find or update",
  "Chasing clients for missing information",
  "No visibility into what's been completed",
  "Hours wasted on every new client",
]

const relayWayItems = [
  "Secure credential handover via encrypted links",
  "One centralized portal for everything",
  "Clients fill everything in one sitting",
  "Real-time progress tracking dashboard",
  "Professional onboarding in minutes",
]

export function Comparison() {
  return (
    <section id="vision" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Why Relay
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-neutral-900 tracking-tight">
            There&apos;s a better way to onboard
          </h2>
        </FadeIn>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* The Old Way */}
          <FadeIn delay={0.1} direction="left">
            <motion.div
              className="bg-white/60 backdrop-blur-sm p-8 h-full rounded-2xl border border-neutral-200 shadow-sm"
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 mb-8">
                <span className="text-sm font-medium text-neutral-500">The old way</span>
              </div>

              <StaggerContainer delay={0.2} staggerDelay={0.08}>
                <ul className="space-y-5">
                  {oldWayItems.map((item, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-start gap-4">
                        <div className="h-6 w-6 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="h-3.5 w-3.5 text-neutral-400" />
                        </div>
                        <span className="text-neutral-600">{item}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </motion.div>
          </FadeIn>

          {/* The Relay Way */}
          <FadeIn delay={0.2} direction="right">
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 h-full rounded-2xl border border-blue-200 shadow-sm"
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(59, 130, 246, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8">
                <motion.span
                  className="w-2 h-2 rounded-full bg-blue-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-blue-700">The Relay way</span>
              </div>

              <StaggerContainer delay={0.3} staggerDelay={0.08}>
                <ul className="space-y-5">
                  {relayWayItems.map((item, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-start gap-4">
                        <motion.div
                          className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Check className="h-3.5 w-3.5 text-white" />
                        </motion.div>
                        <span className="text-neutral-900">{item}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

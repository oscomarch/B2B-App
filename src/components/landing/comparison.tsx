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
          <p className="text-eyebrow mb-4">Why Relay</p>
          <h2 className="text-headline text-neutral-900 mb-6">
            There&apos;s a better way to onboard
          </h2>
        </FadeIn>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Way */}
          <FadeIn delay={0.1} direction="left">
            <motion.div
              className="card-soft p-8 h-full border-2 border-neutral-200/60"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 mb-8">
                <span className="text-sm font-medium text-neutral-500">The old way</span>
              </div>

              <StaggerContainer delay={0.2} staggerDelay={0.08}>
                <ul className="space-y-5">
                  {oldWayItems.map((item, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-start gap-4">
                        <motion.div
                          className="h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.1 }}
                        >
                          <X className="h-3.5 w-3.5 text-neutral-400" />
                        </motion.div>
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
              className="card-elevated p-8 h-full border-2 border-coral/20 bg-gradient-to-br from-white to-coral/5"
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(255, 138, 115, 0.15)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 mb-8">
                <motion.span
                  className="w-2 h-2 rounded-full bg-coral"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-coral-dark">The Relay way</span>
              </div>

              <StaggerContainer delay={0.3} staggerDelay={0.08}>
                <ul className="space-y-5">
                  {relayWayItems.map((item, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-start gap-4">
                        <motion.div
                          className="h-6 w-6 rounded-full bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center flex-shrink-0 mt-0.5"
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

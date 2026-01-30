"use client"

import { motion } from "framer-motion"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/motion"

const steps = [
  {
    number: 1,
    title: "Create a project",
    description: "Select a template and enter your client's info. Add any credential requests or custom fields.",
  },
  {
    number: 2,
    title: "Send the link",
    description: "Share the unique portal link with your client. No account creation or login required for them.",
  },
  {
    number: 3,
    title: "Track & complete",
    description: "Monitor progress in real-time. Complete your internal checklist as information comes in.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-neutral-900 mb-6 tracking-tight">
            Three simple steps
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Get started in minutes, not hours. Relay is designed to be simple
            enough to use without training.
          </p>
        </FadeIn>

        {/* Steps */}
        <StaggerContainer staggerDelay={0.15} className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-neutral-200 shadow-sm"
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 text-white text-xl font-semibold mb-6"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

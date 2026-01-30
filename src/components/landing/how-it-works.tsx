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
    <section id="how-it-works" className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <FadeIn className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-eyebrow mb-4">How it works</p>
          <h2 className="text-headline text-neutral-900 mb-6">
            Three simple steps
          </h2>
          <p className="text-body-lg">
            Get started in minutes, not hours. Relay is designed to be simple
            enough to use without training.
          </p>
        </FadeIn>

        {/* Steps */}
        <StaggerContainer staggerDelay={0.15} className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="text-center"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-coral to-pink-soft text-white text-2xl font-medium mb-6"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 10px 30px rgba(255, 138, 115, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-body">
                  {step.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Connection lines (desktop only) */}
        <div className="hidden md:block relative -mt-[180px] mb-[100px] pointer-events-none">
          <svg className="w-full h-2" viewBox="0 0 100 2" preserveAspectRatio="none">
            <motion.path
              d="M16.67 1 L50 1"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M50 1 L83.33 1"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF8A73" />
                <stop offset="100%" stopColor="#FF6B9D" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  )
}

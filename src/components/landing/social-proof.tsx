"use client"

import { motion } from "framer-motion"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/motion"
import { Quote } from "lucide-react"

const tools = ["PSA", "Documentation", "Password manager", "RMM", "Backup", "DNS"]

const testimonials = [
  {
    quote: "We were tracking onboarding in a spreadsheet. Relay gave us one link and a single source of truth.",
    author: "Service Coordinator",
    company: "30-person MSP",
  },
  {
    quote: "The best part is seeing what's blocking us. No more guessing who owes what.",
    author: "Operations Manager",
    company: "MSP",
  },
]

export function SocialProof() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-200 shadow-sm py-12 px-8">
            {/* Header */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 text-center mb-10">
              Built for MSP ops teams who run on checklists, PSAs, and documentation
            </p>

            {/* Tools/Logos row */}
            <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap mb-12 pb-12 border-b border-neutral-100">
              {tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  className="text-sm font-medium text-neutral-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ color: "#525252", scale: 1.05 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>

            {/* Testimonials */}
            <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="bg-neutral-50/50 rounded-xl p-6 border border-neutral-100"
                    whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Quote className="h-6 w-6 text-neutral-300 mb-4" />
                    <p className="text-neutral-700 mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-sm text-neutral-500">
                      — {testimonial.author}, {testimonial.company}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

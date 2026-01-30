"use client"

import { motion } from "framer-motion"

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
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-[24px] bg-white/70 backdrop-blur-xl border border-neutral-200/60 py-14 px-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 text-center mb-12">
            Built for MSP ops teams who run on checklists, PSAs, and documentation
          </p>

          {/* Tools row */}
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap mb-14 pb-14 border-b border-neutral-100">
            {tools.map((tool, index) => (
              <motion.span
                key={tool}
                className="text-[13px] font-medium text-neutral-300 cursor-default"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ color: "#404040", transition: { duration: 0.15 } }}
              >
                {tool}
              </motion.span>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative rounded-2xl bg-neutral-50/80 border border-neutral-100/80 p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <svg
                  className="absolute top-5 left-5 h-5 w-5 text-neutral-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-[15px] text-neutral-700 mb-5 leading-[1.65] pt-4">
                  {testimonial.quote}
                </p>
                <p className="text-[13px] text-neutral-400">
                  — {testimonial.author}, {testimonial.company}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

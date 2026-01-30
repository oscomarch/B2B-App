"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, ArrowRight } from "lucide-react"

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export function Comparison() {
  return (
    <section id="vision" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-[28px] bg-neutral-900 p-10 md:p-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Subtle gradient accents */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-neutral-800/50 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-neutral-800/30 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Section Header */}
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-[28px] md:text-[38px] font-medium text-white mb-5 tracking-[-0.02em] leading-[1.15]">
                From spreadsheet chaos to controlled client takeovers.
              </h2>
              <p className="text-[16px] text-neutral-400 leading-[1.7]">
                Most MSP onboarding systems were not designed for handoffs and transitions. People improvise with checklists, PDFs, and tickets.
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
              {/* The Old Way */}
              <motion.div
                className="bg-neutral-800/40 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/50"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-700/50 mb-6">
                  <span className="text-[12px] font-medium text-neutral-400">The old way</span>
                </div>

                <motion.ul
                  className="space-y-3.5"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {oldWayItems.map((item, index) => (
                    <motion.li key={index} className="flex items-start gap-3" variants={itemVariants}>
                      <div className="h-5 w-5 rounded-full bg-neutral-700/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="h-3 w-3 text-neutral-500" />
                      </div>
                      <span className="text-[14px] text-neutral-400 leading-[1.5]">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* The Relay Way */}
              <motion.div
                className="bg-white/[0.03] backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 mb-6">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-white"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[12px] font-medium text-neutral-200">The Relay way</span>
                </div>

                <motion.ul
                  className="space-y-3.5"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {relayWayItems.map((item, index) => (
                    <motion.li key={index} className="flex items-start gap-3" variants={itemVariants}>
                      <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-neutral-900" />
                      </div>
                      <span className="text-[14px] text-neutral-200 leading-[1.5]">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-800/60 border border-neutral-700/50 rounded-full text-[13px] font-medium text-neutral-500">
                Stuck there?
              </span>
              <Link href="/register">
                <motion.button
                  className="group flex items-center gap-2.5 pl-5 pr-2 py-2 bg-white rounded-full text-neutral-900 text-[13px] font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Move forward
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-900 text-white group-hover:bg-neutral-800 transition-colors">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

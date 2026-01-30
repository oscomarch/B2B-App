"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-[28px] bg-white/70 backdrop-blur-xl border border-neutral-200/60 p-12 md:p-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-[28px] md:text-[38px] lg:text-[44px] font-medium text-neutral-900 mb-6 tracking-[-0.02em] leading-[1.12]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Your onboarding runs even when you're busy.
            </motion.h2>
            <motion.p
              className="text-[17px] text-neutral-500 mb-12 leading-[1.7]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Onboarding sets the tone for the entire relationship. When it's clean, clients feel they made the right choice and your team starts delivering faster.
            </motion.p>
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href="/register">
                <motion.button
                  className="group flex items-center gap-3 pl-7 pr-2.5 py-2.5 bg-neutral-900 rounded-full text-white text-[14px] font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a demo
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-neutral-900 group-hover:bg-neutral-100 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.button>
              </Link>
              <p className="text-[13px] text-neutral-400">
                Early teams get white-glove setup + onboarding templates.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

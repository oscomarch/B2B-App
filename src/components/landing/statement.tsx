"use client"

import { motion } from "framer-motion"

export function Statement() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-[32px] md:text-[44px] lg:text-[52px] font-medium text-neutral-900 mb-8 tracking-[-0.02em] leading-[1.12]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Your checklist lists the tasks.
          <br />
          <span className="text-neutral-400">
            Relay gets the missing access.
          </span>
        </motion.h2>
        <motion.p
          className="text-[17px] text-neutral-500 leading-[1.7] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          MSP onboarding and takeovers are huge. "IT discovery" alone can run into hundreds of items.
          Relay turns that chaos into a guided intake that clients complete, with status, owners, and a clean handoff for your techs.
        </motion.p>
      </div>
    </section>
  )
}

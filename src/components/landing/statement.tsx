"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/motion"

export function Statement() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-900 mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Your checklist lists the tasks.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Relay gets the missing access.
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              MSP onboarding and takeovers are huge. "IT discovery" alone can run into hundreds of items.
              Relay turns that chaos into a guided intake that clients complete, with status, owners, and a clean handoff for your techs.
            </motion.p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

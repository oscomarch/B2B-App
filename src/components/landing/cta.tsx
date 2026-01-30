"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/animations/motion"

export function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <motion.div
            className="relative overflow-hidden rounded-[2rem] bg-neutral-900 p-12 md:p-20 border border-neutral-800"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient accents */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-orange-500/20 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <motion.p
                className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Get started today
              </motion.p>
              <motion.h2
                className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Ready to streamline your onboarding?
              </motion.h2>
              <motion.p
                className="text-lg text-neutral-400 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join MSPs who have already simplified their client onboarding
                process with Relay.
              </motion.p>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Link href="/register">
                  <motion.button
                    className="flex items-center gap-3 pl-8 pr-3 py-3 bg-white rounded-full text-neutral-900 font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book a demo
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 text-white">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}

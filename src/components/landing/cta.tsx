"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/animations/motion"

export function CTA() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] border border-neutral-200 shadow-sm p-12 md:p-20">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-900 mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Your onboarding runs even when you're busy.
              </motion.h2>
              <motion.p
                className="text-lg text-neutral-600 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Onboarding sets the tone for the entire relationship. When it's clean, clients feel they made the right choice and your team starts delivering faster.
              </motion.p>
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link href="/register">
                  <motion.button
                    className="flex items-center gap-3 pl-8 pr-3 py-3 bg-neutral-900 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book a demo
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-neutral-900">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </motion.button>
                </Link>
                <p className="text-sm text-neutral-500">
                  Early teams get white-glove setup + onboarding templates.
                </p>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

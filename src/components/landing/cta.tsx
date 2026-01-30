"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/animations/motion"
import { AnimatedButton } from "@/components/ui/animated-button"

export function CTA() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <FadeIn>
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-neutral-900 p-12 md:p-20"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(255, 138, 115, 0.2) 0%, transparent 50%, rgba(128, 90, 213, 0.2) 100%)",
                  "linear-gradient(225deg, rgba(255, 138, 115, 0.2) 0%, transparent 50%, rgba(128, 90, 213, 0.2) 100%)",
                  "linear-gradient(315deg, rgba(255, 138, 115, 0.2) 0%, transparent 50%, rgba(128, 90, 213, 0.2) 100%)",
                  "linear-gradient(45deg, rgba(255, 138, 115, 0.2) 0%, transparent 50%, rgba(128, 90, 213, 0.2) 100%)",
                  "linear-gradient(135deg, rgba(255, 138, 115, 0.2) 0%, transparent 50%, rgba(128, 90, 213, 0.2) 100%)",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Floating orbs */}
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-40 h-40 bg-purple-soft/20 rounded-full blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <motion.h2
                className="text-headline text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ready to streamline your onboarding?
              </motion.h2>
              <motion.p
                className="text-lg text-neutral-300 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Join MSPs who have already simplified their client onboarding
                process with Relay. Start your free trial today.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link href="/register">
                  <AnimatedButton variant="primary" size="lg" className="min-w-[200px]">
                    Book a demo
                    <ArrowRight className="h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}

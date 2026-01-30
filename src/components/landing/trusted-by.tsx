"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/motion"

const logos = ["ConnectWise", "Datto", "IT Glue", "Hudu"]

export function TrustedBy() {
  return (
    <section className="py-16 border-y border-neutral-200/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <FadeIn>
          <p className="text-eyebrow text-center mb-10">
            Trusted by MSPs worldwide
          </p>
        </FadeIn>
        <div className="flex items-center justify-center gap-12 md:gap-20">
          {logos.map((logo, index) => (
            <motion.span
              key={logo}
              className={`text-xl font-medium text-neutral-400 ${index === 3 ? "hidden md:block" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ opacity: 0.7, scale: 1.05 }}
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

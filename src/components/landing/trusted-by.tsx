"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/motion"

const logos = ["ConnectWise", "Datto", "IT Glue", "Hudu", "Syncro"]

export function TrustedBy() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-200 shadow-sm py-12 px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 text-center mb-8">
              Trusted by MSPs worldwide
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {logos.map((logo, index) => (
                <motion.span
                  key={logo}
                  className="text-lg font-medium text-neutral-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ color: "#525252", scale: 1.05 }}
                >
                  {logo}
                </motion.span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      className="py-12 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl rounded-[20px] border border-neutral-200/60 py-8 px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                <span className="text-[13px] font-bold text-white">R</span>
              </div>
              <span className="text-[17px] font-semibold text-neutral-900 tracking-tight">Relay</span>
            </Link>

            {/* Tagline */}
            <p className="text-[13px] text-neutral-400">
              Built for MSPs, by MSPs.
            </p>

            {/* Links */}
            <div className="flex items-center gap-8">
              <Link
                href="/login"
                className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

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
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-200 shadow-sm py-8 px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="h-9 w-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-orange-400 bg-clip-text text-transparent">R</span>
              </motion.div>
              <span className="text-xl font-semibold text-neutral-900">Relay</span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-neutral-500">
              Built for MSPs, by MSPs.
            </p>

            {/* Links */}
            <div className="flex items-center gap-8">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/login"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Sign in
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/register"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Get started
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

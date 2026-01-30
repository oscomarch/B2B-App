"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

const navItems = [
  { name: "Product", href: "#features" },
  { name: "Vision", href: "#vision" },
  { name: "Benefits", href: "#how-it-works" },
]

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between h-16 px-6 bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/40 shadow-soft"
          whileHover={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)" }}
          transition={{ duration: 0.2 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              className="h-9 w-9 rounded-xl bg-gradient-to-br from-coral to-pink-soft flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-lg font-semibold text-white">R</span>
            </motion.div>
            <span className="text-xl font-medium text-neutral-900">Relay</span>
          </Link>

          {/* Center Nav Pill */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-neutral-100/80 rounded-full p-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-5 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-full"
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-white/60 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA - Book a demo */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:block"
            >
              <Link href="/login">
                <motion.button
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign in
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/register">
                <AnimatedButton variant="primary" size="sm">
                  Book a demo
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

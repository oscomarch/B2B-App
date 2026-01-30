"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const navItems = [
  { name: "Product", href: "#features" },
  { name: "Vision", href: "#vision" },
  { name: "Benefits", href: "#how-it-works" },
]

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="h-10 w-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-coral bg-clip-text text-transparent">R</span>
          </motion.div>
          <span className="text-xl font-semibold text-neutral-900">Relay</span>
        </Link>

        {/* Center Nav Pill */}
        <motion.div
          className="hidden md:flex items-center bg-white border border-neutral-200 rounded-full px-2 py-2 shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={item.href}
                className="px-5 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-50"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Book a demo button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/register">
            <motion.button
              className="flex items-center gap-2 pl-5 pr-2 py-2 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-900 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a demo
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-coral text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  )
}

"use client"

import Link from "next/link"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

const navItems = [
  { name: "Product", href: "#features" },
  { name: "Vision", href: "#vision" },
  { name: "Benefits", href: "#how-it-works" },
]

export function Navbar() {
  const { scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      setScrolled(current > 0.02)
    }
  })

  return (
    <>
      {/* Initial navbar - visible at top */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: scrolled ? -100 : 0,
          opacity: scrolled ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-white border border-neutral-200/80 flex items-center justify-center shadow-sm">
              <span className="text-base font-bold bg-gradient-to-br from-neutral-800 to-neutral-600 bg-clip-text text-transparent">R</span>
            </div>
            <span className="text-lg font-semibold text-neutral-900 tracking-tight">Relay</span>
          </Link>

          {/* Center Nav Pill */}
          <div className="hidden md:flex items-center bg-white/90 backdrop-blur-sm border border-neutral-200/80 rounded-full px-1.5 py-1.5 shadow-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-1.5 text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100/80"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Book a demo button */}
          <Link href="/register">
            <motion.button
              className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-white border border-neutral-200/80 rounded-full text-[13px] font-medium text-neutral-900 shadow-sm hover:shadow transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a demo
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-900 text-white">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* Floating navbar - appears on scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-6 inset-x-0 mx-auto z-50 flex max-w-fit items-center justify-center"
          >
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-full pl-2 pr-1.5 py-1.5 shadow-lg shadow-neutral-900/5">
              {/* Logo mini */}
              <Link href="/" className="flex items-center gap-2 px-2">
                <div className="h-7 w-7 rounded-md bg-neutral-900 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">R</span>
                </div>
              </Link>

              <div className="w-px h-5 bg-neutral-200 mx-1" />

              {/* Nav items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-1.5 text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              <div className="w-px h-5 bg-neutral-200 mx-1" />

              {/* CTA */}
              <Link href="/register">
                <button className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-neutral-900 rounded-full text-[13px] font-medium text-white hover:bg-neutral-800 transition-colors">
                  Demo
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-neutral-900">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

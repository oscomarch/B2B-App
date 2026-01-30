"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { name: "Product", href: "#features" },
  { name: "Vision", href: "#vision" },
  { name: "Benefits", href: "#how-it-works" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const initialNavRef = useRef<HTMLDivElement>(null)
  const floatingNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Initial navbar animation
    if (initialNavRef.current) {
      gsap.to(initialNavRef.current, {
        y: scrolled ? -100 : 0,
        opacity: scrolled ? 0 : 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    // Floating navbar animation
    if (floatingNavRef.current) {
      gsap.to(floatingNavRef.current, {
        y: scrolled ? 0 : -100,
        opacity: scrolled ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [scrolled])

  return (
    <>
      {/* Initial navbar - visible at top */}
      <nav
        ref={initialNavRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
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
          <GradientButton href="/register" size="sm">
            Book a demo
            <ArrowRight className="h-3.5 w-3.5" />
          </GradientButton>
        </div>
      </nav>

      {/* Floating navbar - appears on scroll */}
      <div
        ref={floatingNavRef}
        className="fixed top-6 inset-x-0 mx-auto z-50 flex max-w-fit items-center justify-center"
        style={{ transform: "translateY(-100px)", opacity: 0 }}
      >
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-full pl-2 pr-1.5 py-1.5 shadow-lg shadow-neutral-900/5">
          {/* Logo mini */}
          <Link href="/" className="flex items-center gap-2 px-2">
            <div
              className="h-7 w-7 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
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
            <button
              className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
              Demo
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                <ArrowRight className="h-3 w-3" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

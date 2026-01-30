"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, X, ArrowRight } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"

gsap.registerPlugin(ScrollTrigger)

const oldWayItems = [
  "Spreadsheet intake + random docs",
  "Credentials handled in unsafe workarounds",
  "Techs ask \"where's the login?\" all day",
  "No reliable \"what's missing\" view",
  "Old MSP access sometimes left active (real risk)",
]

const relayWayItems = [
  "One secure intake portal per client",
  "Clear checklist: requested → received → verified",
  "Credential handoff with expiry + audit trail",
  "Built-in \"remove old MSP access\" step",
  "Clean handoff to delivery (so coordinators stop being the bottleneck)",
]

export function Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const oldWayRef = useRef<HTMLDivElement>(null)
  const relayWayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      const container = sectionRef.current?.querySelector(".comparison-container")
      if (container) {
        gsap.from(container, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        })
      }

      // Old way items
      if (oldWayRef.current) {
        const items = oldWayRef.current.querySelectorAll(".old-way-item")
        gsap.from(items, {
          x: -16,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: oldWayRef.current,
            start: "top 85%",
            once: true,
          },
        })
      }

      // Relay way items
      if (relayWayRef.current) {
        const items = relayWayRef.current.querySelectorAll(".relay-way-item")
        gsap.from(items, {
          x: -16,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: relayWayRef.current,
            start: "top 85%",
            once: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="vision" className="py-28 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="comparison-container relative overflow-hidden rounded-[28px] bg-neutral-900 p-10 md:p-16">
          {/* Subtle gradient accents */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-neutral-800/50 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-neutral-800/30 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Section Header */}
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-[28px] md:text-[38px] font-medium text-white mb-5 tracking-[-0.02em] leading-[1.15]">
                From spreadsheet chaos to controlled client takeovers.
              </h2>
              <p className="text-[16px] text-neutral-400 leading-[1.7]">
                Most MSP onboarding systems were not designed for handoffs and transitions. People improvise with checklists, PDFs, and tickets.
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
              {/* The Old Way */}
              <div
                ref={oldWayRef}
                className="bg-neutral-800/40 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/50 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-700/50 mb-6">
                  <span className="text-[12px] font-medium text-neutral-400">The old way</span>
                </div>

                <ul className="space-y-3.5">
                  {oldWayItems.map((item, index) => (
                    <li key={index} className="old-way-item flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-neutral-700/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="h-3 w-3 text-neutral-500" />
                      </div>
                      <span className="text-[14px] text-neutral-400 leading-[1.5]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Relay Way */}
              <div
                ref={relayWayRef}
                className="bg-white/[0.03] backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 mb-6">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "linear-gradient(135deg, #FC8435 0%, #6286FB 100%)" }}
                  />
                  <span className="text-[12px] font-medium text-neutral-200">The Relay way</span>
                </div>

                <ul className="space-y-3.5">
                  {relayWayItems.map((item, index) => (
                    <li key={index} className="relay-way-item flex items-start gap-3">
                      <div
                        className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "linear-gradient(135deg, #FC8435 0%, #6286FB 100%)" }}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-[14px] text-neutral-200 leading-[1.5]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-800/60 border border-neutral-700/50 rounded-full text-[13px] font-medium text-neutral-500">
                Stuck there?
              </span>
              <GradientButton href="/register" size="md">
                Move forward
                <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

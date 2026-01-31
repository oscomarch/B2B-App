"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const oldWay = [
  "Spreadsheets + random docs",
  "Passwords in email",
  "No visibility on blockers",
]

const relayWay = [
  "One secure intake portal",
  "Expiring links + audit trail",
  "Clear status for every item",
]

export function Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="vision" className="py-16 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[24px] md:text-[30px] font-medium text-neutral-900 tracking-[-0.02em] mb-2">
            The old way vs. Relay
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Old way */}
          <div className="p-5 rounded-2xl bg-neutral-100/80 border border-neutral-200/60">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-neutral-400 mb-4">Before</p>
            <ul className="space-y-3">
              {oldWay.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-neutral-200 flex items-center justify-center">
                    <X className="h-3 w-3 text-neutral-400" />
                  </div>
                  <span className="text-[14px] text-neutral-500">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Relay way */}
          <div
            className="p-5 rounded-2xl border border-transparent"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 196, 0.1) 0%, rgba(155, 123, 170, 0.08) 50%, rgba(197, 168, 130, 0.1) 100%)",
            }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-wider text-neutral-500 mb-4">With Relay</p>
            <ul className="space-y-3">
              {relayWay.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div
                    className="h-5 w-5 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-[14px] text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

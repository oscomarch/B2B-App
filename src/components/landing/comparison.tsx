"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const oldWay = [
  "Spreadsheets and random docs",
  "Passwords sent over email",
  "No visibility on blockers",
  "Manual follow-up chaos",
]

const relayWay = [
  "One secure intake portal",
  "Expiring links + audit trail",
  "Clear status for every item",
  "Automated reminders",
]

export function Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".comparison-card")
      if (cards) {
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="vision" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[26px] md:text-[32px] font-medium text-neutral-900 tracking-[-0.02em] mb-3">
            The old way vs. Relay
          </h2>
          <p className="text-[15px] text-neutral-500">
            Stop chasing. Start tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Old way */}
          <div className="comparison-card p-6 rounded-2xl bg-neutral-50 border border-neutral-200/60 h-full">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center">
                <X className="h-3.5 w-3.5 text-neutral-400" />
              </div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-neutral-400">Before</p>
            </div>
            <ul className="space-y-3.5">
              {oldWay.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-neutral-200/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="h-3 w-3 text-neutral-400" />
                  </div>
                  <span className="text-[14px] text-neutral-500 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Relay way */}
          <div
            className="comparison-card p-6 rounded-2xl border border-transparent h-full"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 196, 0.08) 0%, rgba(155, 123, 170, 0.06) 50%, rgba(197, 168, 130, 0.08) 100%)",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div
                className="h-6 w-6 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
              >
                <Check className="h-3.5 w-3.5 text-white" />
              </div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-neutral-500">With Relay</p>
            </div>
            <ul className="space-y-3.5">
              {relayWay.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-[14px] text-neutral-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

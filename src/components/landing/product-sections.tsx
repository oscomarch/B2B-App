"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, Eye, Lock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Send,
    title: "Send one link",
    description: "Client-facing portal that collects credentials, docs, and access info in one place.",
    color: "#3B82C4",
  },
  {
    icon: Eye,
    title: "See what's blocking",
    description: "Clear visibility on who owes what. No more chasing or guessing.",
    color: "#9B7BAA",
  },
  {
    icon: Lock,
    title: "Secure handoff",
    description: "Expiring links, audit trails, and policy-compliant credential sharing.",
    color: "#C5A882",
  },
]

export function ProductSections() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".feature-card")
      if (cards) {
        gsap.from(cards, {
          y: 40,
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
    <section id="features" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[34px] font-medium text-neutral-900 tracking-[-0.02em] mb-3">
            How it works
          </h2>
          <p className="text-[15px] text-neutral-500 max-w-lg mx-auto">
            Replace scattered spreadsheets and email threads with one structured intake.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="feature-card group p-6 rounded-2xl border border-neutral-200/60 bg-white/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="h-5 w-5" style={{ color: feature.color }} />
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-[14px] text-neutral-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

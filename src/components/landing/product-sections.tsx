"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, FolderOpen, Eye, Download } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    step: 1,
    icon: Send,
    title: "Send one link",
    description: "Share a branded portal link with your client. No account needed on their end.",
    color: "#3B82C4",
  },
  {
    step: 2,
    icon: FolderOpen,
    title: "Collect access + docs",
    description: "Credentials, admin portals, licenses, and documents—all in one place.",
    color: "#7B6B9B",
  },
  {
    step: 3,
    icon: Eye,
    title: "See what's blocking",
    description: "Clear visibility on who owes what. No more chasing emails or guessing.",
    color: "#9B7BAA",
  },
  {
    step: 4,
    icon: Download,
    title: "Export clean handoff",
    description: "Generate a structured handoff package ready for your documentation system.",
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
          stagger: 0.12,
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
    <section id="features" className="py-24 px-4" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-3">
            How it works
          </p>
          <h2 className="text-[28px] md:text-[36px] font-medium text-neutral-900 tracking-[-0.02em] mb-4">
            From chaos to clean handoff
          </h2>
          <p className="text-[15px] text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Replace scattered spreadsheets and email threads with one structured intake flow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="feature-card group relative p-6 rounded-2xl border border-neutral-200/60 bg-white hover:bg-white hover:shadow-lg hover:border-neutral-200 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute top-5 right-5 text-[11px] font-semibold text-neutral-300">
                  {String(feature.step).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${feature.color}12` }}
                >
                  <Icon className="h-5 w-5" style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-[15px] font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-neutral-500 leading-[1.6]">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

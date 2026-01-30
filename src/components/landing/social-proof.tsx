"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const tools = ["ConnectWise", "Datto", "IT Glue", "HaloPSA", "NinjaRMM", "Hudu"]

const testimonials = [
  {
    quote: "We were tracking onboarding in a spreadsheet. Relay gave us one link and a single source of truth.",
    author: "Service Coordinator",
    company: "30-person MSP",
  },
  {
    quote: "The best part is seeing what's blocking us. No more guessing who owes what.",
    author: "Operations Manager",
    company: "MSP",
  },
]

export function SocialProof() {
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
          start: "top 85%",
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        {/* Tools integration bar */}
        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap mb-12">
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Integrates with</span>
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-[13px] font-medium text-neutral-300 hover:text-neutral-600 transition-colors cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: index === 0
                  ? "linear-gradient(135deg, rgba(59, 130, 196, 0.08) 0%, rgba(155, 123, 170, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(155, 123, 170, 0.08) 0%, rgba(197, 168, 130, 0.05) 100%)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: index === 0
                    ? "linear-gradient(135deg, rgba(59, 130, 196, 0.12) 0%, rgba(155, 123, 170, 0.08) 100%)"
                    : "linear-gradient(135deg, rgba(155, 123, 170, 0.12) 0%, rgba(197, 168, 130, 0.08) 100%)",
                }}
              />
              <div className="relative">
                <Quote
                  className="h-6 w-6 mb-3"
                  style={{
                    color: index === 0 ? "#3B82C4" : "#9B7BAA",
                    opacity: 0.4,
                  }}
                />
                <p className="text-[15px] text-neutral-700 mb-4 leading-[1.7]">
                  "{testimonial.quote}"
                </p>
                <p className="text-[13px] text-neutral-400">
                  — {testimonial.author}, <span className="text-neutral-500">{testimonial.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

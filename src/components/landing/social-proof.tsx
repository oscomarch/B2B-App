"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const tools = ["PSA", "Documentation", "Password manager", "RMM", "Backup", "DNS"]

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
  const containerRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      gsap.from(containerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      })

      // Tools stagger
      if (toolsRef.current) {
        const toolItems = toolsRef.current.querySelectorAll(".tool-item")
        gsap.from(toolItems, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top 85%",
            once: true,
          },
        })
      }

      // Testimonials stagger
      if (testimonialsRef.current) {
        const cards = testimonialsRef.current.querySelectorAll(".testimonial-card")
        gsap.from(cards, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 85%",
            once: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[24px] bg-white/70 backdrop-blur-xl border border-neutral-200/60 py-14 px-10"
        >
          {/* Header */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 text-center mb-12">
            Built for MSP ops teams who run on checklists, PSAs, and documentation
          </p>

          {/* Tools row */}
          <div
            ref={toolsRef}
            className="flex items-center justify-center gap-8 md:gap-14 flex-wrap mb-14 pb-14 border-b border-neutral-100"
          >
            {tools.map((tool) => (
              <span
                key={tool}
                className="tool-item text-[13px] font-medium text-neutral-300 cursor-default hover:text-neutral-600 transition-colors duration-200"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Testimonials */}
          <div ref={testimonialsRef} className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card group relative rounded-2xl bg-neutral-50/80 border border-neutral-100/80 p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <svg
                  className="absolute top-5 left-5 h-5 w-5 text-neutral-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-[15px] text-neutral-700 mb-5 leading-[1.65] pt-4">
                  {testimonial.quote}
                </p>
                <p className="text-[13px] text-neutral-400">
                  — {testimonial.author}, {testimonial.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

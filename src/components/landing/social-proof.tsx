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
    company: "Regional MSP",
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
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto" ref={sectionRef}>
        {/* Tools integration bar */}
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap mb-16 pb-12 border-b border-neutral-100">
          <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-400 font-medium">
            Works with
          </span>
          <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center">
            {tools.map((tool) => (
              <span
                key={tool}
                className="text-[13px] font-medium text-neutral-300 hover:text-neutral-500 transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl p-6 md:p-8 transition-all duration-300"
              style={{
                background: index === 0
                  ? "linear-gradient(135deg, rgba(59, 130, 196, 0.06) 0%, rgba(155, 123, 170, 0.04) 100%)"
                  : "linear-gradient(135deg, rgba(155, 123, 170, 0.06) 0%, rgba(197, 168, 130, 0.04) 100%)",
              }}
            >
              <Quote
                className="h-5 w-5 mb-4"
                style={{
                  color: index === 0 ? "#3B82C4" : "#9B7BAA",
                  opacity: 0.5,
                }}
              />
              <p className="text-[15px] md:text-[16px] text-neutral-700 mb-6 leading-[1.7]">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white"
                  style={{
                    background: index === 0
                      ? "linear-gradient(135deg, #3B82C4 0%, #7B6B9B 100%)"
                      : "linear-gradient(135deg, #9B7BAA 0%, #C5A882 100%)",
                  }}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-neutral-700">
                    {testimonial.author}
                  </p>
                  <p className="text-[12px] text-neutral-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

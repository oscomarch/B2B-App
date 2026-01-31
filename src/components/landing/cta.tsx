"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
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
    <section id="how-it-works" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[26px] md:text-[32px] font-medium text-neutral-900 tracking-[-0.02em] mb-4">
          Ready to streamline onboarding?
        </h2>
        <p className="text-[15px] text-neutral-500 mb-8">
          Early teams get white-glove setup + onboarding templates.
        </p>
        <a
          href="/register"
          className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-[14px] font-medium text-white transition-all hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
        >
          Book a demo
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      </div>
    </section>
  )
}

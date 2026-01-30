"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      const container = sectionRef.current?.querySelector(".cta-container")
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

      // Headline
      gsap.from(headlineRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })

      // Subhead
      gsap.from(subheadRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })

      // CTA button
      gsap.from(ctaRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay: 0.3,
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
    <section id="how-it-works" className="py-28 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <div className="cta-container relative overflow-hidden rounded-[28px] bg-white/70 backdrop-blur-xl border border-neutral-200/60 p-12 md:p-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              ref={headlineRef}
              className="text-[28px] md:text-[38px] lg:text-[44px] font-medium text-neutral-900 mb-6 tracking-[-0.02em] leading-[1.12]"
            >
              Your onboarding runs even when you're busy.
            </h2>
            <p
              ref={subheadRef}
              className="text-[17px] text-neutral-500 mb-12 leading-[1.7]"
            >
              Onboarding sets the tone for the entire relationship. When it's clean, clients feel they made the right choice and your team starts delivering faster.
            </p>
            <div ref={ctaRef} className="flex flex-col items-center gap-5">
              <GradientButton href="/register" size="lg">
                Book a demo
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </GradientButton>
              <p className="text-[13px] text-neutral-400">
                Early teams get white-glove setup + onboarding templates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

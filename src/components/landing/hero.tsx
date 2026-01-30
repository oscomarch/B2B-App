"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const kickerRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const microcopyRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([kickerRef.current, headlineRef.current, subheadRef.current, ctaRef.current, microcopyRef.current], {
        opacity: 0,
        y: 40,
      })
      gsap.set(cardRef.current, { opacity: 0, x: 40 })
      gsap.set(containerRef.current, { opacity: 0, y: 30 })

      // Timeline for staggered entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
      .to(kickerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.5")
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.6")
      .to(subheadRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.6")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.6")
      .to(microcopyRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.6")
      .to(cardRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
      }, "-=1")

      // Headline text split animation
      if (headlineRef.current) {
        const text = headlineRef.current.innerText
        const words = text.split(" ")
        headlineRef.current.innerHTML = words
          .map(word => `<span class="inline-block overflow-hidden"><span class="hero-word inline-block">${word}</span></span>`)
          .join(" ")

        gsap.set(".hero-word", { y: "100%" })
        tl.to(".hero-word", {
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        }, 0.3)
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative pt-28 pb-12 px-3 md:px-4">
      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Main hero container with gradient background image */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[24px] md:rounded-[28px] min-h-[700px]"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-gradient.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col px-8 py-14 md:px-12 lg:px-16 md:py-16">
            {/* Main content area */}
            <div className="flex-1 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
              {/* Left content */}
              <div className="flex-1 max-w-2xl">
                {/* Kicker */}
                <p
                  ref={kickerRef}
                  className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-5"
                >
                  Secure client onboarding for MSPs
                </p>

                {/* Headline */}
                <h1
                  ref={headlineRef}
                  className="text-[36px] md:text-[46px] lg:text-[54px] font-medium text-white mb-5 tracking-[-0.03em] leading-[1.05]"
                >
                  Meet the client handoff portal for MSPs.
                </h1>

                {/* Subheadline */}
                <p
                  ref={subheadRef}
                  className="text-[15px] md:text-[17px] text-white/70 mb-8 leading-[1.65] max-w-lg"
                >
                  Relay replaces onboarding spreadsheets + email threads with one secure intake link. Collect access, credentials, and IT discovery details, track what's missing, and hand off cleanly to your team.
                </p>

                {/* CTA Button */}
                <div ref={ctaRef}>
                  <a
                    href="/register"
                    className="group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 bg-white rounded-full text-[14px] font-medium text-neutral-900 hover:bg-white/90 transition-colors"
                  >
                    Book a demo
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-full text-white"
                      style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Right card - positioned organically */}
              <div
                ref={cardRef}
                className="lg:mt-20 lg:mr-4 group bg-white/[0.08] backdrop-blur-md rounded-2xl border border-white/15 p-5 lg:w-[300px] flex-shrink-0 hover:bg-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                  >
                    <Play className="h-3.5 w-3.5 text-white fill-white" />
                  </div>
                  <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">Onboarding play</span>
                </div>

                <h3 className="text-[16px] font-semibold text-white mb-1.5 tracking-tight">
                  Take over a new client
                </h3>
                <p className="text-[13px] text-white/60 mb-4 leading-relaxed">
                  Turn a messy transition into a structured intake your client actually completes.
                </p>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40 mb-1.5">
                    Happens when
                  </p>
                  <p className="text-[12px] text-white/55">
                    Contract signed · Kickoff done · Cutover scheduled
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom microcopy */}
            <div className="mt-auto pt-8">
              <p
                ref={microcopyRef}
                className="text-[12px] text-white/45"
              >
                No more "can you resend the DNS login?" · No passwords in email · Clear status for every request
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

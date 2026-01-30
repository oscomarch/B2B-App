"use client"

import { useRef, useEffect } from "react"
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
    <section className="relative pt-32 pb-16 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main hero container with gradient background image */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[32px] min-h-[600px]"
        >
          {/* Background gradient (CSS fallback that matches the image) */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 20%, #1a3a4a 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, #c5a882 0%, transparent 40%),
                radial-gradient(ellipse at 70% 60%, #9b7baa 0%, transparent 50%),
                radial-gradient(ellipse at 20% 80%, #2a6b8a 0%, transparent 50%),
                linear-gradient(135deg, #1a4a5e 0%, #3b82c4 30%, #9b7baa 60%, #c5a882 100%)
              `,
            }}
          >
            {/* Grain texture overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-14 md:py-20">
            <div className="grid lg:grid-cols-[1fr,340px] gap-12 items-start">
              {/* Left content */}
              <div className="max-w-xl">
                {/* Kicker */}
                <p
                  ref={kickerRef}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-8"
                >
                  Secure client onboarding for MSPs
                </p>

                {/* Headline */}
                <h1
                  ref={headlineRef}
                  className="text-[42px] md:text-[52px] font-medium text-white mb-6 tracking-[-0.02em] leading-[1.08]"
                >
                  Meet the client handoff portal for MSPs.
                </h1>

                {/* Subheadline */}
                <p
                  ref={subheadRef}
                  className="text-[17px] text-white/80 mb-10 leading-[1.6] max-w-lg"
                >
                  Relay replaces onboarding spreadsheets + email threads with one secure intake link. Collect access, credentials, and IT discovery details, track what's missing, and hand off cleanly to your team.
                </p>

                {/* CTA Button */}
                <div ref={ctaRef} className="mb-8">
                  <a
                    href="/register"
                    className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-white rounded-full text-[14px] font-medium text-neutral-900 hover:bg-white/90 transition-colors"
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

                {/* Microcopy */}
                <p
                  ref={microcopyRef}
                  className="text-[13px] text-white/60"
                >
                  No more "can you resend the DNS login?" · No passwords in email · Clear status for every request
                </p>
              </div>

              {/* Right card - Onboarding play */}
              <div
                ref={cardRef}
                className="group bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 hidden lg:block hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                  >
                    <Play className="h-4 w-4 text-white fill-white" />
                  </div>
                  <span className="text-[12px] font-medium text-white/60 uppercase tracking-wide">Onboarding play</span>
                </div>

                <h3 className="text-[17px] font-semibold text-white mb-2 tracking-tight">
                  Take over a new client
                </h3>
                <p className="text-[14px] text-white/70 mb-5 leading-relaxed">
                  Turn a messy transition into a structured intake your client actually completes.
                </p>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-2">
                    Happens when
                  </p>
                  <p className="text-[13px] text-white/70">
                    Contract signed · Kickoff done · Cutover scheduled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

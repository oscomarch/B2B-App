"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ArrowRight, Check, Clock, Shield, Users, FileCheck } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 0, y: 30 })
      gsap.set(textRef.current, { opacity: 0, y: 40 })
      gsap.set(mockupRef.current, { opacity: 0, y: 50, scale: 0.98 })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.to(containerRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(mockupRef.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.6")
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative pt-24 pb-0 px-4 md:px-6 h-screen flex flex-col">
      <div className="relative z-10 max-w-[1320px] mx-auto flex-1 flex flex-col pb-6">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[24px] md:rounded-[32px] flex-1"
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
          <div className="relative z-10 h-full flex flex-col justify-between px-8 py-10 md:px-12 lg:px-16 md:py-12">
            {/* Top - Centered text content */}
            <div ref={textRef} className="text-center max-w-2xl mx-auto pt-4 md:pt-8">
              <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
                Secure client onboarding for MSPs
              </p>

              <h1 className="text-[30px] md:text-[40px] lg:text-[48px] font-medium text-white mb-4 tracking-[-0.03em] leading-[1.08]">
                The client handoff portal
                <br />
                <span className="text-white/80">built for MSPs.</span>
              </h1>

              <p className="text-[14px] md:text-[16px] text-white/60 mb-8 leading-[1.7] max-w-md mx-auto">
                One secure link to collect credentials, track what's missing, and hand off cleanly.
              </p>

              {/* CTA Button - more prominent */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <a
                  href="/register"
                  className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-white rounded-full text-[15px] font-medium text-neutral-900 hover:bg-white/95 transition-all hover:shadow-lg"
                >
                  Book a demo
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full text-white transition-transform group-hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <span className="text-[12px] text-white/40">Free for early teams</span>
              </div>

              {/* Trust badges - subtle, separated */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <Shield className="h-3.5 w-3.5" />
                  <span>SOC 2 Ready</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <Clock className="h-3.5 w-3.5" />
                  <span>5 min setup</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <Users className="h-3.5 w-3.5" />
                  <span>Unlimited clients</span>
                </div>
              </div>
            </div>

            {/* Bottom - Dashboard Mockup centered and grounded */}
            <div ref={mockupRef} className="relative flex items-end justify-center pt-6">
              {/* Main dashboard card */}
              <div className="relative bg-white/[0.12] backdrop-blur-xl rounded-2xl border border-white/20 p-5 shadow-2xl min-w-[320px] md:min-w-[380px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                    >
                      <span className="text-[11px] font-bold text-white">R</span>
                    </div>
                    <span className="text-[14px] font-semibold text-white">Acme Corp Onboarding</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 font-medium">In Progress</span>
                </div>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-white/50">Completion</span>
                    <span className="text-[12px] font-medium text-white">68%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "68%",
                        background: "linear-gradient(90deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)"
                      }}
                    />
                  </div>
                </div>

                {/* Checklist items */}
                <div className="space-y-2">
                  {[
                    { label: "Microsoft 365 Admin", done: true },
                    { label: "DNS / Domain Access", done: true },
                    { label: "Firewall Credentials", done: true },
                    { label: "Backup Solution", done: false, pending: true },
                    { label: "LOB Applications", done: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-2.5 rounded-lg ${
                        item.done ? "bg-white/5" : item.pending ? "bg-amber-500/10" : "bg-white/[0.02]"
                      }`}
                    >
                      <div className={`h-5 w-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                        item.done
                          ? "bg-green-500/20"
                          : item.pending
                            ? "bg-amber-500/20"
                            : "bg-white/10"
                      }`}>
                        {item.done ? (
                          <Check className="h-3 w-3 text-green-400" />
                        ) : item.pending ? (
                          <Clock className="h-3 w-3 text-amber-400" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-white/30" />
                        )}
                      </div>
                      <span className={`text-[13px] ${item.done ? "text-white/70" : "text-white/50"}`}>
                        {item.label}
                      </span>
                      {item.pending && (
                        <span className="ml-auto text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium">
                          Awaiting client
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating notification card */}
              <div className="absolute -bottom-3 -left-6 md:-left-10 bg-white/[0.15] backdrop-blur-xl rounded-xl border border-white/20 p-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-white">Credentials received</p>
                    <p className="text-[10px] text-white/50">Microsoft 365 · Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

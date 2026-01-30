"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, Play, Shield, Lock, Mail, Globe, Database, AppWindow, Users } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const intakeSections = [
  { icon: Mail, label: "Microsoft 365 / Google Workspace" },
  { icon: Globe, label: "DNS / Domain registrar" },
  { icon: Shield, label: "Firewall / Network" },
  { icon: Database, label: "Backups / DR" },
  { icon: AppWindow, label: "Line-of-business apps" },
  { icon: Users, label: "Vendor contacts + escalation paths" },
]

const plays = [
  {
    title: "Take over Microsoft 365",
    description: "Get the right admin access + confirm MFA and recovery info.",
  },
  {
    title: "Take over DNS",
    description: "Registrar login, zone access, records exported, change window set.",
  },
  {
    title: "Securely remove the old MSP",
    description: "Make sure old accounts are disabled/forwarded and access is cleaned up.",
  },
]

export function ProductSections() {
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section 1 animations
      if (section1Ref.current) {
        const left = section1Ref.current.querySelector(".section1-left")
        const card = section1Ref.current.querySelector(".section1-card")
        const items = section1Ref.current.querySelectorAll(".intake-item")

        gsap.from(left, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section1Ref.current, start: "top 80%", once: true },
        })

        gsap.from(card, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section1Ref.current, start: "top 80%", once: true },
        })

        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        })
      }

      // Section 2 animations
      if (section2Ref.current) {
        const left = section2Ref.current.querySelector(".section2-left")
        const cards = section2Ref.current.querySelectorAll(".play-card")

        gsap.from(left, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section2Ref.current, start: "top 80%", once: true },
        })

        gsap.from(cards, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section2Ref.current, start: "top 75%", once: true },
        })
      }

      // Section 3 animations
      if (section3Ref.current) {
        const left = section3Ref.current.querySelector(".section3-left")
        const visual = section3Ref.current.querySelector(".section3-visual")

        gsap.from(left, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section3Ref.current, start: "top 80%", once: true },
        })

        gsap.from(visual, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section3Ref.current, start: "top 80%", once: true },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Product Section 1 - It starts with the client */}
      <section id="features" className="py-28 px-6" ref={section1Ref}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,380px] gap-16 items-start">
            {/* Left content */}
            <div className="section1-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-5">
                It starts with the client
              </p>
              <h2 className="text-[28px] md:text-[36px] font-medium text-neutral-900 mb-6 tracking-[-0.02em] leading-[1.15]">
                Send one link. Relay starts collecting.
              </h2>
              <p className="text-[16px] text-neutral-500 mb-10 leading-[1.7] max-w-lg">
                Relay gives you a client-facing portal that asks the right questions in the right order: environment, vendors, contacts, assets, and "where the keys are." You stop chasing across email, PDFs, and random docs.
              </p>

              {/* Pill bullets */}
              <div className="flex flex-wrap gap-2.5">
                {["Structured IT discovery intake", "Upload docs, diagrams, exports", "Auto \"missing info\" checklist"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-100/80 border border-neutral-200/60 rounded-full text-[13px] font-medium text-neutral-600"
                  >
                    <Check className="h-3.5 w-3.5 text-neutral-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Intake sections card */}
            <div className="section1-card bg-white/70 backdrop-blur-xl rounded-[20px] border border-neutral-200/60 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-5">
                Intake sections
              </p>
              <ul className="space-y-2.5">
                {intakeSections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <li
                      key={index}
                      className="intake-item flex items-center gap-3 p-3 rounded-xl bg-neutral-50/80 border border-neutral-100/80 hover:bg-neutral-100/60 transition-colors duration-200"
                    >
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #FC8435 0%, #6286FB 100%)" }}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-[13px] font-medium text-neutral-700">{section.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section 2 - See what's blocking you */}
      <section className="py-28 px-6" ref={section2Ref}>
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[28px] bg-neutral-50/80 border border-neutral-200/60 p-10 md:p-14">
            <div className="grid lg:grid-cols-[1fr,360px] gap-14 items-start">
              {/* Left content */}
              <div className="section2-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-5">
                  See what's blocking you
                </p>
                <h2 className="text-[28px] md:text-[36px] font-medium text-neutral-900 mb-6 tracking-[-0.02em] leading-[1.15]">
                  Relay spots the blockers. You keep moving.
                </h2>
                <p className="text-[16px] text-neutral-500 mb-10 leading-[1.7] max-w-lg">
                  Onboarding coordinators get pinged all day because nobody knows what's missing. Relay makes the blockers visible: who hasn't provided access, which logins are outstanding, what's needed before cutover.
                </p>

                {/* Pill bullets */}
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Clear owner + status for every request",
                    "Faster handoff from onboarding → service desk",
                    "Less internal back-and-forth"
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/80 border border-neutral-200/60 rounded-full text-[13px] font-medium text-neutral-600"
                    >
                      <Check className="h-3.5 w-3.5 text-neutral-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right - Plays cards */}
              <div className="space-y-3">
                {plays.map((play, index) => (
                  <div
                    key={index}
                    className="play-card bg-white/90 backdrop-blur-sm rounded-xl border border-neutral-200/60 p-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #FC8435 0%, #6286FB 100%)" }}
                      >
                        <Play className="h-4 w-4 text-white fill-white" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-semibold text-neutral-900 mb-1">{play.title}</h4>
                        <p className="text-[13px] text-neutral-500 leading-[1.5]">{play.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section 3 - Engage securely, with control */}
      <section className="py-28 px-6" ref={section3Ref}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="section3-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-5">
                Engage securely, with control
              </p>
              <h2 className="text-[28px] md:text-[36px] font-medium text-neutral-900 mb-6 tracking-[-0.02em] leading-[1.15]">
                Relay requests credentials the safe way, without breaking policy.
              </h2>
              <p className="text-[16px] text-neutral-500 mb-6 leading-[1.7]">
                MSPs want modern onboarding forms… until the conversation hits credentials. A lot of teams end up back in spreadsheets because "sharing passwords is blocked" and it's a big part of handover.
              </p>
              <p className="text-[16px] text-neutral-500 mb-10 leading-[1.7]">
                Relay is built for that reality: collect what you can safely, route secrets through approved methods, and keep an audit trail of what was shared and when.
              </p>

              {/* Pill bullets */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {[
                  { icon: Lock, text: "No passwords in email/Slack" },
                  { icon: Shield, text: "Expiring links + tracked handoff" },
                  { icon: Check, text: "Capture access method (SSO/MFA/admin)" },
                ].map((item) => (
                  <span
                    key={item.text}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-100/80 border border-neutral-200/60 rounded-full text-[13px] font-medium text-neutral-600"
                  >
                    <item.icon className="h-3.5 w-3.5 text-neutral-400" />
                    {item.text}
                  </span>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-neutral-50/80 border border-neutral-200/60 rounded-xl p-5">
                <p className="text-[14px] text-neutral-600 italic leading-[1.6]">
                  "Relay replaced 40-message threads with one clean intake."
                </p>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="section3-visual relative">
              <div className="bg-white/70 backdrop-blur-xl rounded-[24px] border border-neutral-200/60 p-10 aspect-square flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg, #FC8435 0%, #6286FB 100%)" }}
                >
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <p className="text-[17px] font-medium text-neutral-800 mb-2">Secure credential handoff</p>
                <p className="text-[13px] text-neutral-400 text-center">
                  Expiring links · Audit trail · Policy-compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

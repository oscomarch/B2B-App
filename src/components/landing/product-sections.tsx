"use client"

import { motion } from "framer-motion"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/motion"
import { Check, Play, Shield, Eye, Lock, ArrowRight, Mail, Globe, Server, Database, AppWindow, Users } from "lucide-react"

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
  return (
    <>
      {/* Product Section 1 - It starts with the client */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left content */}
            <div>
              <FadeIn>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  It starts with the client
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-6 tracking-tight">
                  Send one link. Relay starts collecting.
                </h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Relay gives you a client-facing portal that asks the right questions in the right order: environment, vendors, contacts, assets, and "where the keys are." You stop chasing across email, PDFs, and random docs.
                </p>

                {/* Pill bullets */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                    <Check className="h-4 w-4" />
                    Structured IT discovery intake
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                    <Check className="h-4 w-4" />
                    Upload docs, diagrams, exports
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                    <Check className="h-4 w-4" />
                    Auto "missing info" checklist
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Right - Intake sections card */}
            <FadeIn direction="right">
              <motion.div
                className="bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-200 shadow-sm p-6"
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)" }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                  Intake sections
                </p>
                <StaggerContainer staggerDelay={0.08}>
                  <ul className="space-y-3">
                    {intakeSections.map((section, index) => {
                      const Icon = section.icon
                      return (
                        <StaggerItem key={index}>
                          <li className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50/50 border border-neutral-100">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-neutral-700">{section.label}</span>
                          </li>
                        </StaggerItem>
                      )
                    })}
                  </ul>
                </StaggerContainer>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Product Section 2 - See what's blocking you */}
      <section className="py-24 px-6 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left content */}
            <div>
              <FadeIn>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  See what's blocking you
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-6 tracking-tight">
                  Relay spots the blockers. You keep moving.
                </h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Onboarding coordinators get pinged all day because nobody knows what's missing. Relay makes the blockers visible: who hasn't provided access, which logins are outstanding, what's needed before cutover.
                </p>

                {/* Pill bullets */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-700">
                    <Eye className="h-4 w-4" />
                    Clear owner + status for every request
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-700">
                    <ArrowRight className="h-4 w-4" />
                    Faster handoff from onboarding → service desk
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-700">
                    <Check className="h-4 w-4" />
                    Less internal back-and-forth
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Right - Plays cards */}
            <FadeIn direction="right">
              <StaggerContainer staggerDelay={0.1} className="space-y-4">
                {plays.map((play, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200 shadow-sm p-5"
                      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <Play className="h-5 w-5 text-white fill-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-1">{play.title}</h4>
                          <p className="text-sm text-neutral-600">{play.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Product Section 3 - Engage securely, with control */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <FadeIn>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  Engage securely, with control
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-6 tracking-tight">
                  Relay requests credentials the safe way, without breaking policy.
                </h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  MSPs want modern onboarding forms… until the conversation hits credentials. A lot of teams end up back in spreadsheets because "sharing passwords is blocked" and it's a big part of handover.
                </p>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Relay is built for that reality: collect what you can safely, route secrets through approved methods, and keep an audit trail of what was shared and when.
                </p>

                {/* Pill bullets */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700">
                    <Lock className="h-4 w-4" />
                    No passwords in email/Slack
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700">
                    <Shield className="h-4 w-4" />
                    Expiring links + tracked handoff
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700">
                    <Check className="h-4 w-4" />
                    Capture access method (SSO/MFA/admin) not just "a password"
                  </span>
                </div>

                {/* Quote */}
                <motion.div
                  className="bg-purple-50/50 border border-purple-100 rounded-xl p-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-purple-700 italic">
                    "Relay replaced 40-message threads with one clean intake."
                  </p>
                </motion.div>
              </FadeIn>
            </div>

            {/* Right - Visual placeholder */}
            <FadeIn direction="right">
              <motion.div
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200/50 p-8 aspect-square flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 mb-6">
                    <Lock className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-lg font-medium text-neutral-700">Secure credential handoff</p>
                  <p className="text-sm text-neutral-500 mt-2">Expiring links · Audit trail · Policy-compliant</p>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}

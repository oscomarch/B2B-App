"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Users, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-[#FAFAFA]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-[14px] font-medium">Back</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
              <span className="text-[12px] font-bold text-white">R</span>
            </div>
            <span className="text-[16px] font-semibold text-neutral-900">Relay</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
              About us
            </p>
            <h1 className="text-[32px] md:text-[42px] font-medium text-neutral-900 tracking-[-0.02em] mb-6 leading-tight">
              Building the future of
              <br />
              <span className="text-neutral-400">MSP client onboarding.</span>
            </h1>
          </motion.div>

          <motion.div
            className="prose prose-neutral max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[16px] text-neutral-600 leading-[1.8] mb-8">
              Relay was born from a simple observation: MSPs spend too much time chasing credentials and documents during client onboarding. Spreadsheets get lost, emails get buried, and sensitive information gets shared insecurely.
            </p>

            <p className="text-[16px] text-neutral-600 leading-[1.8] mb-12">
              We're building the secure handoff portal that MSPs deserve—one link to collect everything, clear visibility on what's missing, and a clean audit trail for compliance.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              {
                icon: Shield,
                title: "Security first",
                description: "Every feature is designed with security at its core. Your clients' data is protected.",
              },
              {
                icon: Zap,
                title: "Simple by design",
                description: "No training needed. If you can share a link, you can use Relay.",
              },
              {
                icon: Users,
                title: "Built for MSPs",
                description: "We understand your workflow because we've lived it.",
              },
            ].map((value, i) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-white border border-neutral-200/60"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `rgba(59, 130, 196, 0.1)` }}
                >
                  <value.icon className="h-5 w-5 text-[#3B82C4]" />
                </div>
                <h3 className="text-[15px] font-semibold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-[13px] text-neutral-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center p-10 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 196, 0.05) 0%, rgba(155, 123, 170, 0.04) 50%, rgba(197, 168, 130, 0.05) 100%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-[22px] font-medium text-neutral-900 mb-3">Want to learn more?</h2>
            <p className="text-[15px] text-neutral-500 mb-6">Let's talk about how Relay can help your team.</p>
            <a
              href="https://calendly.com/oscomarch/call-20min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-medium text-white transition-all hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

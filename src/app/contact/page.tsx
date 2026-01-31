"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Calendar, MessageSquare } from "lucide-react"

export default function ContactPage() {
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
              Contact
            </p>
            <h1 className="text-[32px] md:text-[42px] font-medium text-neutral-900 tracking-[-0.02em] mb-6 leading-tight">
              Let's talk.
            </h1>
            <p className="text-[16px] text-neutral-500 leading-[1.8] mb-12 max-w-lg">
              Have questions about Relay? Want a demo? We'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact options */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Book a demo */}
            <a
              href="https://calendly.com/oscomarch/call-20min"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-neutral-200/60 bg-white hover:border-neutral-300 hover:shadow-lg transition-all"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
              >
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-[17px] font-semibold text-neutral-900 mb-2 group-hover:text-[#3B82C4] transition-colors">
                Book a demo
              </h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">
                Schedule a 20-minute call to see Relay in action and discuss your needs.
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@getrelay.fr"
              className="group p-6 rounded-2xl border border-neutral-200/60 bg-white hover:border-neutral-300 hover:shadow-lg transition-all"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(155, 123, 170, 0.15)" }}
              >
                <Mail className="h-6 w-6 text-[#9B7BAA]" />
              </div>
              <h3 className="text-[17px] font-semibold text-neutral-900 mb-2 group-hover:text-[#9B7BAA] transition-colors">
                Email us
              </h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed mb-2">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <span className="text-[14px] font-medium text-[#9B7BAA]">hello@getrelay.fr</span>
            </a>
          </motion.div>

          {/* FAQ teaser */}
          <motion.div
            className="mt-16 p-8 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 196, 0.05) 0%, rgba(155, 123, 170, 0.04) 50%, rgba(197, 168, 130, 0.05) 100%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MessageSquare className="h-8 w-8 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-[18px] font-medium text-neutral-900 mb-2">Common questions</h2>
            <p className="text-[14px] text-neutral-500 mb-1">
              <strong>How long does setup take?</strong> About 5 minutes.
            </p>
            <p className="text-[14px] text-neutral-500 mb-1">
              <strong>Is there a free trial?</strong> Yes, free for early teams.
            </p>
            <p className="text-[14px] text-neutral-500">
              <strong>Do clients need an account?</strong> No, they just use the link.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

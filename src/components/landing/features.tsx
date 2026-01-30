"use client"

import { motion } from "framer-motion"
import { FileText, Shield, Zap, Users, CheckCircle, Send } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/motion"

const features = [
  {
    icon: FileText,
    title: "Structured intake forms",
    description: "Pre-built templates for new clients, takeovers, and offboarding. Fully customizable sections and fields.",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-500",
  },
  {
    icon: Shield,
    title: "Secure credential handover",
    description: "No more passwords in email. Clients share credentials via secure links or one-time encrypted secrets.",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-500",
  },
  {
    icon: Zap,
    title: "Real-time progress tracking",
    description: "See exactly what's been completed, what's pending, and who needs to take action next.",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-500",
  },
  {
    icon: Users,
    title: "Client-friendly portal",
    description: "Branded portal with your logo and colors. No login required for clients — just one simple link.",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-500",
  },
  {
    icon: CheckCircle,
    title: "Internal checklists",
    description: "Track your team's progress with internal task lists. Ensure nothing falls through the cracks.",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-500",
  },
  {
    icon: Send,
    title: "Easy export",
    description: "Export completed onboardings to CSV for import into your PSA, documentation tools, or ticketing system.",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-500",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="max-w-2xl mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-neutral-900 mb-6 tracking-tight">
            Everything you need to onboard clients
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            A professional onboarding experience that makes your MSP look great
            while saving hours on every new client.
          </p>
        </FadeIn>

        {/* Feature Cards */}
        <StaggerContainer staggerDelay={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="bg-white/60 backdrop-blur-sm p-8 h-full rounded-2xl border border-neutral-200 shadow-sm"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className={`h-12 w-12 rounded-xl ${feature.color} border flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </motion.div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { FileText, Shield, Zap, Users, CheckCircle, Send } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/motion"

const features = [
  {
    icon: FileText,
    title: "Structured intake forms",
    description: "Pre-built templates for new clients, takeovers, and offboarding. Fully customizable sections and fields.",
    color: "bg-coral/10",
    iconColor: "text-coral",
  },
  {
    icon: Shield,
    title: "Secure credential handover",
    description: "No more passwords in email. Clients share credentials via secure links or one-time encrypted secrets.",
    color: "bg-green-soft/10",
    iconColor: "text-green-soft",
  },
  {
    icon: Zap,
    title: "Real-time progress tracking",
    description: "See exactly what's been completed, what's pending, and who needs to take action next.",
    color: "bg-purple-soft/10",
    iconColor: "text-purple-soft",
  },
  {
    icon: Users,
    title: "Client-friendly portal",
    description: "Branded portal with your logo and colors. No login required for clients — just one simple link.",
    color: "bg-blue-soft/10",
    iconColor: "text-blue-soft",
  },
  {
    icon: CheckCircle,
    title: "Internal checklists",
    description: "Track your team's progress with internal task lists. Ensure nothing falls through the cracks.",
    color: "bg-coral/10",
    iconColor: "text-coral",
  },
  {
    icon: Send,
    title: "Easy export",
    description: "Export completed onboardings to CSV for import into your PSA, documentation tools, or ticketing system.",
    color: "bg-green-soft/10",
    iconColor: "text-green-soft",
  },
]

export function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <FadeIn className="max-w-2xl mb-20">
          <p className="text-eyebrow mb-4">Features</p>
          <h2 className="text-headline text-neutral-900 mb-6">
            Everything you need to onboard clients
          </h2>
          <p className="text-body-lg">
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
                  className="card-soft p-8 h-full"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className={`h-12 w-12 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </motion.div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-body">
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

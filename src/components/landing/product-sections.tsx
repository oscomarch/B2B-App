"use client"

import { motion } from "framer-motion"
import { Send, FolderOpen, Eye, Download } from "lucide-react"

const features = [
  {
    step: 1,
    icon: Send,
    title: "Send one link",
    description: "Share a branded portal link with your client. No account needed on their end.",
    color: "#3B82C4",
  },
  {
    step: 2,
    icon: FolderOpen,
    title: "Collect access + docs",
    description: "Credentials, admin portals, licenses, and documents—all in one place.",
    color: "#7B6B9B",
  },
  {
    step: 3,
    icon: Eye,
    title: "See what's blocking",
    description: "Clear visibility on who owes what. No more chasing emails or guessing.",
    color: "#9B7BAA",
  },
  {
    step: 4,
    icon: Download,
    title: "Export clean handoff",
    description: "Generate a structured handoff package ready for your documentation system.",
    color: "#C5A882",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

export function ProductSections() {
  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-3">
            How it works
          </p>
          <h2 className="text-[28px] md:text-[36px] font-medium text-neutral-900 tracking-[-0.02em] mb-4">
            From chaos to clean handoff
          </h2>
          <p className="text-[15px] text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Replace scattered spreadsheets and email threads with one structured intake flow.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.step}
                variants={itemVariants}
                className="group relative p-6 rounded-2xl border border-neutral-200/60 bg-white hover:bg-white hover:shadow-lg hover:border-neutral-200 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute top-5 right-5 text-[11px] font-semibold text-neutral-300">
                  {String(feature.step).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${feature.color}12` }}
                >
                  <Icon className="h-5 w-5" style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-[15px] font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-neutral-500 leading-[1.6]">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

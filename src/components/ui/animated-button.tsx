"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit"
}

export function AnimatedButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
}: AnimatedButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-colors overflow-hidden"

  const variants = {
    primary: "bg-gradient-to-r from-coral to-pink-soft text-white",
    secondary: "bg-neutral-900 text-white",
    outline: "border-2 border-neutral-200 text-neutral-900 hover:border-coral/50 hover:bg-coral/5",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-3",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={false}
        whileHover={{
          translateX: "200%",
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}

// Magnetic button effect (follows cursor slightly)
interface MagneticButtonProps {
  children: ReactNode
  className?: string
}

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  )
}

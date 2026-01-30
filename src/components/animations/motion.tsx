"use client"

import { motion, useInView, useAnimation, Variants } from "framer-motion"
import { useRef, useEffect, ReactNode } from "react"

// Fade in animation
interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 24,
  once = true,
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })
  const controls = useAnimation()

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance }
      case "down":
        return { opacity: 0, y: -distance }
      case "left":
        return { opacity: 0, x: distance }
      case "right":
        return { opacity: 0, x: -distance }
      case "none":
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0, y: 0 })
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animation
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  once?: boolean
}

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger item (child of StaggerContainer)
interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  distance?: number
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 24,
}: StaggerItemProps) {
  const getVariants = (): Variants => {
    const hidden = (() => {
      switch (direction) {
        case "up":
          return { opacity: 0, y: distance }
        case "down":
          return { opacity: 0, y: -distance }
        case "left":
          return { opacity: 0, x: distance }
        case "right":
          return { opacity: 0, x: -distance }
        default:
          return { opacity: 0, y: distance }
      }
    })()

    return {
      hidden,
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      },
    }
  }

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  )
}

// Text reveal animation (word by word)
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-50px" })
  const words = text.split(" ")

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.08,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Scale on hover
interface ScaleOnHoverProps {
  children: ReactNode
  className?: string
  scale?: number
}

export function ScaleOnHover({
  children,
  className = "",
  scale = 1.02,
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating animation (continuous)
interface FloatingProps {
  children: ReactNode
  className?: string
  duration?: number
  distance?: number
}

export function Floating({
  children,
  className = "",
  duration = 3,
  distance = 10,
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Gradient animation (for backgrounds)
interface AnimatedGradientProps {
  className?: string
}

export function AnimatedGradient({ className = "" }: AnimatedGradientProps) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        background: [
          "radial-gradient(circle at 0% 0%, rgba(255, 138, 115, 0.15) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 100%, rgba(255, 138, 115, 0.15) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 100%, rgba(255, 138, 115, 0.15) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 0%, rgba(255, 138, 115, 0.15) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 0%, rgba(255, 138, 115, 0.15) 0%, transparent 50%)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


"use client"

import { useRef, useCallback } from "react"
import gsap from "gsap"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface GradientButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: "filled" | "outline"
  size?: "sm" | "md" | "lg"
  magnetic?: boolean
}

export function GradientButton({
  children,
  href,
  onClick,
  className,
  variant = "filled",
  size = "md",
  magnetic = true,
}: GradientButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || !magnetic) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(buttonRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out",
    })

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [magnetic])

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!buttonRef.current) return

    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    })
  }, [])

  const handleMouseLeaveScale = useCallback(() => {
    if (!buttonRef.current) return

    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }, [])

  const sizeClasses = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-6 py-3 text-[14px]",
    lg: "px-8 py-4 text-[15px]",
  }

  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 font-medium rounded-full overflow-hidden transition-shadow",
    sizeClasses[size],
    variant === "filled"
      ? "text-white shadow-lg hover:shadow-xl"
      : "text-neutral-900 border-2 border-transparent bg-clip-padding",
    className
  )

  const gradientStyle = variant === "filled"
    ? { background: "linear-gradient(135deg, #FC8435 0%, #6286FB 100%)" }
    : {}

  const content = (
    <>
      {variant === "outline" && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            padding: "2px",
            background: "linear-gradient(135deg, #FC8435 0%, #6286FB 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {variant === "filled" && (
        <div
          ref={glowRef}
          className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        className={cn(baseClasses, "group")}
        style={gradientStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          handleMouseLeave()
          handleMouseLeaveScale()
        }}
        onMouseEnter={handleMouseEnter}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={cn(baseClasses, "group")}
      style={gradientStyle}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave()
        handleMouseLeaveScale()
      }}
      onMouseEnter={handleMouseEnter}
    >
      {content}
    </button>
  )
}

"use client"

import { useRef, useCallback } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticButton({
  children,
  strength = 0.3,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out"
    })
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    })
  }, [])

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </button>
  )
}

interface MagneticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticLink({
  children,
  strength = 0.3,
  className,
  ...props
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return

    const rect = linkRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(linkRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out"
    })
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    if (!linkRef.current) return

    gsap.to(linkRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    })
  }, [])

  return (
    <a
      ref={linkRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative inline-block", className)}
      {...props}
    >
      {children}
    </a>
  )
}

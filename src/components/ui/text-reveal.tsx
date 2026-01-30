"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  type?: "words" | "chars" | "lines"
  stagger?: number
  duration?: number
  delay?: number
  trigger?: "load" | "scroll"
  y?: number
}

export function TextReveal({
  children,
  className,
  as: Component = "p",
  type = "words",
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  trigger = "scroll",
  y = 40,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return

    const container = containerRef.current
    const text = children

    // Split text based on type
    let elements: string[] = []
    if (type === "chars") {
      elements = text.split("")
    } else if (type === "words") {
      elements = text.split(" ")
    } else {
      elements = [text]
    }

    // Create span elements
    container.innerHTML = elements
      .map((el, i) => {
        const content = type === "words" && i < elements.length - 1 ? el + "&nbsp;" : el
        return `<span class="inline-block overflow-hidden"><span class="text-reveal-item inline-block" style="transform: translateY(${y}px); opacity: 0;">${content}</span></span>`
      })
      .join("")

    const items = container.querySelectorAll(".text-reveal-item")

    const animate = () => {
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      })
      hasAnimated.current = true
    }

    if (trigger === "load") {
      animate()
    } else {
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        onEnter: animate,
        once: true,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill()
      })
    }
  }, [children, type, stagger, duration, delay, trigger, y])

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn("", className)}
    >
      {children}
    </Component>
  )
}

interface FadeRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  trigger?: "load" | "scroll"
}

export function FadeReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 30,
  trigger = "scroll",
}: FadeRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.set(element, { y, opacity: 0 })

    const animate = () => {
      gsap.to(element, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
      })
    }

    if (trigger === "load") {
      animate()
    } else {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: animate,
        once: true,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === element) t.kill()
      })
    }
  }, [delay, duration, y, trigger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface StaggerRevealProps {
  children: React.ReactNode[]
  className?: string
  childClassName?: string
  stagger?: number
  duration?: number
  y?: number
  delay?: number
}

export function StaggerReveal({
  children,
  className,
  childClassName,
  stagger = 0.1,
  duration = 0.6,
  y = 30,
  delay = 0,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const items = container.children

    gsap.set(items, { y, opacity: 0 })

    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
        })
      },
      once: true,
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill()
      })
    }
  }, [stagger, duration, y, delay])

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, i) => (
        <div key={i} className={childClassName}>
          {child}
        </div>
      ))}
    </div>
  )
}

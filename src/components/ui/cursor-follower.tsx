"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CursorFollower() {
  const trailRefs = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const isVisible = useRef(false)

  useEffect(() => {
    // Only show on desktop
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return
    }

    const trailCount = 8
    const trails: HTMLDivElement[] = []

    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement("div")
      trail.className = "fixed pointer-events-none z-[9998] rounded-full mix-blend-screen hidden lg:block"
      trail.style.cssText = `
        width: ${12 - i}px;
        height: ${12 - i}px;
        background: linear-gradient(135deg, rgba(59, 130, 196, ${0.6 - i * 0.06}) 0%, rgba(155, 123, 170, ${0.5 - i * 0.05}) 50%, rgba(197, 168, 130, ${0.4 - i * 0.04}) 100%);
        opacity: 0;
        transform: translate(-50%, -50%);
        filter: blur(${i * 0.5}px);
      `
      document.body.appendChild(trail)
      trails.push(trail)
    }
    trailRefs.current = trails

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (!isVisible.current) {
        isVisible.current = true
        trails.forEach(trail => {
          trail.style.opacity = "1"
        })
      }

      // Animate each trail with increasing delay
      trails.forEach((trail, i) => {
        gsap.to(trail, {
          left: e.clientX,
          top: e.clientY,
          duration: 0.15 + i * 0.05,
          ease: "power2.out",
        })
      })
    }

    const onMouseLeave = () => {
      isVisible.current = false
      trails.forEach(trail => {
        gsap.to(trail, {
          opacity: 0,
          duration: 0.3,
        })
      })
    }

    const onMouseEnter = () => {
      if (mousePos.current.x > 0) {
        isVisible.current = true
        trails.forEach(trail => {
          gsap.to(trail, {
            opacity: 1,
            duration: 0.3,
          })
        })
      }
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      trails.forEach(trail => trail.remove())
    }
  }, [])

  return null
}

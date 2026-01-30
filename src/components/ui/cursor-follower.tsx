"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only show on desktop
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return
    }

    const cursor = cursorRef.current
    const dot = cursorDotRef.current

    if (!cursor || !dot) return

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
    }

    const onMouseEnterInteractive = () => {
      setIsHovering(true)
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const onMouseLeaveInteractive = () => {
      setIsHovering(false)
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    // Track mouse movement
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    // Track interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive)
      el.addEventListener("mouseleave", onMouseLeaveInteractive)
    })

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        "a:not([data-cursor-bound]), button:not([data-cursor-bound]), [data-cursor-hover]:not([data-cursor-bound])"
      )
      newElements.forEach((el) => {
        el.setAttribute("data-cursor-bound", "true")
        el.addEventListener("mouseenter", onMouseEnterInteractive)
        el.addEventListener("mouseleave", onMouseLeaveInteractive)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive)
        el.removeEventListener("mouseleave", onMouseLeaveInteractive)
      })
      observer.disconnect()
    }
  }, [isVisible])

  // Don't render on mobile/tablet
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          style={{
            width: isHovering ? "48px" : "32px",
            height: isHovering ? "48px" : "32px",
            transition: "width 0.3s ease, height 0.3s ease",
          }}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white"
        />
      </div>
    </>
  )
}

"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Statement() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-12 px-4">
      <div
        ref={sectionRef}
        className="max-w-4xl mx-auto text-center px-8 py-14 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 196, 0.05) 0%, rgba(155, 123, 170, 0.04) 50%, rgba(197, 168, 130, 0.05) 100%)",
        }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
          Why Relay
        </p>
        <h2 className="text-[24px] md:text-[32px] font-medium text-neutral-900 tracking-[-0.02em] leading-[1.25]">
          Your checklist lists the tasks.
          <br />
          <span className="text-neutral-400">Relay gets you the access.</span>
        </h2>
      </div>
    </section>
  )
}

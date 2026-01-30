"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Statement() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline with word split
      if (headlineRef.current) {
        const html = headlineRef.current.innerHTML
        const parts = html.split("<br>")

        // First line
        const firstLineWords = parts[0].trim().split(" ")
        const firstLineHtml = firstLineWords
          .map(word => `<span class="inline-block overflow-hidden"><span class="statement-word inline-block">${word}</span></span>`)
          .join(" ")

        // Second line (muted)
        const secondLineParsed = parts[1]?.match(/<span[^>]*>(.*?)<\/span>/)
        const secondLineText = secondLineParsed ? secondLineParsed[1] : ""
        const secondLineWords = secondLineText.trim().split(" ")
        const secondLineHtml = `<span class="text-neutral-400">${secondLineWords
          .map(word => `<span class="inline-block overflow-hidden"><span class="statement-word inline-block">${word}</span></span>`)
          .join(" ")}</span>`

        headlineRef.current.innerHTML = firstLineHtml + "<br>" + secondLineHtml

        gsap.set(".statement-word", { y: "110%" })

        gsap.to(".statement-word", {
          y: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            once: true,
          },
        })
      }

      // Subhead
      gsap.from(subheadRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subheadRef.current,
          start: "top 85%",
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          ref={headlineRef}
          className="text-[32px] md:text-[44px] lg:text-[52px] font-medium text-neutral-900 mb-8 tracking-[-0.02em] leading-[1.12]"
        >
          Your checklist lists the tasks.
          <br />
          <span className="text-neutral-400">
            Relay gets the missing access.
          </span>
        </h2>
        <p
          ref={subheadRef}
          className="text-[17px] text-neutral-500 leading-[1.7] max-w-2xl mx-auto"
        >
          MSP onboarding and takeovers are huge. "IT discovery" alone can run into hundreds of items.
          Relay turns that chaos into a guided intake that clients complete, with status, owners, and a clean handoff for your techs.
        </p>
      </div>
    </section>
  )
}

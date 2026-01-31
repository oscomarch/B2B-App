"use client"

import { motion } from "framer-motion"
import clsx from "clsx"
import { ArrowRight, Shield, Clock, Users } from "lucide-react"

const AnimatedGrid = () => (
    <motion.div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
        }}
    >
        <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#94a3b8_0%,#94a3b8_1px,transparent_1px,transparent_4%)] opacity-[0.07]" />
    </motion.div>
)

const CIRCLE_COLORS = [
    { border: "border-[#3B82C4]/50", glow: "rgba(59, 130, 196, 0.15)" },
    { border: "border-[#9B7BAA]/40", glow: "rgba(155, 123, 170, 0.12)" },
    { border: "border-[#C5A882]/30", glow: "rgba(197, 168, 130, 0.08)" },
]

// Floating particles for extra depth
const FloatingParticle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) => (
    <motion.div
        className="absolute rounded-full bg-gradient-to-br from-[#3B82C4]/20 to-[#9B7BAA]/10"
        style={{ width: size, height: size, left: x, top: y }}
        animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
            duration,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
        }}
    />
)

export function Hero() {
    return (
        <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#FAFAFA]">
            <AnimatedGrid />

            {/* Floating particles */}
            <FloatingParticle delay={0} duration={8} x="15%" y="20%" size={6} />
            <FloatingParticle delay={1} duration={10} x="80%" y="30%" size={4} />
            <FloatingParticle delay={2} duration={9} x="25%" y="70%" size={5} />
            <FloatingParticle delay={0.5} duration={11} x="75%" y="65%" size={7} />
            <FloatingParticle delay={1.5} duration={7} x="60%" y="15%" size={4} />
            <FloatingParticle delay={3} duration={12} x="10%" y="50%" size={5} />

            {/* Animated circles */}
            <motion.div className="absolute h-[450px] w-[450px] md:h-[550px] md:w-[550px] lg:h-[650px] lg:w-[650px]">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={clsx(
                            "absolute inset-0 rounded-full border-2",
                            CIRCLE_COLORS[i].border
                        )}
                        style={{
                            transform: `scale(${1 + i * 0.2})`,
                        }}
                        animate={{
                            rotate: i % 2 === 0 ? 360 : -360,
                            scale: [1 + i * 0.2, 1.08 + i * 0.2, 1 + i * 0.2],
                        }}
                        transition={{
                            duration: 10 + i * 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>

            {/* Soft glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,196,0.06),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,123,170,0.04),transparent_50%)]" />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.p
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Secure client onboarding for MSPs
                </motion.p>

                <motion.h1
                    className={clsx(
                        "text-4xl font-medium tracking-[-0.03em] md:text-5xl lg:text-6xl",
                        "bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-transparent",
                        "leading-[1.1] mb-6"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        The client handoff portal
                    </motion.span>
                    <br />
                    <motion.span
                        className="text-neutral-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        built for MSPs.
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="text-base md:text-lg text-neutral-500 mb-10 max-w-md mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    One secure link to collect credentials, track what's missing, and hand off cleanly.
                </motion.p>

                {/* CTA */}
                <motion.div
                    className="flex flex-col items-center gap-4 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.a
                        href="https://calendly.com/oscomarch/call-20min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 pl-7 pr-2 py-2.5 rounded-full text-[15px] font-medium text-white transition-all"
                        style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(59, 130, 196, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Book a demo
                        <motion.span
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20"
                            whileHover={{ rotate: -45 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </motion.span>
                    </motion.a>
                    <span className="text-[12px] text-neutral-400">Free for early teams</span>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    {[
                        { icon: Shield, text: "SOC 2 Ready" },
                        { icon: Clock, text: "5 min setup" },
                        { icon: Users, text: "Unlimited clients" },
                    ].map((badge, i) => (
                        <motion.div
                            key={badge.text}
                            className="flex items-center gap-1.5 text-[11px] text-neutral-400"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                        >
                            <badge.icon className="h-3.5 w-3.5" />
                            <span>{badge.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

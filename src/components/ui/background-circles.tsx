"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface BackgroundCirclesProps {
    title?: string;
    description?: string;
    className?: string;
    variant?: keyof typeof COLOR_VARIANTS;
    children?: React.ReactNode;
}

const COLOR_VARIANTS = {
    // Relay brand colors - blue to purple to beige
    relay: {
        border: [
            "border-[#3B82C4]/60",
            "border-[#9B7BAA]/50",
            "border-[#C5A882]/40",
        ],
        gradient: "from-[#3B82C4]/30",
    },
    primary: {
        border: [
            "border-emerald-500/60",
            "border-cyan-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-emerald-500/30",
    },
    secondary: {
        border: [
            "border-violet-500/60",
            "border-fuchsia-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-violet-500/30",
    },
    tertiary: {
        border: [
            "border-orange-500/60",
            "border-yellow-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-orange-500/30",
    },
    quaternary: {
        border: [
            "border-purple-500/60",
            "border-pink-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-purple-500/30",
    },
    senary: {
        border: [
            "border-blue-500/60",
            "border-sky-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-blue-500/30",
    },
} as const;

const AnimatedGrid = () => (
    <motion.div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
        animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
        }}
    >
        <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)] opacity-10" />
    </motion.div>
);

export function BackgroundCircles({
    title,
    description,
    className,
    variant = "relay",
    children,
}: BackgroundCirclesProps) {
    const variantStyles = COLOR_VARIANTS[variant];

    return (
        <div
            className={clsx(
                "relative flex h-screen w-full items-center justify-center overflow-hidden",
                "bg-[#FAFAFA]",
                className
            )}
        >
            <AnimatedGrid />

            {/* Animated circles */}
            <motion.div className="absolute h-[500px] w-[500px] md:h-[600px] md:w-[600px]">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={clsx(
                            "absolute inset-0 rounded-full",
                            "border-2 bg-gradient-to-br to-transparent",
                            variantStyles.border[i],
                            variantStyles.gradient
                        )}
                        style={{
                            transform: `scale(${1 + i * 0.15})`,
                        }}
                        animate={{
                            rotate: i % 2 === 0 ? 360 : -360,
                            scale: [1 + i * 0.15, 1.1 + i * 0.15, 1 + i * 0.15],
                            opacity: [0.6 - i * 0.1, 0.8 - i * 0.1, 0.6 - i * 0.1],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <div
                            className={clsx(
                                "absolute inset-0 rounded-full mix-blend-multiply opacity-20"
                            )}
                            style={{
                                background: `radial-gradient(ellipse at center, ${
                                    i === 0 ? 'rgba(59, 130, 196, 0.2)' :
                                    i === 1 ? 'rgba(155, 123, 170, 0.15)' :
                                    'rgba(197, 168, 130, 0.1)'
                                }, transparent 70%)`
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Content */}
            {children ? (
                <div className="relative z-10">
                    {children}
                </div>
            ) : (
                <motion.div
                    className="relative z-10 text-center px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {title && (
                        <h1
                            className={clsx(
                                "text-4xl font-medium tracking-tight md:text-6xl lg:text-7xl",
                                "bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-transparent",
                                "leading-[1.1]"
                            )}
                        >
                            {title}
                        </h1>
                    )}

                    {description && (
                        <motion.p
                            className="mt-6 text-lg md:text-xl text-neutral-500 max-w-lg mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {description}
                        </motion.p>
                    )}
                </motion.div>
            )}

            {/* Soft glow effects */}
            <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,196,0.08),transparent_70%)] blur-[100px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,123,170,0.06),transparent)] blur-[60px]" />
            </div>
        </div>
    );
}

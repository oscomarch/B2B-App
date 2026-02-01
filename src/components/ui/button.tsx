"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[15px] font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white rounded-xl hover:scale-[1.02] hover:shadow-soft active:scale-[0.98]",
        destructive:
          "bg-red-500/90 text-white rounded-xl hover:bg-red-600 hover:scale-[1.02]",
        outline:
          "border border-neutral-200/80 bg-transparent text-neutral-900 rounded-xl hover:bg-neutral-100/50",
        secondary:
          "bg-neutral-100 text-neutral-900 rounded-xl hover:bg-neutral-200/70",
        ghost:
          "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50 rounded-xl",
        link:
          "text-neutral-900 underline-offset-4 hover:underline",
        coral:
          "bg-gradient-to-r from-coral to-pink-soft text-white rounded-xl hover:scale-[1.02] hover:shadow-soft",
        gradient:
          "text-white rounded-xl hover:scale-[1.02] hover:shadow-soft [background:linear-gradient(135deg,#3B82C4_0%,#9B7BAA_50%,#C5A882_100%)]",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-sm rounded-lg",
        lg: "h-14 px-8 py-4 text-base rounded-xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

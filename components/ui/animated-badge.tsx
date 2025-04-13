"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        gradient: "border-transparent bg-gradient-to-r from-primary to-secondary text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface AnimatedBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  glowEffect?: boolean
}

export function AnimatedBadge({ className, variant, glowEffect = false, ...props }: AnimatedBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        badgeVariants({ variant }),
        glowEffect && "shadow-md hover:shadow-lg transition-shadow duration-300",
        className,
      )}
      {...props}
    />
  )
}

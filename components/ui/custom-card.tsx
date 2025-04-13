"use client"

import * as React from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-lg border bg-card text-card-foreground shadow-sm", {
  variants: {
    variant: {
      default: "bg-card",
      glass: "bg-card/70 backdrop-blur-md border-primary/10",
      gradient: "bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/20",
      outline: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface CustomCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof cardVariants> {
  title?: React.ReactNode
  hoverEffect?: "none" | "lift" | "glow" | boolean
}

export function CustomCard({ className, variant, hoverEffect = false, title, children, ...props }: CustomCardProps) {
  // Convert boolean hoverEffect to string value for backward compatibility
  const effectType = typeof hoverEffect === "boolean" ? (hoverEffect ? "lift" : "none") : hoverEffect

  return (
    <motion.div
      whileHover={
        effectType === "lift"
          ? {
              y: -5,
              transition: { duration: 0.2 },
            }
          : effectType === "glow"
            ? {
                y: -3,
                boxShadow: "0 0 15px rgba(var(--primary), 0.3)",
                borderColor: "rgba(var(--primary), 0.4)",
                transition: { duration: 0.2 },
              }
            : undefined
      }
      className={cn(cardVariants({ variant }), className)}
      {...(props as HTMLMotionProps<"div">)}
    >
      {title && (
        <div className="p-4 border-b border-border">
          <div className="text-lg font-medium text-primary">{title}</div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  )
}

export const CustomCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CustomCardHeader.displayName = "CustomCardHeader"

export const CustomCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight text-primary", className)}
      {...props}
    />
  ),
)
CustomCardTitle.displayName = "CustomCardTitle"

export const CustomCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CustomCardDescription.displayName = "CustomCardDescription"

export const CustomCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CustomCardContent.displayName = "CustomCardContent"

export const CustomCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CustomCardFooter.displayName = "CustomCardFooter"

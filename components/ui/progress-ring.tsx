"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  background?: string
  color?: string
  showValue?: boolean
  label?: string
  valueClassName?: string
  labelClassName?: string
  animated?: boolean
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  background,
  color,
  showValue = true,
  label,
  valueClassName,
  labelClassName,
  animated = true,
}: ProgressRingProps) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  // Use CSS variables for colors if not explicitly provided
  const ringColor = color || "hsl(var(--primary))"
  const ringBackground = background || "rgba(var(--muted)/0.2)"

  useEffect(() => {
    if (animated && isInView) {
      const timer = setTimeout(() => {
        setProgress(value)
      }, 300)
      return () => clearTimeout(timer)
    } else if (!animated) {
      setProgress(value)
    }
  }, [value, animated, isInView])

  return (
    <div
      ref={ref}
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={ringBackground} strokeWidth={strokeWidth} />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animated ? (isInView ? offset : circumference) : offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {(showValue || label) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showValue && (
            <motion.span
              className={cn("text-xl font-bold", valueClassName)}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.span>
          )}
          {label && (
            <motion.span
              className={cn("text-sm text-muted-foreground", labelClassName)}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7 }}
            >
              {label}
            </motion.span>
          )}
        </div>
      )}
    </div>
  )
}

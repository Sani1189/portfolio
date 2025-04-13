"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export default function ParallaxEffect({ children, speed = 0.5, direction = "up", className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  let transform: any
  if (direction === "up") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${-100 * speed}%`])
  } else if (direction === "down") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${100 * speed}%`])
  } else if (direction === "left") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${-100 * speed}%`])
  } else if (direction === "right") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${100 * speed}%`])
  } else {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${-100 * speed}%`])
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          [direction === "up" || direction === "down" ? "y" : "x"]: transform,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

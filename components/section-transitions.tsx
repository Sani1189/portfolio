"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView, useScroll, useTransform, type Variants } from "framer-motion"

// FadeIn component for simple fade-in animations
interface FadeInProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  delay?: number
  className?: string
  once?: boolean
  amount?: number
}

export function FadeIn({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0,
  className = "",
  once = true,
  amount = 0.1,
}: FadeInProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, isInView, once])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// ZoomIn component for zoom animations
interface ZoomInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
  once?: boolean
  amount?: number
  scale?: number
}

export function ZoomIn({
  children,
  duration = 0.5,
  delay = 0,
  className = "",
  once = true,
  amount = 0.1,
  scale = 0.95,
}: ZoomInProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, isInView, once])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// StaggerContainer and StaggerItem for staggered animations
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerAmount?: number
  delay?: number
  once?: boolean
  amount?: number
}

export function StaggerContainer({
  children,
  className = "",
  staggerAmount = 0.1,
  delay = 0,
  once = true,
  amount = 0.1,
}: StaggerContainerProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerAmount,
        delayChildren: delay,
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, isInView, once])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={containerVariants} className={className}>
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  duration?: number
  direction?: "up" | "down" | "left" | "right"
}

export function StaggerItem({ children, className = "", duration = 0.5, direction = "up" }: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

interface BlurInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
  once?: boolean
  amount?: number
}

export function BlurIn({
  children,
  duration = 0.5,
  delay = 0,
  className = "",
  once = true,
  amount = 0.1,
}: BlurInProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, isInView, once])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export const Parallax = ({ children, speed = 0.5, direction = "up", className = "" }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  // Initialize transform with a default value
  const defaultTransform = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
  let transform: any = defaultTransform

  if (direction === "up") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${-100 * speed}%`])
  } else if (direction === "down") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${100 * speed}%`])
  } else if (direction === "left") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${-100 * speed}%`])
  } else if (direction === "right") {
    transform = useTransform(scrollYProgress, [0, 1], ["0%", `${100 * speed}%`])
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

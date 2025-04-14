"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useSpaceTheme } from "./theme-context"

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, speed = 50, delay = 0, className = "", onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { themeEffects, themeColors } = useSpaceTheme()

  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    const timeout = setTimeout(
      () => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      },
      currentIndex === 0 ? delay : speed,
    )

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, onComplete, speed, text])

  // Apply theme-specific text effects
  const getTextEffectClass = () => {
    switch (themeEffects?.textEffect) {
      case "glow":
        return "text-glow"
      case "neon":
        return "text-neon"
      case "cosmic":
        return "text-cosmic"
      case "void":
        return "text-void"
      case "shimmer":
        return "animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%]"
      default:
        return ""
    }
  }

  return (
    <span className={`font-medium tracking-tight ${getTextEffectClass()} ${className}`}>
      {displayText}
      {!isComplete && (
        <span
          className="inline-block w-[2px] h-[1.1em] bg-primary animate-pulse ml-0.5 relative top-[0.1em]"
          style={{
            boxShadow: themeEffects?.textEffect !== "shimmer" ? themeColors.textGlow : "none",
            opacity: 0.8,
          }}
        ></span>
      )}
    </span>
  )
}

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: "light" | "medium" | "heavy"
  duration?: number
  infinite?: boolean
}

export function GlitchText({
  text,
  className = "",
  intensity = "medium",
  duration = 2000,
  infinite = false,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { themeEffects } = useSpaceTheme()

  const glitchChars = "!<>-_\\/[]{}—=+*^?#________"

  const getGlitchIntensity = () => {
    switch (intensity) {
      case "light":
        return { interval: 100, probability: 0.1, duration: 50 }
      case "heavy":
        return { interval: 50, probability: 0.3, duration: 100 }
      case "medium":
      default:
        return { interval: 80, probability: 0.2, duration: 80 }
    }
  }

  const glitchSettings = getGlitchIntensity()

  const applyGlitch = () => {
    let newText = ""
    for (let i = 0; i < text.length; i++) {
      if (Math.random() < glitchSettings.probability) {
        newText += glitchChars[Math.floor(Math.random() * glitchChars.length)]
      } else {
        newText += text[i]
      }
    }
    setDisplayText(newText)
  }

  const startGlitch = () => {
    intervalRef.current = setInterval(() => {
      applyGlitch()
    }, glitchSettings.interval)

    setTimeout(() => {
      if (intervalRef.current && !infinite) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
      }
    }, duration)
  }

  useEffect(() => {
    startGlitch()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, infinite])

  // Apply theme-specific text effects
  const getTextEffectClass = () => {
    switch (themeEffects?.textEffect) {
      case "glow":
        return "text-glow"
      case "neon":
        return "text-neon"
      case "cosmic":
        return "text-cosmic"
      case "void":
        return "text-void"
      default:
        return ""
    }
  }

  return <span className={`font-mono ${getTextEffectClass()} ${className}`}>{displayText}</span>
}

interface ShimmerTextProps {
  text: string
  className?: string
}

export function ShimmerText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] ${className}`}
    >
      {text}
    </span>
  )
}

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerChildren?: number
}

export function RevealText({
  text,
  className = "",
  delay = 0.2,
  duration = 0.5,
  staggerChildren = 0.03,
}: RevealTextProps) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
  }

  return (
    <motion.span className={`inline-block ${className}`} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block" variants={child}>
          {word}
          {index !== words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface GradientTextProps {
  text: string
  animate?: boolean
  className?: string
  from?: string
  to?: string
}

export function GradientText({
  text,
  from = "hsl(var(--primary))",
  to = "hsl(var(--primary)/0.8)",
  animate = false,
  className = "",
}: {
  text: string
  from?: string
  to?: string
  animate?: boolean
  className?: string
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${animate ? "animate-gradient-x" : ""} ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
        backgroundSize: animate ? "200% 100%" : "100% 100%",
      }}
    >
      {text}
    </span>
  )
}

interface BlurRevealProps {
  text: string
  className?: string
  once?: boolean
}

export function BlurReveal({ text, className = "", once = true }: BlurRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const controls = useAnimation()
  const { themeEffects, themeColors } = useSpaceTheme()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, isInView, once])

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: themeEffects?.animationStyle === "elastic" || themeEffects?.animationStyle === "distort" ? 1.2 : 1,
        ease:
          themeEffects?.animationStyle === "elastic" || themeEffects?.animationStyle === "distort"
            ? "easeOut"
            : themeEffects?.animationStyle === "bounce"
              ? "backOut"
              : themeEffects?.animationStyle === "warp"
                ? "circOut"
                : "easeOut",
      },
    },
  }

  // Apply theme-specific text effects
  const getTextEffectClass = () => {
    switch (themeEffects?.textEffect) {
      case "glow":
        return "text-glow"
      case "neon":
        return "text-neon"
      case "cosmic":
        return "text-cosmic"
      case "void":
        return "text-void"
      case "shimmer":
        return "animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%]"
      default:
        return ""
    }
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${getTextEffectClass()} ${className}`}
      initial="hidden"
      animate={controls}
      variants={variants}
      style={{
        textShadow: themeEffects?.textEffect !== "shimmer" ? themeColors.textGlow : "none",
      }}
    >
      {text}
    </motion.span>
  )
}

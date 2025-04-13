"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

type AnimationType = "fade" | "slide" | "reveal" | "typewriter" | "gradient" | "scale"

interface TextAnimationProps {
  text: string
  type?: AnimationType
  tag?: keyof JSX.IntrinsicElements
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export default function TextAnimation({
  text,
  type = "fade",
  tag = "p",
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
}: TextAnimationProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const [words, setWords] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  // Split text into words on client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true)
    setWords(text.split(" "))
  }, [text])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, isInView, once])

  // Animation variants based on type
  const getAnimationVariants = () => {
    switch (type) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: (i: number) => ({
            opacity: 1,
            transition: {
              delay: delay + i * 0.1,
              duration,
              ease: "easeOut",
            },
          }),
        }
      case "slide":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              delay: delay + i * 0.1,
              duration,
              ease: "easeOut",
            },
          }),
        }
      case "reveal":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
              delay: delay + i * 0.1,
              duration,
              ease: "easeOut",
            },
          }),
        }
      case "typewriter":
        return {
          hidden: { opacity: 0, width: 0 },
          visible: (i: number) => ({
            opacity: 1,
            width: "auto",
            transition: {
              delay: delay + i * 0.1,
              duration: duration * 1.5,
              ease: "easeInOut",
            },
          }),
        }
      case "gradient":
        return {
          hidden: { opacity: 0, backgroundPosition: "200% 0" },
          visible: (i: number) => ({
            opacity: 1,
            backgroundPosition: "0% 0",
            transition: {
              delay: delay + i * 0.1,
              duration: duration * 1.5,
              ease: "easeOut",
            },
          }),
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
              delay: delay + i * 0.1,
              duration,
              ease: [0.175, 0.885, 0.32, 1.275], // Custom easing for bounce effect
            },
          }),
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration } },
        }
    }
  }

  // Get class names based on animation type
  const getClassNames = () => {
    const baseClasses = className || ""

    switch (type) {
      case "gradient":
        return `${baseClasses} bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 bg-size-200`
      case "typewriter":
        return `${baseClasses} inline-block whitespace-nowrap overflow-hidden`
      default:
        return baseClasses
    }
  }

  // Create the component with the specified tag
  const Component = tag as any

  // Don't render anything during SSR to avoid hydration issues
  if (!isClient) {
    return <Component className={className}>{text}</Component>
  }

  return (
    <Component ref={ref} className={getClassNames()}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={getAnimationVariants()}
            initial="hidden"
            animate={controls}
            className="inline-block"
            style={{
              marginRight: i < words.length - 1 ? "0.25em" : 0,
              display: "inline-block",
              whiteSpace: type === "typewriter" ? "nowrap" : "normal",
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Component>
  )
}

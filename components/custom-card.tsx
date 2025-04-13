"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "gradient" | "3d"
  glowEffect?: boolean
  hoverEffect?: boolean
  children: React.ReactNode
}

export function CustomCard({
  className,
  variant = "default",
  glowEffect = false,
  hoverEffect = false,
  children,
  ...props
}: CustomCardProps) {
  const [isNebula, setIsNebula] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check theme attributes only on the client side
    const updateThemeState = () => {
      setIsNebula(document.documentElement.getAttribute("data-space-theme") === "nebula")
      setIsLightMode(document.documentElement.getAttribute("data-theme-mode") === "light")
    }

    // Initial check
    updateThemeState()

    // Set up observer for theme changes
    const observer = new MutationObserver(updateThemeState)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-space-theme", "data-theme-mode"],
    })

    return () => observer.disconnect()
  }, [])

  // Get variant-specific classes
  const getVariantClasses = () => {
    // Default classes for server-side rendering
    if (!mounted) {
      return variant === "outline"
        ? "bg-transparent border border-primary/20"
        : variant === "3d"
          ? "bg-card border-b-4 border-primary/30"
          : variant === "gradient"
            ? "bg-gradient-to-br from-card/90 via-card to-card/95 border-primary/10"
            : "bg-card border border-primary/10"
    }

    // Client-side classes based on theme
    if (isNebula) {
      switch (variant) {
        case "outline":
          return "bg-transparent backdrop-blur-sm border border-primary/30"
        case "gradient":
          return "bg-gradient-to-br from-card/80 via-card/90 to-card/80 border border-primary/20 backdrop-blur-sm"
        case "3d":
          return "bg-card border-b-4 border-primary/40 backdrop-blur-sm"
        default:
          return "bg-card/90 backdrop-blur-sm border border-primary/10"
      }
    } else {
      // Galaxy theme or default
      switch (variant) {
        case "outline":
          return "bg-transparent backdrop-blur-sm border border-primary/20"
        case "gradient":
          return "bg-gradient-to-br from-card/90 via-card to-card/95 border border-primary/10 backdrop-blur-sm"
        case "3d":
          return "bg-card border-b-4 border-primary/30 backdrop-blur-sm"
        default:
          return "bg-card/95 backdrop-blur-sm border border-primary/10"
      }
    }
  }

  // Get glow effect classes
  const getGlowClasses = () => {
    if (!glowEffect) return ""

    if (isNebula) {
      return isLightMode ? "shadow-[0_0_15px_rgba(0,0,0,0.1)]" : "shadow-[0_0_20px_rgba(120,120,255,0.15)]"
    } else {
      return isLightMode ? "shadow-[0_0_15px_rgba(0,0,0,0.1)]" : "shadow-[0_0_20px_rgba(80,80,255,0.1)]"
    }
  }

  // Get hover effect classes
  const getHoverClasses = () => {
    if (!hoverEffect) return ""

    if (isNebula) {
      return "transition-all duration-300 hover:shadow-[0_0_25px_rgba(120,120,255,0.2)] hover:-translate-y-1"
    } else {
      return "transition-all duration-300 hover:shadow-[0_0_20px_rgba(80,80,255,0.15)] hover:-translate-y-1"
    }
  }

  return (
    <div className={cn("rounded-xl", getVariantClasses(), getGlowClasses(), getHoverClasses(), className)} {...props}>
      {children}
    </div>
  )
}

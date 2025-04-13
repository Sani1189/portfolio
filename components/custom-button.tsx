"use client"

import type React from "react"
import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSpaceTheme } from "./theme-context"
import { useTheme } from "next-themes"

interface CustomButtonProps extends ButtonProps {
  glowEffect?: boolean
  animateOnHover?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "3d" | "neon"
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant = "default",
      glowEffect = false,
      animateOnHover = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const { themeColors } = useSpaceTheme()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    // Custom variants
    const getVariantClasses = () => {
      switch (variant) {
        case "gradient":
          return isDark
            ? "bg-gradient-to-r from-primary/90 to-primary/60 hover:from-primary/80 hover:to-primary/50 text-primary-foreground border-none"
            : "bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/60 text-primary-foreground border-none"
        case "3d":
          return isDark
            ? "bg-primary/90 text-primary-foreground border-b-4 border-primary/60 active:border-b-2 active:translate-y-0.5 transition-all"
            : "bg-primary text-primary-foreground border-b-4 border-primary/70 active:border-b-2 active:translate-y-0.5 transition-all"
        case "neon":
          return isDark
            ? "bg-background text-primary/90 border border-primary/90 hover:text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            : "bg-background text-primary border border-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300"
        default:
          return ""
      }
    }

    // Glow effect classes
    const glowClasses = glowEffect
      ? isDark
        ? "shadow-[0_0_15px_rgba(var(--primary)/0.4)] hover:shadow-[0_0_20px_rgba(var(--primary)/0.6)]"
        : "shadow-[0_0_15px_rgba(var(--primary)/0.5)] hover:shadow-[0_0_20px_rgba(var(--primary)/0.7)]"
      : ""

    return (
      <Button
        ref={ref}
        className={cn(
          getVariantClasses(),
          glowClasses,
          "flex items-center gap-2 transition-all duration-300",
          className,
        )}
        style={{
          boxShadow: glowEffect ? themeColors.buttonGlow : undefined,
        }}
        {...props}
      >
        {animateOnHover ? (
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {iconLeft}
            {children}
            {iconRight}
          </motion.div>
        ) : (
          <>
            {iconLeft}
            {children}
            {iconRight}
          </>
        )}
      </Button>
    )
  },
)

CustomButton.displayName = "CustomButton"

export { CustomButton }

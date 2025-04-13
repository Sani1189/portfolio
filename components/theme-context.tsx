"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

// Updated space theme options
type SpaceTheme = "galaxy" | "nebula"

// Theme effects to match real-world counterparts
interface ThemeEffects {
  animationStyle: "smooth" | "bounce" | "elastic" | "cosmic" | "distort" | "warp"
  textEffect: "glow" | "neon" | "cosmic" | "shimmer" | "void" | "none"
  particleEffect: "stars" | "dust" | "nebula" | "vortex" | "none"
  fontStyle: "normal" | "futuristic" | "cosmic" | "elegant" | "distorted"
}

interface ThemeContextType {
  spaceTheme: SpaceTheme
  setSpaceTheme: (theme: SpaceTheme) => void
  colorScheme: string | undefined
  themeColors: {
    primary: string
    secondary: string
    accent: string
    textGlow: string
    buttonGlow: string
    cardGlow: string
    textColor: string
    headingColor: string
    mutedTextColor: string
    paragraphColor?: string
  }
  themeEffects: ThemeEffects
  isDarkMode: boolean
}

const defaultThemeColors = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  textGlow: "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)",
  buttonGlow: "0 0 15px hsl(var(--primary) / 0.7)",
  cardGlow: "0 0 20px hsl(var(--primary) / 0.3)",
  textColor: "hsl(var(--foreground))",
  headingColor: "hsl(var(--foreground))",
  mutedTextColor: "hsl(var(--muted-foreground))",
}

const defaultThemeEffects: ThemeEffects = {
  animationStyle: "smooth",
  textEffect: "none",
  particleEffect: "none",
  fontStyle: "normal",
}

const ThemeContext = createContext<ThemeContextType>({
  spaceTheme: "galaxy",
  setSpaceTheme: () => {},
  colorScheme: undefined,
  themeColors: defaultThemeColors,
  themeEffects: defaultThemeEffects,
  isDarkMode: true,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme()
  const [spaceTheme, setSpaceThemeState] = useState<SpaceTheme>("galaxy")
  const [colorScheme, setColorScheme] = useState<string | undefined>(undefined)
  const [themeColors, setThemeColors] = useState(defaultThemeColors)
  const [themeEffects, setThemeEffects] = useState<ThemeEffects>(defaultThemeEffects)
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Handle initial mount
  useEffect(() => {
    setMounted(true)

    // Get initial space theme from localStorage if available
    const savedSpaceTheme = localStorage.getItem("space-theme") as SpaceTheme | null
    if (savedSpaceTheme && (savedSpaceTheme === "galaxy" || savedSpaceTheme === "nebula")) {
      setSpaceThemeState(savedSpaceTheme)
    }

    // Get initial color scheme from localStorage if available
    const savedColorScheme = localStorage.getItem("color-scheme")
    if (savedColorScheme) {
      setColorScheme(savedColorScheme)
    }

    // Set initial dark mode based on resolvedTheme
    setIsDarkMode(resolvedTheme === "dark")
  }, [resolvedTheme])

  // Set space theme and save to localStorage
  const setSpaceTheme = (theme: SpaceTheme) => {
    console.log("Setting space theme to:", theme) // Debug log
    setSpaceThemeState(theme)
    localStorage.setItem("space-theme", theme)

    // Dispatch a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("spaceThemeChange", {
        detail: { theme },
      }),
    )
  }

  // Update theme effects based on space theme
  useEffect(() => {
    if (!mounted) return

    // Set theme effects based on space theme
    switch (spaceTheme) {
      case "galaxy":
        setThemeEffects({
          animationStyle: "smooth",
          textEffect: "glow",
          particleEffect: "stars",
          fontStyle: "normal",
        })
        break
      case "nebula":
        setThemeEffects({
          animationStyle: "cosmic",
          textEffect: "cosmic",
          particleEffect: "nebula",
          fontStyle: "cosmic",
        })
        break
      default:
        setThemeEffects({
          animationStyle: "smooth",
          textEffect: "glow",
          particleEffect: "stars",
          fontStyle: "normal",
        })
    }
  }, [spaceTheme, mounted])

  // Update color scheme from theme
  useEffect(() => {
    if (!mounted) return

    // Extract color scheme from theme
    const newColorScheme = theme?.includes("-") ? theme.split("-")[1] : undefined
    if (newColorScheme !== colorScheme) {
      setColorScheme(newColorScheme)
    }

    // Update isDarkMode based on resolvedTheme
    setIsDarkMode(resolvedTheme === "dark")

    // Log current theme state for debugging
    console.log("Theme updated:", {
      colorScheme: newColorScheme,
      spaceTheme,
      isDarkMode: resolvedTheme === "dark",
    })
  }, [theme, colorScheme, mounted, resolvedTheme, spaceTheme])

  // Update theme colors based on color scheme and light/dark mode
  useEffect(() => {
    if (!mounted) return

    const isDark = resolvedTheme === "dark"
    const isNebula = spaceTheme === "nebula"

    // Get CSS variables for colors
    const computedStyle = getComputedStyle(document.documentElement)
    const primaryHsl = computedStyle.getPropertyValue("--primary").trim()
    const secondaryHsl = computedStyle.getPropertyValue("--secondary").trim()
    const accentHsl = computedStyle.getPropertyValue("--accent").trim()

    // Add data attributes for theme styling
    document.documentElement.setAttribute("data-theme-mode", isDark ? "dark" : "light")
    document.documentElement.setAttribute("data-space-theme", spaceTheme)

    // Adjust text colors based on light/dark mode and space theme
    const textColorAdjustment = isDark
      ? "hsl(var(--foreground) / 1)"
      : isNebula
        ? "hsl(var(--foreground) / 1)"
        : "hsl(var(--foreground) / 1)"

    const headingColorAdjustment = isDark
      ? "hsl(0, 0%, 100%)"
      : isNebula
        ? "hsl(var(--foreground) / 1)"
        : "hsl(var(--foreground) / 1)"

    const paragraphColorAdjustment = isDark
      ? "hsl(0, 0%, 95%)"
      : isNebula
        ? "hsl(var(--foreground) / 1)"
        : "hsl(var(--foreground) / 1)"

    const mutedTextColorAdjustment = isDark
      ? "hsl(var(--muted-foreground) / 1)"
      : isNebula
        ? "hsl(var(--muted-foreground) / 0.8)"
        : "hsl(var(--muted-foreground) / 0.9)"

    // Set theme colors based on CSS variables
    const newColors = {
      primary: `hsl(${primaryHsl})`,
      secondary: `hsl(${secondaryHsl})`,
      accent: `hsl(${accentHsl})`,
      textGlow: `0 0 10px hsl(${primaryHsl} / 0.5), 0 0 20px hsl(${primaryHsl} / 0.3)`,
      buttonGlow: isDark
        ? `0 0 15px hsl(${primaryHsl} / 0.7), 0 0 30px hsl(${primaryHsl} / 0.4)`
        : `0 0 15px hsl(${primaryHsl} / 0.7), 0 0 30px hsl(${primaryHsl} / 0.4)`,
      cardGlow: `0 0 20px hsl(${primaryHsl} / 0.3), 0 0 40px hsl(${primaryHsl} / 0.1)`,
      textColor: textColorAdjustment,
      headingColor: headingColorAdjustment,
      paragraphColor: paragraphColorAdjustment,
      mutedTextColor: mutedTextColorAdjustment,
    }

    setThemeColors(newColors)
  }, [colorScheme, resolvedTheme, spaceTheme, mounted])

  // Handle theme change events
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      window.dispatchEvent(
        new CustomEvent("colorSchemeUpdate", {
          detail: {
            colorScheme,
            isDark: resolvedTheme === "dark",
            spaceTheme,
          },
        }),
      )
    }

    window.addEventListener("themeChanged", handleThemeChange as EventListener)

    return () => {
      window.removeEventListener("themeChanged", handleThemeChange as EventListener)
    }
  }, [colorScheme, resolvedTheme, spaceTheme])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider
      value={{
        spaceTheme,
        setSpaceTheme,
        colorScheme,
        themeColors,
        themeEffects,
        isDarkMode: resolvedTheme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useSpaceTheme = () => useContext(ThemeContext)

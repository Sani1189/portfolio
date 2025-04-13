"use client"

import { useEffect, useState } from "react"
import { useSpaceTheme } from "@/components/theme-context"
import dynamic from "next/dynamic"

// Dynamically import the space theme components
const GalaxyField = dynamic(() => import("@/components/space-themes/galaxy-field"), {
  ssr: false,
})

const NebulaField = dynamic(() => import("@/components/space-themes/nebula-field"), {
  ssr: false,
})

export default function ThemeBackgroundController() {
  const { spaceTheme, isDarkMode } = useSpaceTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Log the current theme state for debugging
  useEffect(() => {
    if (mounted) {
      console.log("ThemeBackgroundController:", { spaceTheme, isDarkMode })
    }
  }, [spaceTheme, isDarkMode, mounted])

  if (!mounted) return null

  // Render the appropriate background based on the space theme
  return (
    <>
      {spaceTheme === "galaxy" && <GalaxyField isDarkMode={isDarkMode} />}
      {spaceTheme === "nebula" && <NebulaField isDarkMode={isDarkMode} />}
    </>
  )
}

"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Initial check
      setIsMobile(window.innerWidth < 768)

      // Handler to call on window resize
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Add event listener
      window.addEventListener("resize", handleResize)

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}

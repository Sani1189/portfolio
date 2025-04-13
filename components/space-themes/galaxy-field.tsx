"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useSpaceTheme } from "../theme-context"

interface GalaxyFieldProps {
  isDarkMode?: boolean
  speedFactor?: number
  starCount?: number
}

// Reduce star count dramatically
export default function GalaxyField({ isDarkMode = true, speedFactor = 0.02, starCount = 3000 }: GalaxyFieldProps) {
  const { themeColors, colorScheme } = useSpaceTheme()
  const { resolvedTheme } = useTheme()
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Determine background and star colors based on theme
  const getBackgroundColor = () => {
    return isDarkMode ? "#000000" : "#e0e6f5" // Pure black for dark mode, slightly darker background for light mode
  }

  // Modify the getStarColor function to handle color transitions
  const getStarColor = () => {
    // Use theme colors based on color scheme
    if (colorScheme) {
      switch (colorScheme) {
        case "red":
          return isDarkMode ? [255, 255, 255] : [180, 30, 30]
        case "rose":
          return isDarkMode ? [255, 255, 255] : [180, 30, 100]
        case "orange":
          return isDarkMode ? [255, 255, 255] : [180, 80, 30]
        case "green":
          return isDarkMode ? [255, 255, 255] : [30, 120, 60]
        case "blue":
          return isDarkMode ? [255, 255, 255] : [30, 60, 120]
        case "yellow":
          return isDarkMode ? [255, 255, 255] : [180, 150, 30]
        case "violet":
          return isDarkMode ? [255, 255, 255] : [100, 30, 150]
        default:
          return isDarkMode ? [255, 255, 255] : [60, 60, 120]
      }
    }
    return isDarkMode ? [255, 255, 255] : [60, 60, 120]
  }

  useEffect(() => {
    const canvas = document.getElementById("starfield") as HTMLCanvasElement

    if (canvas) {
      const c = canvas.getContext("2d")

      if (c) {
        let w = window.innerWidth
        let h = window.innerHeight

        const setCanvasExtents = () => {
          canvas.width = w
          canvas.height = h
        }

        setCanvasExtents()

        window.onresize = () => {
          setCanvasExtents()
        }

        // Create a function to get star colors that can be called during animation
        const getStarColorDynamic = () => {
          // Use theme colors based on color scheme
          if (colorScheme) {
            switch (colorScheme) {
              case "red":
                return isDarkMode ? [255, 255, 255] : [180, 30, 30]
              case "rose":
                return isDarkMode ? [255, 255, 255] : [180, 30, 100]
              case "orange":
                return isDarkMode ? [255, 255, 255] : [180, 80, 30]
              case "green":
                return isDarkMode ? [255, 255, 255] : [30, 120, 60]
              case "blue":
                return isDarkMode ? [255, 255, 255] : [30, 60, 120]
              case "yellow":
                return isDarkMode ? [255, 255, 255] : [180, 150, 30]
              case "violet":
                return isDarkMode ? [255, 255, 255] : [100, 30, 150]
              default:
                return isDarkMode ? [255, 255, 255] : [60, 60, 120]
            }
          }
          return isDarkMode ? [255, 255, 255] : [60, 60, 120]
        }

        // Create stars with a reference to the dynamic color function
        const makeStars = (count: number) => {
          const out = []
          // Reduce star count significantly
          const actualCount = isDarkMode ? Math.floor(count * 0.5) : Math.floor(count * 0.4)

          for (let i = 0; i < actualCount; i++) {
            const s = {
              x: Math.random() * 1600 - 800,
              y: Math.random() * 900 - 450,
              z: Math.random() * 1000,
              // Make stars smaller
              size: Math.random() * (isDarkMode ? 0.8 : 0.9) + (isDarkMode ? 0.2 : 0.3),
              baseColor:
                Math.random() > 0.5 ? getStarColorDynamic() : isDarkMode ? [255, 255, 255] : getStarColorDynamic(),
              // Slower twinkle
              twinkle: {
                speed: Math.random() * 0.005 + 0.002,
                phase: Math.random() * Math.PI * 2,
              },
              targetColor: null as number[] | null, // Add targetColor property
              color: null as number[] | null, // Add color property
            }
            out.push(s)
          }
          return out
        }

        const stars = makeStars(starCount)

        // Function to update star colors without recreating them
        const updateStarColors = () => {
          const defaultColor = getStarColorDynamic()
          const whiteColor = isDarkMode ? [255, 255, 255] : defaultColor

          stars.forEach((star) => {
            // Update colors based on current theme
            if (Math.random() > 0.5) {
              star.baseColor = defaultColor
            } else {
              star.baseColor = whiteColor
            }
          })
        }

        // Listen for theme changes to update colors
        const handleThemeChange = () => {
          updateStarColors()
        }

        window.addEventListener("themeChanged", handleThemeChange)

        const clear = () => {
          // Create a more interesting background for light mode
          if (!isDarkMode) {
            const bgGradient = c.createLinearGradient(0, 0, w, h)
            bgGradient.addColorStop(0, "#e6f0ff")
            bgGradient.addColorStop(0.5, "#f0f4ff")
            bgGradient.addColorStop(1, "#e0ecff")
            c.fillStyle = bgGradient
          } else {
            c.fillStyle = getBackgroundColor()
          }
          c.fillRect(0, 0, canvas.width, canvas.height)
        }

        // Update the putPixel function to enhance glow effects
        const putPixel = (
          x: number,
          y: number,
          brightness: number,
          size: number,
          color: number[],
          time: number,
          twinkle: any,
        ) => {
          // Apply twinkle effect
          const twinkleFactor = Math.sin(time * twinkle.speed + twinkle.phase) * 0.3 + 0.7
          const adjustedBrightness = brightness * twinkleFactor

          // Enhanced glow effect for both modes
          // In the putPixel function, simplify glow effects
          if (brightness > 0.8 && size > 0.7) {
            // Only apply to larger stars
            const glowSize = size * (adjustedBrightness * (isDarkMode ? 3 : 2)) // Reduced from 5/3
            const glow = c.createRadialGradient(x, y, 0, x, y, glowSize)

            if (isDarkMode) {
              glow.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${adjustedBrightness * 0.7})`)
              glow.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`)
            } else {
              glow.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${adjustedBrightness * 0.6})`)
              glow.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`)
            }

            c.fillStyle = glow
            c.beginPath()
            c.arc(x, y, glowSize, 0, Math.PI * 2)
            c.fill()
          }

          // Draw the star with adjusted appearance for light mode
          const starOpacity = isDarkMode ? adjustedBrightness : adjustedBrightness * 0.9
          const starSize = isDarkMode ? size : size * 1.2 // Larger stars for light mode

          // Add shadow effect for both modes
          if (!isDarkMode) {
            c.shadowColor = `rgba(${color[0] / 2}, ${color[1] / 2}, ${color[2] / 2}, 0.8)`
            c.shadowBlur = 4
          } else {
            c.shadowBlur = 0
          }

          const rgb = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${starOpacity})`
          c.fillStyle = rgb
          c.beginPath()
          c.arc(x, y, starSize, 0, Math.PI * 2)
          c.fill()

          // Reset shadow
          c.shadowBlur = 0

          // For brighter stars, add cross spikes to make them more star-like
          if (brightness > 0.8 && size > 0.8) {
            const spikeLength = size * 2
            c.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${starOpacity * 0.5})`
            c.lineWidth = 0.5

            c.beginPath()
            c.moveTo(x - spikeLength, y)
            c.lineTo(x + spikeLength, y)
            c.moveTo(x, y - spikeLength)
            c.lineTo(x, y + spikeLength)
            c.stroke()
          }
        }

        const moveStars = (distance: number) => {
          const count = stars.length
          for (var i = 0; i < count; i++) {
            const s = stars[i]

            // Apply hover effect - slow down stars near mouse
            // In the moveStars function, reduce mouse interaction
            if (mousePosition) {
              const cx = w / 2
              const cy = h / 2
              const x = cx + s.x / (s.z * 0.001)
              const y = cy + s.y / (s.z * 0.001)

              const dx = x - mousePosition.x
              const dy = y - mousePosition.y
              const dist = Math.sqrt(dx * dx + dy * dy)

              // If star is close to mouse, with less effect and shorter distance
              if (dist < 70) {
                // Reduced from 100
                const slowFactor = dist / 70
                s.z -= distance * slowFactor * 0.3 // Reduced from 0.5
              } else {
                s.z -= distance
              }
            } else {
              s.z -= distance
            }

            while (s.z <= 1) {
              s.z += 1000
              // Randomize position when recycling star
              s.x = Math.random() * 1600 - 800
              s.y = Math.random() * 900 - 450
            }
          }
        }

        let prevTime: number
        const init = (time: number) => {
          prevTime = time
          requestAnimationFrame(tick)
        }

        const tick = (time: number) => {
          const elapsed = time - prevTime
          prevTime = time

          if (!isPaused) {
            moveStars(elapsed * speedFactor)
          }

          clear()

          const cx = w / 2
          const cy = h / 2

          const count = stars.length
          for (var i = 0; i < count; i++) {
            const star = stars[i]

            const x = cx + star.x / (star.z * 0.001)
            const y = cy + star.y / (star.z * 0.001)

            if (x < 0 || x >= w || y < 0 || y >= h) {
              continue
            }

            const d = star.z / 1000.0
            const b = 1 - d * d

            putPixel(x, y, b, star.size, star.baseColor, time, star.twinkle)
          }

          // In the animation function, add color transition logic
          // Inside the animate function, add this code to smoothly transition star colors
          // when the color scheme changes:

          // Add this to the animate function:
          // Gradually transition star colors to match the current theme
          stars.forEach((star) => {
            // If the star has a targetColor property, transition towards it
            if (star.targetColor && Array.isArray(star.targetColor)) {
              // Gradually shift current color towards target color
              if (!Array.isArray(star.color)) {
                star.color = getStarColor()
              } else {
                star.color[0] += (star.targetColor[0] - star.color[0]) * 0.01
                star.color[1] += (star.targetColor[1] - star.color[1]) * 0.01
                star.color[2] += (star.targetColor[2] - star.color[2]) * 0.01
              }
            } else {
              // Set target color if it doesn't exist
              star.targetColor = getStarColor()
            }
          })

          requestAnimationFrame(tick)
        }

        requestAnimationFrame(init)

        // Add window resize listener
        window.addEventListener("resize", () => {
          w = window.innerWidth
          h = window.innerHeight
          setCanvasExtents()
        })

        // Add mouse move listener for hover effect
        const handleMouseMove = (e: MouseEvent) => {
          setMousePosition({ x: e.clientX, y: e.clientY })
        }

        // Add mouse enter/leave for canvas
        const handleMouseEnter = () => {
          setIsPaused(false)
        }

        const handleMouseLeave = () => {
          setMousePosition(null)
          setIsPaused(false)
        }

        window.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("mouseenter", handleMouseEnter)
        canvas.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          window.onresize = null
          window.removeEventListener("mousemove", handleMouseMove)
          canvas.removeEventListener("mouseenter", handleMouseEnter)
          canvas.removeEventListener("mouseleave", handleMouseLeave)
          window.removeEventListener("themeChanged", handleThemeChange)
        }
      } else {
        console.error("Could not get 2d context from canvas element")
      }
    } else {
      console.error('Could not find canvas element with id "starfield"')
    }
  }, [starCount, speedFactor, isDarkMode, colorScheme])

  // Modify the useEffect for creating gradient overlays to handle color transitions smoothly
  useEffect(() => {
    // Instead of removing and recreating all elements, update existing ones
    // Simplify the gradient effects
    const updateGradients = () => {
      // Get primary color for gradient
      const computedStyle = getComputedStyle(document.documentElement)
      const primaryHsl = computedStyle.getPropertyValue("--primary").trim()

      // Get or create container for gradient effects
      let gradientContainer = document.getElementById("galaxy-gradient-container")
      if (!gradientContainer) {
        gradientContainer = document.createElement("div")
        gradientContainer.id = "galaxy-gradient-container"
        document.body.appendChild(gradientContainer)
      }

      gradientContainer.style.position = "fixed"
      gradientContainer.style.top = "0"
      gradientContainer.style.left = "0"
      gradientContainer.style.width = "100%"
      gradientContainer.style.height = "100%"
      gradientContainer.style.pointerEvents = "none"
      gradientContainer.style.zIndex = "-1"

      // Apply transition for smooth color changes - simplified
      gradientContainer.style.transition = "background 0.8s ease-in-out"

      // Just a single, simplified gradient
      if (isDarkMode) {
        // Always use pure black with no gradients for dark mode
        gradientContainer.style.background = "none"
      } else {
        gradientContainer.style.background = `
radial-gradient(circle at 30% 30%, hsl(${primaryHsl} / 0.1) 0%, transparent 45%),
radial-gradient(circle at 70% 70%, hsl(${primaryHsl} / 0.08) 0%, transparent 40%)
`
      }

      // Remove animated element entirely
      const animatedElement = document.getElementById("galaxy-animated-element")
      if (animatedElement && animatedElement.parentNode) {
        animatedElement.parentNode.removeChild(animatedElement)
      }

      // Remove style element to eliminate animations
      const styleElement = document.getElementById("galaxy-animation-style")
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }
    }

    // Update gradients initially
    updateGradients()

    // Update gradients when theme changes without removing elements
    const handleThemeChange = () => {
      updateGradients()
    }

    window.addEventListener("themeChanged", handleThemeChange)

    return () => {
      window.removeEventListener("themeChanged", handleThemeChange)
    }
  }, [isDarkMode, colorScheme, themeColors])

  return (
    <canvas
      id="starfield"
      style={{
        padding: 0,
        margin: 0,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        opacity: 1,
        pointerEvents: "none",
        mixBlendMode: isDarkMode ? "screen" : "normal", // Changed from darken to normal for light mode
      }}
    ></canvas>
  )
}

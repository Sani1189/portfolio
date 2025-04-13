"use client"

import { useEffect, useRef } from "react"
import { useSpaceTheme } from "@/components/theme-context"

interface NebulaFieldProps {
  isDarkMode?: boolean
}

export default function NebulaField({ isDarkMode = true }: NebulaFieldProps) {
  const { isDarkMode: contextIsDarkMode } = useSpaceTheme()

  // Use the provided prop or fall back to context value
  const effectiveDarkMode = isDarkMode !== undefined ? isDarkMode : contextIsDarkMode

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create stars - SAME COUNT for both modes
    const starCount = 700
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.001 + 0.0005, // Very slow twinkle
    }))

    // Create nebula clouds - SAME COUNT for both modes
    const cloudCount = 8
    const nebulaClouds = Array.from({ length: cloudCount }, () => {
      // Generate random colors for the nebula clouds
      const hue1 = Math.random() * 360
      const hue2 = (hue1 + 30 + Math.random() * 60) % 360

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 150,
        opacity: effectiveDarkMode ? Math.random() * 0.2 + 0.1 : Math.random() * 0.15 + 0.05, // Slightly lower opacity for light mode
        color1: effectiveDarkMode ? `hsl(${hue1}, 70%, 60%)` : `hsl(${hue1}, 60%, 80%)`, // Lighter, less saturated for light mode
        color2: effectiveDarkMode ? `hsl(${hue2}, 70%, 60%)` : `hsl(${hue2}, 60%, 85%)`, // Lighter, less saturated for light mode
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.0001 - 0.00005,
        pulseSpeed: Math.random() * 0.0001 + 0.00005,
        pulsePhase: Math.random() * Math.PI * 2,
      }
    })

    // Create dust filaments - SAME COUNT for both modes
    const filamentCount = 5
    const filaments = Array.from({ length: filamentCount }, () => {
      const hue = Math.random() * 360
      const centerX = Math.random() * canvas.width
      const centerY = Math.random() * canvas.height
      const length = Math.random() * 400 + 200
      const width = Math.random() * 100 + 50
      const angle = Math.random() * Math.PI * 2

      return {
        centerX,
        centerY,
        length,
        width,
        angle,
        color: effectiveDarkMode ? `hsl(${hue}, 70%, 60%)` : `hsl(${hue}, 60%, 80%)`, // Lighter, less saturated for light mode
        opacity: effectiveDarkMode ? Math.random() * 0.2 + 0.1 : Math.random() * 0.15 + 0.05, // Slightly lower opacity for light mode
        rotationSpeed: Math.random() * 0.0001 - 0.00005,
        waveFrequency: Math.random() * 0.001 + 0.0005,
        waveAmplitude: Math.random() * 20 + 10,
      }
    })

    // Create bright stars within nebula - SAME COUNT for both modes
    const brightStarCount = 12
    const brightStars = Array.from({ length: brightStarCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      glowRadius: Math.random() * 30 + 20,
      opacity: effectiveDarkMode ? Math.random() * 0.6 + 0.4 : Math.random() * 0.4 + 0.2, // Lower opacity for light mode
      color: effectiveDarkMode
        ? `hsl(${Math.random() * 60 + 200}, 80%, 70%)` // Bluish colors for dark mode
        : `hsl(${Math.random() * 60 + 200}, 70%, 80%)`, // Lighter blue for light mode
      pulseSpeed: Math.random() * 0.0002 + 0.0001,
      pulsePhase: Math.random() * Math.PI * 2,
    }))

    // Animation function
    const animate = (time: number) => {
      // Clear canvas with solid background color
      if (effectiveDarkMode) {
        // Dark mode - deep space background
        ctx.fillStyle = "#030310"
      } else {
        // Light mode - very light background
        ctx.fillStyle = "#f0f5ff"
      }

      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw filaments
      filaments.forEach((filament) => {
        // Update rotation
        filament.angle += filament.rotationSpeed

        // Calculate wave effect
        const waveOffset = Math.sin(time * filament.waveFrequency) * filament.waveAmplitude

        // Draw filament
        ctx.save()
        ctx.translate(filament.centerX, filament.centerY)
        ctx.rotate(filament.angle)

        const gradient = ctx.createLinearGradient(-filament.length / 2, 0, filament.length / 2, 0)
        gradient.addColorStop(0, `${filament.color.replace(")", ", 0)")}`)
        gradient.addColorStop(0.2, `${filament.color.replace(")", `, ${filament.opacity})`)}`)
        gradient.addColorStop(0.5, `${filament.color.replace(")", `, ${filament.opacity * 1.5})`)}`)
        gradient.addColorStop(0.8, `${filament.color.replace(")", `, ${filament.opacity})`)}`)
        gradient.addColorStop(1, `${filament.color.replace(")", ", 0)")}`)

        ctx.fillStyle = gradient

        // Draw curved filament
        ctx.beginPath()
        ctx.moveTo(-filament.length / 2, -filament.width / 2 + waveOffset)
        ctx.quadraticCurveTo(0, -filament.width + waveOffset * 2, filament.length / 2, -filament.width / 2 + waveOffset)
        ctx.lineTo(filament.length / 2, filament.width / 2 - waveOffset)
        ctx.quadraticCurveTo(0, filament.width - waveOffset * 2, -filament.length / 2, filament.width / 2 - waveOffset)
        ctx.closePath()
        ctx.fill()

        ctx.restore()
      })

      // Draw nebula clouds
      nebulaClouds.forEach((cloud) => {
        // Update rotation and pulsing
        cloud.rotation += cloud.rotationSpeed
        const pulseFactor = Math.sin(time * cloud.pulseSpeed + cloud.pulsePhase) * 0.1 + 0.9

        // Draw cloud
        ctx.save()
        ctx.translate(cloud.x, cloud.y)
        ctx.rotate(cloud.rotation)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, cloud.radius * pulseFactor)
        gradient.addColorStop(0, `${cloud.color1.replace(")", `, ${cloud.opacity * 1.5})`)}`)
        gradient.addColorStop(0.5, `${cloud.color2.replace(")", `, ${cloud.opacity})`)}`)
        gradient.addColorStop(1, `${cloud.color1.replace(")", ", 0)")}`)

        ctx.fillStyle = gradient

        // Draw irregular cloud shape
        ctx.beginPath()
        const points = 12 // More points for more complex shape
        const angleStep = (Math.PI * 2) / points

        for (let i = 0; i < points; i++) {
          const angle = i * angleStep
          const radiusVariation = 0.7 + Math.sin(angle * 3 + time * 0.0001) * 0.3
          const x = Math.cos(angle) * cloud.radius * radiusVariation * pulseFactor
          const y = Math.sin(angle) * cloud.radius * radiusVariation * 0.6 * pulseFactor

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      // Draw bright stars with glow
      brightStars.forEach((star) => {
        const pulseFactor = Math.sin(time * star.pulseSpeed + star.pulsePhase) * 0.2 + 0.8

        // Draw glow
        const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.glowRadius * pulseFactor)
        glowGradient.addColorStop(0, `${star.color.replace(")", `, ${star.opacity * pulseFactor})`)}`)
        glowGradient.addColorStop(0.5, `${star.color.replace(")", `, ${star.opacity * 0.5 * pulseFactor})`)}`)
        glowGradient.addColorStop(1, `${star.color.replace(")", ", 0)")}`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.glowRadius * pulseFactor, 0, Math.PI * 2)
        ctx.fill()

        // Draw star
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * pulseFactor, 0, Math.PI * 2)
        ctx.fill()

        // Draw cross spikes
        ctx.strokeStyle = star.color
        ctx.lineWidth = 1

        const spikeLength = star.radius * 4 * pulseFactor

        ctx.beginPath()
        ctx.moveTo(star.x - spikeLength, star.y)
        ctx.lineTo(star.x + spikeLength, star.y)
        ctx.moveTo(star.x, star.y - spikeLength)
        ctx.lineTo(star.x, star.y + spikeLength)
        ctx.stroke()
      })

      // Draw background stars with twinkling effect
      stars.forEach((star) => {
        // Calculate twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7

        // Draw star with higher contrast in light mode
        ctx.fillStyle = effectiveDarkMode
          ? `rgba(255, 255, 255, ${star.opacity * twinkle})`
          : `rgba(100, 120, 200, ${star.opacity * twinkle * 0.8})` // Light blue stars for light mode
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [effectiveDarkMode]) // Only re-run when dark mode changes

  return (
    <canvas
      ref={canvasRef}
      className={effectiveDarkMode ? "nebula-dark" : "nebula-light"} // Add class for debugging
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  )
}

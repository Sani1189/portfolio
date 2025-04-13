"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import Chart from "chart.js/auto"
import { cn } from "@/lib/utils"

interface SkillRadarChartProps {
  skills: {
    category: string
    data: {
      name: string
      value: number
    }[]
  }
  className?: string
  size?: number
  animated?: boolean
  render3D?: boolean
  showValues?: boolean
  showLabels?: boolean
}

export function SkillRadarChart({
  skills,
  className,
  size = 300,
  animated = true,
  render3D = false,
  showValues = false,
  showLabels = true,
}: SkillRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const { theme, resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!canvasRef.current) return

    const isDark = resolvedTheme === "dark"
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    // Get primary color from CSS variable
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()

    // Convert HSL to RGBA
    const primaryRgba = hslToRgba(`hsl(${primaryColor})`, 0.7)
    const primaryRgbaLight = hslToRgba(`hsl(${primaryColor})`, 0.2)

    // Destroy previous chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const skillNames = skills.data.map((skill) => skill.name)
    const skillValues = skills.data.map((skill) => skill.value)

    // Generate gradient colors for each data point
    const gradients = skills.data.map((_, index) => {
      const colorIndex = (index % 5) + 1
      const colorVar = getComputedStyle(document.documentElement).getPropertyValue(`--chart-${colorIndex}`).trim()
      return hslToRgba(`hsl(${colorVar})`, 0.7)
    })

    // Create a gradient background for the dataset
    const backgroundGradients = skills.data.map((_, index) => {
      const colorIndex = (index % 5) + 1
      const colorVar = getComputedStyle(document.documentElement).getPropertyValue(`--chart-${colorIndex}`).trim()
      return hslToRgba(`hsl(${colorVar})`, 0.2)
    })

    chartRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: skillNames,
        datasets: [
          {
            label: skills.category,
            data: animated && !isInView ? Array(skillValues.length).fill(0) : skillValues,
            backgroundColor: render3D ? "rgba(255, 99, 132, 0.2)" : primaryRgbaLight,
            borderColor: render3D ? "rgba(255, 99, 132, 1)" : primaryRgba,
            borderWidth: 2,
            pointBackgroundColor: gradients,
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: primaryRgba,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              display: false,
              color: textColor,
            },
            grid: {
              color: gridColor,
            },
            angleLines: {
              color: gridColor,
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 12,
                weight: "bold",
              },
              display: showLabels,
              padding: 15, // Add padding to prevent label overlap
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)",
            titleColor: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
            bodyColor: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            boxPadding: 4,
            usePointStyle: true,
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
            },
          }
        },
        elements: {
          line: {
            tension: 0.1, // Smoother lines
          },
        },
        animation: {
          duration: 1500,
          easing: "easeOutQuart",
        },
      },
    })

    // Apply 3D effect if enabled
    if (render3D && chartRef.current) {
      // Add shadow and depth effect to the chart
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Add shadow to the canvas
        context.shadowColor = isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)"
        context.shadowBlur = 15
        context.shadowOffsetX = 5
        context.shadowOffsetY = 5

        // Add a subtle gradient overlay for 3D effect
        const gradient = context.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2,
        )
        gradient.addColorStop(0, isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(1, isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)")

        // Apply the gradient
        chartRef.current.update()
      }
    }

    // Animate the chart if in view
    if (animated && isInView && chartRef.current) {
      chartRef.current.data.datasets[0].data = skillValues
      chartRef.current.update()
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [skills, theme, resolvedTheme, isInView, animated, render3D, showValues, showLabels])

  // Helper function to convert HSL to RGBA
  function hslToRgba(hsl: string, alpha: number): string {
    // Create a temporary div
    const temp = document.createElement("div")
    // Set the background color to the HSL value
    temp.style.backgroundColor = hsl
    // Append to the document
    document.body.appendChild(temp)
    // Get the computed RGB value
    const rgb = getComputedStyle(temp).backgroundColor
    // Remove the temporary div
    document.body.removeChild(temp)

    // Convert RGB to RGBA
    if (rgb.startsWith("rgb(")) {
      const rgbValues = rgb
        .slice(4, -1)
        .split(",")
        .map((x) => x.trim())
      return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`
    }

    // Fallback
    return `rgba(147, 51, 234, ${alpha})`
  }

  return (
    <div ref={ref} className={cn("relative", className)} style={{ width: size, height: size }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: -5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 30px rgba(var(--primary), 0.2)",
          rotate: [0, 1, 0, -1, 0],
          transition: {
            scale: { duration: 0.3 },
            boxShadow: { duration: 0.3 },
            rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
          },
        }}
        className="w-full h-full"
        style={{
          filter: render3D ? "drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.2))" : "none",
          transform: render3D ? "perspective(1000px) rotateX(10deg)" : "none",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s ease",
        }}
      >
        <canvas ref={canvasRef} />
      </motion.div>
    </div>
  )
}

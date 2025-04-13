"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Container, ISourceOptions } from "@tsparticles/engine"
import { useSpaceTheme } from "./theme-context"

type SpaceTheme = "galaxy" | "blackhole" | "nebula" | "stars" | "wormhole" | "timetravel"

interface SpaceBackgroundProps {
  interactive?: boolean
  density?: "low" | "medium" | "high"
}

export default function SpaceBackground({ interactive = true, density = "medium" }: SpaceBackgroundProps) {
  const [init, setInit] = useState(false)
  const { resolvedTheme, theme } = useTheme()
  const { spaceTheme, themeColors, colorScheme } = useSpaceTheme()
  const isDark = resolvedTheme === "dark"

  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  // Get particle count based on density
  const getParticleCount = useCallback(() => {
    switch (density) {
      case "low":
        return 80
      case "high":
        return 300
      case "medium":
      default:
        return 150
    }
  }, [density])

  // Get background color based on theme
  const getBackgroundColor = useCallback(() => {
    return isDark ? "#000000" : "#f8fafc"
  }, [isDark])

  // Get theme-specific colors based on color scheme
  const getThemeColors = useCallback(() => {
    // Base colors
    let colors = [themeColors.primary, themeColors.secondary, themeColors.accent]

    // Add color scheme specific colors
    if (colorScheme) {
      switch (colorScheme) {
        case "red":
          colors = [...colors, "#ff0000", "#ff3333", "#ff6666", "#ff9999"]
          break
        case "rose":
          colors = [...colors, "#ff007f", "#ff3399", "#ff66b2", "#ff99cc"]
          break
        case "orange":
          colors = [...colors, "#ff7f00", "#ff9933", "#ffb266", "#ffcc99"]
          break
        case "green":
          colors = [...colors, "#00ff00", "#33ff33", "#66ff66", "#99ff99"]
          break
        case "blue":
          colors = [...colors, "#0000ff", "#3333ff", "#6666ff", "#9999ff"]
          break
        case "yellow":
          colors = [...colors, "#ffff00", "#ffff33", "#ffff66", "#ffff99"]
          break
        case "violet":
          colors = [...colors, "#7f00ff", "#9933ff", "#b266ff", "#cc99ff"]
          break
      }
    }

    // Add light/dark specific colors
    if (isDark) {
      colors.push("#ffffff", "#cccccc", "#999999")
    } else {
      colors.push("#333333", "#666666", "#999999")
    }

    return colors
  }, [themeColors, colorScheme, isDark])

  // Get configuration based on theme
  const getConfig = useCallback((): ISourceOptions => {
    const primaryColor = themeColors.primary
    const secondaryColor = themeColors.secondary
    const accentColor = themeColors.accent
    const backgroundColor = getBackgroundColor()
    const particleCount = getParticleCount()
    const themeColorsList = getThemeColors()

    // Default configuration with enhanced professional look
    const defaultConfig = {
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      background: {
        color: backgroundColor,
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: particleCount * 0.8, // Slightly reduced for a cleaner look
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: themeColorsList,
        },
        shape: {
          type: ["circle"],
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.6, // More subtle
          random: true,
          anim: {
            enable: true,
            speed: 0.2,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 2, // Smaller particles
          random: true,
          anim: {
            enable: true,
            speed: 1,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: primaryColor,
          opacity: 0.2,
          width: 0.8, // Thinner lines
        },
        move: {
          enable: true,
          speed: 0.8, // Slower movement
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.03, // Less frequent twinkling
            opacity: 0.8,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: interactive,
            mode: "grab",
          },
          onclick: {
            enable: interactive,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 0.4,
            },
          },
          push: {
            particles_nb: 3,
          },
        },
      },
      retina_detect: true,
    }

    // Use the theme-specific configuration or fall back to the enhanced default
    switch (spaceTheme) {
      case "galaxy":
        // Keep existing galaxy config
        return {
          ...defaultConfig,
          // Galaxy-specific overrides can go here
        }
      case "blackhole":
        return {
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: backgroundColor,
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: particleCount * 1.5,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: themeColorsList,
            },
            shape: {
              type: ["circle", "triangle", "star"],
              stroke: {
                width: 0,
                color: "#000000",
              },
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: {
                min: 1,
                max: 5,
              },
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 100,
              color: primaryColor,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
                x: 50,
                y: 50,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: interactive,
                mode: "repulse",
              },
              onclick: {
                enable: interactive,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 150,
                duration: 0.4,
              },
              push: {
                particles_nb: 10,
              },
            },
          },
          retina_detect: true,
          emitters: [
            {
              position: {
                x: 50,
                y: 50,
              },
              rate: {
                quantity: 5,
                delay: 0.1,
              },
              size: {
                width: 100,
                height: 100,
              },
              particles: {
                shape: {
                  type: "circle",
                },
                color: {
                  value: themeColorsList,
                },
                move: {
                  direction: "inside",
                  outMode: "destroy",
                  speed: {
                    min: 1,
                    max: 5,
                  },
                },
                opacity: {
                  value: {
                    min: 0.3,
                    max: 0.8,
                  },
                },
                size: {
                  value: {
                    min: 1,
                    max: 5,
                  },
                },
                twinkle: {
                  particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                  },
                },
              },
            },
            {
              position: {
                x: 50,
                y: 50,
              },
              rate: {
                quantity: 2,
                delay: 0.5,
              },
              size: {
                width: 100,
                height: 100,
              },
              particles: {
                shape: {
                  type: "star",
                },
                color: {
                  value: themeColorsList,
                },
                move: {
                  direction: "inside",
                  outMode: "destroy",
                  speed: {
                    min: 2,
                    max: 6,
                  },
                },
                opacity: {
                  value: {
                    min: 0.4,
                    max: 0.9,
                  },
                },
                size: {
                  value: {
                    min: 2,
                    max: 7,
                  },
                },
              },
            },
          ],
        }

      case "nebula":
        return {
          ...defaultConfig,
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: backgroundColor,
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: particleCount,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: [
                "#ff7fbf",
                "#ff7f7f",
                "#ffbf7f",
                "#ffff7f",
                "#bfff7f",
                "#7fff7f",
                "#7fffbf",
                "#7fffff",
                "#7fbfff",
                "#7f7fff",
                "#bf7fff",
                "#ff7fff",
                ...themeColorsList,
              ],
              animation: {
                enable: true,
                speed: 20,
                sync: false,
              },
            },
            shape: {
              type: ["circle", "triangle", "polygon"],
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 6,
              },
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: {
                enable: true,
                speed: 0.3,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 6,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                size_min: 0.3,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: secondaryColor,
              opacity: 0.2,
              width: 1,
              triangles: {
                enable: true,
                opacity: 0.05,
                color: accentColor,
              },
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
              path: {
                enable: true,
                delay: {
                  value: 0.2,
                },
                options: {
                  size: 20,
                  draw: false,
                  increment: 0.001,
                },
                generator: "perlinNoise",
              },
            },
            roll: {
              enable: true,
              speed: {
                min: 5,
                max: 10,
              },
            },
            wobble: {
              enable: true,
              distance: 10,
              speed: 10,
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
              lines: {
                enable: true,
                frequency: 0.005,
                opacity: 1,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: interactive,
                mode: "bubble",
              },
              onclick: {
                enable: interactive,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 200,
                size: 12,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              connect: {
                distance: 80,
                links: {
                  opacity: 0.3,
                },
                radius: 60,
              },
              push: {
                particles_nb: 10,
              },
            },
          },
          retina_detect: true,
        }

      case "stars":
        return {
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: backgroundColor,
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: particleCount * 2,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#ffffff", "#ffff00", "#88ccff", "#ffddaa", "#aaddff", ...themeColorsList],
            },
            shape: {
              type: ["circle", "star"],
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 1,
              random: true,
              anim: {
                enable: true,
                speed: 0.1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
            },
            zIndex: {
              value: {
                min: 0,
                max: 100,
              },
              opacityRate: 0.5,
              sizeRate: 1,
              velocityRate: 1,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: interactive,
                mode: "connect",
              },
              onclick: {
                enable: interactive,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              connect: {
                distance: 80,
                links: {
                  opacity: 0.2,
                },
                radius: 100,
              },
              push: {
                particles_nb: 5,
              },
            },
          },
          retina_detect: true,
          emitters: [
            {
              direction: "none",
              rate: {
                quantity: 5,
                delay: 0.8,
              },
              position: {
                x: 50,
                y: 50,
              },
              size: {
                width: 100,
                height: 100,
              },
              particles: {
                shape: {
                  type: "star",
                },
                color: {
                  value: ["#ffffff", "#ffff99", "#aaddff", ...themeColorsList],
                },
                opacity: {
                  value: { min: 0.3, max: 0.8 },
                },
                size: {
                  value: { min: 1, max: 3 },
                },
                move: {
                  speed: 2,
                  outMode: "destroy",
                },
                twinkle: {
                  particles: {
                    enable: true,
                    frequency: 0.2,
                    opacity: 1,
                  },
                },
              },
            },
          ],
        }

      case "wormhole":
        return {
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: backgroundColor,
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: particleCount * 1.5,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: themeColorsList,
            },
            shape: {
              type: ["circle", "edge", "star"],
              stroke: {
                width: 0,
                color: "#000000",
              },
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: {
                min: 1,
                max: 5,
              },
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: secondaryColor,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 4,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              path: {
                enable: true,
                options: {
                  size: 25,
                  draw: false,
                  increment: 0.001,
                },
                generator: "perlinNoise",
              },
            },
            rotate: {
              value: 45,
              random: true,
              direction: "clockwise",
              animation: {
                enable: true,
                speed: 15,
                sync: false,
              },
            },
            wobble: {
              enable: true,
              distance: 10,
              speed: 10,
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
              lines: {
                enable: true,
                frequency: 0.005,
                opacity: 1,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: interactive,
                mode: "repulse",
              },
              onclick: {
                enable: interactive,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                particles_nb: 10,
              },
            },
          },
          retina_detect: true,
          emitters: [
            {
              position: {
                x: 50,
                y: 50,
              },
              rate: {
                quantity: 10,
                delay: 0.1,
              },
              size: {
                width: 100,
                height: 100,
              },
              particles: {
                shape: {
                  type: "circle",
                },
                color: {
                  value: themeColorsList,
                },
                opacity: {
                  value: {
                    min: 0.3,
                    max: 0.8,
                  },
                },
                size: {
                  value: {
                    min: 1,
                    max: 5,
                  },
                },
                move: {
                  speed: {
                    min: 3,
                    max: 8,
                  },
                  outMode: "destroy",
                  path: {
                    enable: true,
                    options: {
                      size: 64,
                      draw: false,
                      increment: 0.01,
                    },
                    generator: "perlinNoise",
                  },
                },
                rotate: {
                  value: {
                    min: 0,
                    max: 360,
                  },
                  animation: {
                    enable: true,
                    speed: 10,
                    sync: false,
                  },
                },
                wobble: {
                  distance: 20,
                  enable: true,
                  speed: {
                    min: -15,
                    max: 15,
                  },
                },
                twinkle: {
                  particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                  },
                },
              },
            },
            {
              position: {
                x: 50,
                y: 50,
              },
              rate: {
                quantity: 5,
                delay: 0.2,
              },
              size: {
                width: 100,
                height: 100,
              },
              particles: {
                shape: {
                  type: "star",
                },
                color: {
                  value: themeColorsList,
                },
                opacity: {
                  value: 0.7,
                },
                size: {
                  value: {
                    min: 2,
                    max: 7,
                  },
                },
                move: {
                  speed: {
                    min: 5,
                    max: 10,
                  },
                  outMode: "destroy",
                  path: {
                    enable: true,
                    options: {
                      size: 128,
                      draw: false,
                      increment: 0.005,
                    },
                    generator: "perlinNoise",
                  },
                },
                rotate: {
                  value: {
                    min: 0,
                    max: 360,
                  },
                  animation: {
                    enable: true,
                    speed: 15,
                    sync: false,
                  },
                },
              },
            },
          ],
        }

      case "timetravel":
        return {
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: backgroundColor,
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: particleCount,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: [...themeColorsList, "#c0c0c0", "#ffd700", "#ffffff"],
              animation: {
                enable: true,
                speed: 20,
                sync: false,
              },
            },
            shape: {
              type: ["circle", "triangle", "edge", "polygon", "star"],
              stroke: {
                width: 1,
                color: primaryColor,
              },
              polygon: {
                nb_sides: 12,
              },
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: {
                min: 1,
                max: 6,
              },
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: secondaryColor,
              opacity: 0.4,
              width: 1,
              triangles: {
                enable: true,
                opacity: 0.1,
              },
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              path: {
                enable: true,
                options: {
                  size: 15,
                  draw: false,
                  increment: 0.002,
                },
                generator: "perlinNoise",
              },
            },
            rotate: {
              value: {
                min: 0,
                max: 360,
              },
              direction: "random",
              animation: {
                enable: true,
                speed: 10,
                sync: false,
              },
            },
            wobble: {
              enable: true,
              distance: 15,
              speed: 8,
            },
            tilt: {
              enable: true,
              value: {
                min: -20,
                max: 20,
              },
              animation: {
                enable: true,
                speed: 5,
                sync: false,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
              lines: {
                enable: true,
                frequency: 0.005,
                opacity: 1,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: interactive,
                mode: "bubble",
              },
              onclick: {
                enable: interactive,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 200,
                size: 12,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                particles_nb: 10,
              },
            },
          },
          retina_detect: true,
          emitters: [
            {
              direction: "random",
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.1,
              },
              rate: {
                delay: 0.01,
                quantity: 2,
              },
              size: {
                width: 100,
                height: 100,
              },
              position: {
                x: 50,
                y: 50,
              },
              particles: {
                shape: {
                  type: "circle",
                },
                color: {
                  value: themeColorsList,
                },
                size: {
                  value: {
                    min: 1,
                    max: 3,
                  },
                },
                move: {
                  speed: 3,
                  outMode: "destroy",
                  straight: true,
                  path: {
                    enable: true,
                    options: {
                      size: 32,
                      draw: false,
                      increment: 0.005,
                    },
                    generator: "perlinNoise",
                  },
                },
                opacity: {
                  value: {
                    min: 0.3,
                    max: 0.8,
                  },
                  animation: {
                    enable: true,
                    speed: 0.5,
                    minimumValue: 0.1,
                    sync: false,
                  },
                },
                rotate: {
                  value: {
                    min: 0,
                    max: 360,
                  },
                  animation: {
                    enable: true,
                    speed: 10,
                    sync: false,
                  },
                },
                twinkle: {
                  particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                  },
                },
              },
            },
            {
              direction: "random",
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.1,
              },
              rate: {
                delay: 0.05,
                quantity: 2,
              },
              size: {
                width: 100,
                height: 100,
              },
              position: {
                x: 50,
                y: 50,
              },
              particles: {
                shape: {
                  type: "polygon",
                  polygon: {
                    nb_sides: 12,
                  },
                },
                color: {
                  value: themeColorsList,
                },
                opacity: {
                  value: 0.6,
                },
                size: {
                  value: {
                    min: 2,
                    max: 5,
                  },
                },
                move: {
                  speed: 2,
                  outMode: "destroy",
                  path: {
                    enable: true,
                    options: {
                      size: 64,
                      draw: false,
                      increment: 0.002,
                    },
                    generator: "perlinNoise",
                  },
                },
                rotate: {
                  value: {
                    min: 0,
                    max: 360,
                  },
                  animation: {
                    enable: true,
                    speed: 5,
                    sync: false,
                  },
                },
                twinkle: {
                  particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                  },
                },
              },
            },
            {
              direction: "random",
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.1,
              },
              rate: {
                delay: 0.1,
                quantity: 3,
              },
              size: {
                width: 100,
                height: 100,
              },
              position: {
                x: 50,
                y: 50,
              },
              particles: {
                shape: {
                  type: "star",
                },
                color: {
                  value: themeColorsList,
                },
                opacity: {
                  value: {
                    min: 0.3,
                    max: 0.8,
                  },
                },
                size: {
                  value: {
                    min: 2,
                    max: 6,
                  },
                },
                move: {
                  speed: {
                    min: 1,
                    max: 3,
                  },
                  outMode: "destroy",
                  path: {
                    enable: true,
                    options: {
                      size: 128,
                      draw: false,
                      increment: 0.005,
                    },
                    generator: "perlinNoise",
                  },
                },
                twinkle: {
                  particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                  },
                },
              },
            },
          ],
        }

      default:
        return defaultConfig
    }
  }, [spaceTheme, themeColors, getBackgroundColor, getParticleCount, interactive, isDark, colorScheme, getThemeColors])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // You can interact with the particles container here if needed
  }, [])

  if (!init) {
    return null
  }

  return <Particles id="tsparticles" options={getConfig()} particlesLoaded={particlesLoaded} />
}

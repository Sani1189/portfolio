"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, Code, Briefcase, GraduationCap, Download, Zap, Award, Sparkles } from "lucide-react"
import { GradientText, RevealText, ShimmerText } from "./text-effects"
import { Parallax } from "./section-transitions"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSpaceTheme } from "./theme-context"
import { CustomButton } from "./custom-button"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)
  const [shapes, setShapes] = useState<
    Array<{
      x: string
      y: string
      opacity: number
      scale: any
      width: number
      height: number
      background: string
    }>
  >([])
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const { themeEffects, themeColors, spaceTheme } = useSpaceTheme()

  const roles = ["Full Stack Engineer", "Software Architect", "Next.js Specialist", "UI/UX Developer", "Problem Solver"]
  const isMobile = useIsMobile()


  useEffect(() => {
    setIsVisible(true)
    setIsMounted(true)

    // Generate fewer shapes on mobile
    const shapeCount = isMobile ? 3 : 6

    // Generate consistent shapes
    const generatedShapes = Array.from({ length: shapeCount }, (_, i) => {
      // Use seeded values instead of pure random
      const seed = i * 0.1
      return {
        x: `${(Math.sin(seed * 10) * 50 + 25).toFixed(2)}%`,
        y: `${(Math.cos(seed * 15) * 50 + 25).toFixed(2)}%`,
        opacity: 0.05,
        scale: (Math.sin(seed) * 0.25 + 0.75).toFixed(2),
        width: Math.floor(100 + i * 40),
        height: Math.floor(100 + i * 35),
        background: `radial-gradient(circle, hsl(var(--primary)/${(0.03 + i * 0.01).toFixed(2)}) 0%, transparent 70%)`,
      }
    })

    setShapes(generatedShapes as any)

    // Rotate through roles
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [roles.length, isMobile])

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Get animation style based on space theme
  const getAnimationStyle = () => {
    const animStyle = themeEffects?.animationStyle || "smooth"

    switch (animStyle) {
      case "bounce":
        return { type: "spring", stiffness: 300, damping: 10 }
      case "elastic":
        return { type: "spring", stiffness: 400, damping: 8 }
      case "cosmic":
        return { type: "spring", stiffness: 200, damping: 15, velocity: 2 }
      case "distort":
        return { type: "spring", stiffness: 500, damping: 5, velocity: 3 }
      case "warp":
        return { type: "spring", stiffness: 600, damping: 3, velocity: 5 }
      case "smooth":
      default:
        return { type: "spring", stiffness: 400, damping: 17 }
    }
  }

  // Get font style based on theme
  const getFontStyle = () => {
    switch (themeEffects?.fontStyle) {
      case "futuristic":
        return "font-mono tracking-wider"
      case "cosmic":
        return "tracking-wide"
      case "elegant":
        return "font-serif tracking-wide"
      case "distorted":
        return "tracking-tight"
      case "normal":
      default:
        return ""
    }
  }

  // Get text effect class based on theme
  const getTextEffectClass = () => {
    switch (themeEffects?.textEffect) {
      case "glow":
        return "text-glow"
      case "neon":
        return "text-neon"
      case "cosmic":
        return "text-cosmic"
      case "shimmer":
        return "animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%]"
      case "void":
        return "text-void"
      case "none":
      default:
        return ""
    }
  }

  // If not mounted yet, return a simple placeholder to avoid hydration mismatch
  if (!isMounted) {
    return (
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 overflow-hidden"
      ></section>
    )
  }

  return (
    <section
      id="home"
      ref={ref}
      className={`relative flex flex-col items-center justify-center min-h-screen px-4 py-20 overflow-hidden ${getFontStyle()}`}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 backdrop-blur-3xl"
            initial={{
              x: shape.x,
              y: shape.y,
              opacity: shape.opacity,
              scale: shape.scale,
            }}
            animate={{
              x: [shape.x, `${Number.parseInt(shape.x) + 10}%`, shape.x],
              y: [shape.y, `${Number.parseInt(shape.y) + 10}%`, shape.y],
              opacity: [0.05, 0.1, 0.05],
              scale: [shape.scale, (Number.parseFloat(shape.scale) + 0.2).toFixed(2), shape.scale],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              width: shape.width,
              height: shape.height,
              filter: "blur(80px)",
              background: shape.background,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8"
      >
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left flex-1 max-w-xl relative p-6"
        >
          <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px] rounded-2xl -z-10"></div>
          {/* Animated status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, ...getAnimationStyle() }}
            whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary)/0.15)" }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <span className="text-sm font-medium text-primary">Available for new opportunities</span>
          </motion.div>

          {/* Simple greeting */}
          <div>
            <h2 className={`text-xl font-medium text-primary mb-2 ${getTextEffectClass()}`}>Hello, I'm</h2>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="relative"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 z-10 text-[hsl(var(--primary))] text-left">
                Saniul Islam Sani
              </h1>
            </motion.div>

            {/* Decorative background elements */}
            <motion.div
              className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
            >
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-primary/5"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-primary/5"></div>
            </motion.div>
          </div>

          {/* Role switcher aligned left */}
          <div className="h-10 mb-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentRole}
                className="w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <span className="block text-left text-2xl md:text-3xl font-bold leading-tight tracking-tight text-[hsl(var(--primary))]">
                  {roles[currentRole]}
                </span>
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* Professional description without background */}
          <div className="relative">
            <p className="text-lg max-w-2xl mb-8 font-medium text-foreground/90 leading-relaxed">
              <RevealText
                text="Results-driven software engineer specializing in full-stack development with expertise in creating responsive, data-driven applications that deliver exceptional user experiences and business value."
                staggerChildren={0.01}
              />
            </p>
          </div>

          {/* Enhanced CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CustomButton
                    size="lg"
                    variant="gradient"
                    glowEffect
                    animateOnHover
                    className="shadow-lg transition-all duration-300 relative overflow-hidden group"
                    style={{
                      borderColor: `hsl(var(--primary)/0.3)`,
                    }}
                    onClick={() => {
                      const contactSection = document.getElementById("contact")
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20 skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.7 }}
                    />
                    <span className="flex items-center gap-2 relative z-10">
                      <Sparkles className="w-4 h-4" />
                      Contact Me
                    </span>
                  </CustomButton>
                </TooltipTrigger>
                <TooltipContent className="bg-background/90 backdrop-blur-sm border-primary/20">
                  <p>Let's discuss your project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CustomButton
                    variant="outline"
                    size="lg"
                    animateOnHover
                    className="border-primary/20 hover:bg-primary/10 transition-all duration-300 relative overflow-hidden group"
                    style={{
                      borderColor: `hsl(var(--primary)/0.3)`,
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-primary/5"
                      initial={{ y: "-100%" }}
                      whileHover={{ y: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <a
                      href="https://drive.google.com/file/d/1BDr5cntAqSMT6bbN_rjKlw6lCCkHfb-7"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 relative z-10"
                    >
                      <Download className="w-4 h-4" />
                      Get Resume
                    </a>
                  </CustomButton>
                </TooltipTrigger>
                <TooltipContent className="bg-background/90 backdrop-blur-sm border-primary/20">
                  <p>Get my resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          {/* Enhanced stats with animations */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.div
              className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10 relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                backgroundColor: "hsl(var(--primary)/0.1)",
                borderColor: "hsl(var(--primary)/0.3)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              />
              <Zap className="w-5 h-5 text-primary mx-auto mb-1 opacity-80" />
              <h4 className="text-2xl font-bold text-primary">2+</h4>
              <p className="text-xs text-muted-foreground">Years Experience</p>
            </motion.div>

            <motion.div
              className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10 relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                backgroundColor: "hsl(var(--primary)/0.1)",
                borderColor: "hsl(var(--primary)/0.3)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
              <Code className="w-5 h-5 text-primary mx-auto mb-1 opacity-80" />
              <h4 className="text-2xl font-bold text-primary">10+</h4>
              <p className="text-xs text-muted-foreground">Projects Completed</p>
            </motion.div>

            <motion.div
              className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10 relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                backgroundColor: "hsl(var(--primary)/0.1)",
                borderColor: "hsl(var(--primary)/0.3)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              />
              <Award className="w-5 h-5 text-primary mx-auto mb-1 opacity-80" />
              <h4 className="text-2xl font-bold text-primary">200+</h4>
              <p className="text-xs text-muted-foreground">Coding Challenges</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right side - Enhanced profile image and floating elements */}
        <Parallax
          speed={0.1}
          direction="up"
          className="flex-1 flex justify-center items-center w-full px-4 py-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center"
          >
            {/* Animated orbital rings - hidden on small screens */}
            {!isMobile && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
                  style={{
                    width: "calc(100% + clamp(40px, 10vw, 60px))",
                    height: "calc(100% + clamp(40px, 10vw, 60px))",
                    top: "calc(-1 * clamp(20px, 5vw, 30px))",
                    left: "calc(-1 * clamp(20px, 5vw, 30px))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary/10"
                  style={{
                    width: "calc(100% + clamp(80px, 20vw, 120px))",
                    height: "calc(100% + clamp(80px, 20vw, 120px))",
                    top: "calc(-1 * clamp(40px, 10vw, 60px))",
                    left: "calc(-1 * clamp(40px, 10vw, 60px))",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </>
            )}

            {/* Enhanced profile image with glowing border */}
            <div
              className="relative w-[clamp(180px,45vw,240px)] h-[clamp(180px,45vw,240px)] 
                     sm:w-[clamp(200px,40vw,280px)] sm:h-[clamp(200px,40vw,280px)] 
                     md:w-[clamp(240px,35vw,320px)] md:h-[clamp(240px,35vw,320px)] 
                     rounded-full overflow-hidden border-4 border-primary/30 p-1 group"
            >
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
                  animate={{
                    background: [
                      "radial-gradient(circle, hsl(var(--primary)/0.3) 0%, transparent 70%)",
                      "radial-gradient(circle, hsl(var(--primary)/0.1) 30%, transparent 70%)",
                      "radial-gradient(circle, hsl(var(--primary)/0.3) 0%, transparent 70%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/sani.png"
                  alt="Saniul Islam Sani"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-60" />
              </div>

              {/* Animated glow effect - simplified for mobile */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      `0 0 20px 0 hsl(var(--primary)/0.3)`,
                      `0 0 30px 5px hsl(var(--primary)/0.4)`,
                      `0 0 20px 0 hsl(var(--primary)/0.3)`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </div>

            {/* Floating skill tags - adjusted positioning for responsiveness */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.8, ...getAnimationStyle() }}
              className="absolute top-[-1rem] left-[-2rem] sm:top-[-1.5rem] sm:left-[-3rem] 
                     bg-background/90 backdrop-blur-md px-2 py-1 rounded-full 
                     border border-primary/20 shadow-lg"
              whileHover={{
                scale: 1.1,
                backgroundColor: "hsl(var(--background)/0.95)",
                borderColor: "hsl(var(--primary)/0.4)",
                boxShadow: "0 0 15px hsl(var(--primary)/0.3)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">React.js</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.0, ...getAnimationStyle() }}
              className="absolute top-[25%] right-[-2rem] sm:right-[-3.5rem] 
                     bg-background/90 backdrop-blur-md px-2 py-1 rounded-full 
                     border border-primary/20 shadow-lg"
              whileHover={{
                scale: 1.1,
                backgroundColor: "hsl(var(--background)/0.95)",
                borderColor: "hsl(var(--primary)/0.4)",
                boxShadow: "0 0 15px hsl(var(--primary)/0.3)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Next.js</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, ...getAnimationStyle() }}
              className="absolute bottom-[25%] left-[-2rem] sm:left-[-3.5rem] 
                     bg-background/90 backdrop-blur-md px-2 py-1 rounded-full 
                     border border-primary/20 shadow-lg"
              whileHover={{
                scale: 1.1,
                backgroundColor: "hsl(var(--background)/0.95)",
                borderColor: "hsl(var(--primary)/0.4)",
                boxShadow: "0 0 15px hsl(var(--primary)/0.3)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ y: [0, -3, 0, 3, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Full Stack</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.4, ...getAnimationStyle() }}
              className="absolute bottom-[-1rem] right-[-1rem] sm:right-[-2rem] 
                     bg-background/90 backdrop-blur-md px-2 py-1 rounded-full 
                     border border-primary/20 shadow-lg"
              whileHover={{
                scale: 1.1,
                backgroundColor: "hsl(var(--background)/0.95)",
                borderColor: "hsl(var(--primary)/0.4)",
                boxShadow: "0 0 15px hsl(var(--primary)/0.3)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ rotate: [0, 0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Software Engineer</span>
              </div>
            </motion.div>
          </motion.div>
        </Parallax>
      </motion.div>

      {/* New scroll indicator with horizontal animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
      >
        <motion.div className="flex flex-col items-center " whileHover={{ scale: 1.1 }}>
          <span className="text-sm text-primary/80 mb-2 ">Explore More</span>
          <motion.div
            className="w-20 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary/10"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <ChevronDown
              className={`w-5 h-5 text-primary ${getTextEffectClass()}`}
              style={{
                filter: `drop-shadow(${themeColors.textGlow})`,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      {/* Additional decorative elements */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary/5 rounded-full filter blur-xl"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary/5 rounded-full filter blur-xl"
        animate={{
          opacity: [0.2, 0.3, 0.2],
          x: [0, 20, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
    </section>
  )
}

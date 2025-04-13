"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Code, Database, Layout, Lightbulb, Rocket, Server, Sparkles, Zap, ArrowRight } from "lucide-react"
import { CustomCard } from "@/components/ui/custom-card"
import { CustomButton } from "@/components/ui/custom-button"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/section-transitions"
import { GradientText, RevealText } from "@/components/text-effects"
import { useSpaceTheme } from "./theme-context"
import { AnimatedBadge } from "@/components/ui/animated-badge"

// Service interface
interface Service {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  color: string
  technologies: string[]
}

export default function Services() {
  const { themeColors } = useSpaceTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  // Services data
  const services: Service[] = [
    {
      id: "frontend",
      icon: <Layout className="w-6 h-6" />,
      title: "Frontend Development",
      description: "Creating responsive, interactive, and visually stunning user interfaces.",
      features: [
        "Responsive web design for all devices",
        "Interactive UI/UX with modern frameworks",
        "Performance optimization for fast loading",
        "Accessibility compliance",
        "Cross-browser compatibility",
      ],
      color: "#3b82f6",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "backend",
      icon: <Server className="w-6 h-6" />,
      title: "Backend Development",
      description: "Building robust, scalable server-side applications and APIs.",
      features: [
        "RESTful API development",
        "Server-side rendering",
        "Authentication & authorization",
        "Microservices architecture",
        "Performance optimization",
      ],
      color: "#10b981",
      technologies: ["Node.js", "Express", "FastAPI", "MongoDB", "PostgreSQL"],
    },
    {
      id: "database",
      icon: <Database className="w-6 h-6" />,
      title: "Database Solutions",
      description: "Designing efficient database architectures and data management systems.",
      features: [
        "Database design & modeling",
        "Query optimization",
        "Data migration strategies",
        "Backup & recovery solutions",
        "Database scaling",
      ],
      color: "#f59e0b",
      technologies: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"],
    },
    {
      id: "performance",
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Enhancing speed, efficiency, and responsiveness of web applications.",
      features: [
        "Core Web Vitals optimization",
        "Code splitting & lazy loading",
        "Bundle size reduction",
        "Caching strategies",
        "Server-side optimization",
      ],
      color: "#8b5cf6",
      technologies: ["Webpack", "Lighthouse", "Chrome DevTools", "Next.js", "Vercel Analytics"],
    },
    {
      id: "consulting",
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Technical Consulting",
      description: "Providing expert guidance on technical strategy and implementation.",
      features: [
        "Technology stack selection",
        "Architecture planning",
        "Code review & best practices",
        "Technical debt assessment",
        "Team skill development",
      ],
      color: "#ec4899",
      technologies: ["System Design", "Code Reviews", "Technical Documentation", "Mentoring", "Workshops"],
    },
    {
      id: "fullstack",
      icon: <Rocket className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "End-to-end solutions from frontend to backend and deployment.",
      features: [
        "Complete web application development",
        "API integration & development",
        "Database design & implementation",
        "Authentication & authorization",
        "Deployment & DevOps",
      ],
      color: "#ef4444",
      technologies: ["MERN Stack", "Next.js", "TypeScript", "MongoDB", "AWS/Vercel"],
    },
  ]

  // Service card component with interactive elements
  const ServiceCard = ({ service }: { service: Service }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setSelectedService(service)}
        className="cursor-pointer h-full"
      >
        <CustomCard
          variant="glass"
          className="h-full border border-primary/20 overflow-hidden relative group"
          style={{
            boxShadow: isHovered ? `0 10px 30px -5px ${service.color}30` : `0 0 20px ${service.color}20`,
            background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)`,
            transition: "all 0.3s ease",
          }}
        >
          {/* Animated corner accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full"
            style={{
              background: `radial-gradient(circle at center, ${service.color}30, transparent 70%)`,
            }}
          />

          <div className="p-6 relative z-10">
            <motion.div
              animate={{
                y: isHovered ? -5 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${service.color}20`, color: service.color }}
            >
              {service.icon}
            </motion.div>

            <h3 className="text-2xl font-bold mb-3" style={{ color: service.color }}>
              {service.title}
            </h3>
            <p className="text-muted-foreground mb-6">{service.description}</p>

            <motion.div
              animate={{
                x: isHovered ? 5 : 0,
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center text-sm font-medium"
              style={{ color: service.color }}
            >
              View Details <ArrowRight className="ml-1 w-4 h-4" />
            </motion.div>
          </div>
        </CustomCard>
      </motion.div>
    )
  }

  // Service detail modal component
  const ServiceDetailModal = () => {
    if (!selectedService) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        onClick={() => setSelectedService(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-card/95 rounded-xl border border-primary/20 shadow-2xl w-full max-w-4xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left column - Service info */}
              <div className="flex-1">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ backgroundColor: `${selectedService.color}20`, color: selectedService.color }}
                >
                  {selectedService.icon}
                  <span className="font-semibold">{selectedService.title}</span>
                </div>

                <p className="text-lg text-foreground/80 mb-6">{selectedService.description}</p>

                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: selectedService.color }}
                >
                  Key Features
                </h4>

                <ul className="space-y-3 mb-6">
                  {selectedService.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div
                        className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${selectedService.color}20`, color: selectedService.color }}
                      >
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="text-foreground/90">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <CustomButton
                  variant="gradient"
                  size="lg"
                  glowEffect
                  className="mt-4"
                  onClick={() => {
                    setSelectedService(null)
                    const contactSection = document.getElementById("contact")
                    contactSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Request Service <ArrowRight className="ml-2 w-4 h-4" />
                </CustomButton>
              </div>

              {/* Right column - Technologies */}
              <div className="md:w-1/3">
                <div
                  className="rounded-xl p-6 h-full"
                  style={{
                    backgroundColor: `${selectedService.color}10`,
                    border: `1px solid ${selectedService.color}30`,
                  }}
                >
                  <h4
                    className="text-sm font-semibold uppercase tracking-wider mb-4"
                    style={{ color: selectedService.color }}
                  >
                    Technologies
                  </h4>

                  <div className="space-y-3">
                    {selectedService.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      >
                        <AnimatedBadge
                          variant="outline"
                          className="w-full justify-start py-2 px-3"
                          style={{
                            borderColor: `${selectedService.color}30`,
                            color: selectedService.color,
                          }}
                        >
                          {tech}
                        </AnimatedBadge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Service process component
  const ServiceProcess = () => {
    const steps = [
      {
        number: "01",
        title: "Discovery",
        description: "Understanding your requirements, goals, and vision",
        icon: <Lightbulb className="w-5 h-5" />,
      },
      {
        number: "02",
        title: "Planning",
        description: "Creating a detailed roadmap and technical strategy",
        icon: <Code className="w-5 h-5" />,
      },
      {
        number: "03",
        title: "Development",
        description: "Building your solution with regular updates and feedback",
        icon: <Zap className="w-5 h-5" />,
      },
      {
        number: "04",
        title: "Delivery",
        description: "Launching your project and providing ongoing assistance",
        icon: <Rocket className="w-5 h-5" />,
      },
    ]

    return (
      <div className="mt-20">
        <h3 className="text-2xl font-bold text-center mb-10">
          <GradientText text="My Service Process" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-1/2 w-full h-0.5 bg-primary/20 hidden md:block" />
              )}

              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-24 h-24 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 relative"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                    className="absolute inset-0 rounded-xl border border-primary/40"
                  />
                  <span className="text-3xl font-bold text-primary">{step.number}</span>
                </motion.div>

                <h4 className="text-xl font-semibold mb-2 text-primary">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section id="services" ref={sectionRef} className="relative py-20 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: "hsl(var(--primary))",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl z-10 relative">
        <FadeIn direction="up" duration={0.8}>
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                <GradientText text="Professional Services" animate={true} from="hsl(var(--primary))" to="#ffffff" />
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <RevealText text="Specialized expertise to transform your ideas into exceptional digital experiences. Each service is crafted with precision, innovation, and attention to detail." />
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerAmount={0.1}>
          {services.map((service, index) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Service process */}
        <ServiceProcess />

        {/* Service detail modal */}
        <AnimatePresence>{selectedService && <ServiceDetailModal />}</AnimatePresence>
      </div>
    </section>
  )
}

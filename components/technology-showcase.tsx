"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CustomCard } from "@/components/ui/custom-card"
import { FadeIn } from "@/components/section-transitions"
import TextAnimation from "@/components/text-animation"
import { Badge } from "@/components/ui/badge"
import { Code2, Cpu, Database, Layers, Layout, Palette, Server, Sparkles, Zap } from "lucide-react"

// Technology categories with their respective technologies
const technologies = {
  "Frontend Framework": {
    icon: <Layout className="h-5 w-5" />,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    items: [
      { name: "Next.js", description: "React framework for production" },
      { name: "React", description: "JavaScript library for user interfaces" },
    ],
  },
  "UI & Styling": {
    icon: <Palette className="h-5 w-5" />,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    items: [
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "shadcn/ui", description: "Reusable component library" },
      { name: "CSS Modules", description: "Scoped CSS styling" },
    ],
  },
  "Animation & Effects": {
    icon: <Sparkles className="h-5 w-5" />,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    items: [
      { name: "Framer Motion", description: "Production-ready animation library" },
      { name: "Three.js", description: "3D graphics in the browser" },
      { name: "GSAP", description: "Professional-grade animation" },
    ],
  },
  "State Management": {
    icon: <Cpu className="h-5 w-5" />,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    items: [
      { name: "React Context", description: "Built-in state management" },
      { name: "useState/useReducer", description: "React hooks for local state" },
    ],
  },
  Performance: {
    icon: <Zap className="h-5 w-5" />,
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    items: [
      { name: "Next.js Image", description: "Optimized image loading" },
      { name: "Code Splitting", description: "Automatic bundle splitting" },
      { name: "Incremental Static Regeneration", description: "Dynamic content with static performance" },
    ],
  },
  "Development Tools": {
    icon: <Code2 className="h-5 w-5" />,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    items: [
      { name: "TypeScript", description: "Typed JavaScript" },
      { name: "ESLint", description: "JavaScript linting utility" },
      { name: "Prettier", description: "Code formatter" },
    ],
  },
  "Backend & API": {
    icon: <Server className="h-5 w-5" />,
    color: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    items: [
      { name: "Next.js API Routes", description: "Serverless API endpoints" },
      { name: "Vercel", description: "Deployment and hosting platform" },
    ],
  },
  "Data Visualization": {
    icon: <Database className="h-5 w-5" />,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    items: [
      { name: "D3.js", description: "Data visualization library" },
      { name: "Chart.js", description: "Simple yet flexible charts" },
      { name: "ApexCharts", description: "Modern charting library" },
    ],
  },
}

export default function TechnologyShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <section id="technologies" className="py-20 relative">
      <div className="container px-4 md:px-6">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <TextAnimation text="Technologies & Tools" className="text-3xl md:text-4xl font-bold mb-4" type="elegant" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated collection of modern technologies and tools that power this portfolio website, showcasing the
              perfect blend of performance, aesthetics, and functionality.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(technologies).map(([category, { icon, color }], index) => (
            <FadeIn key={category} direction="up" delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ y: 0 }}
                className={`cursor-pointer rounded-xl border ${
                  selectedCategory === category
                    ? "border-primary/50 bg-primary/5 shadow-lg"
                    : "border-border/50 bg-card/50 hover:bg-card/80"
                } transition-all duration-300`}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-md ${color}`}>{icon}</div>
                    <h3 className="font-semibold">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {technologies[category].items.map((tech) => (
                      <Badge
                        key={tech.name}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="bg-background/50 hover:bg-background transition-colors"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <AnimatePresence>
          {selectedCategory && (
            <FadeIn direction="up">
              <CustomCard variant="glass" hoverEffect="glow" className="overflow-hidden border border-primary/20">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-md ${technologies[selectedCategory].color}`}>
                      {technologies[selectedCategory].icon}
                    </div>
                    <h3 className="text-xl font-semibold">{selectedCategory}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {technologies[selectedCategory].items.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                        onMouseEnter={() => setHoveredTech(tech.name)}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        <div
                          className={`p-4 rounded-lg border ${
                            hoveredTech === tech.name ? "border-primary/50 bg-primary/5" : "border-border/50 bg-card/30"
                          } transition-all duration-300 h-full`}
                        >
                          <div className="flex flex-col h-full">
                            <h4 className="font-medium mb-2">{tech.name}</h4>
                            <p className="text-sm text-muted-foreground">{tech.description}</p>

                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: hoveredTech === tech.name ? "100%" : "0%" }}
                              transition={{ duration: 0.3 }}
                              className="h-0.5 bg-primary/50 mt-auto pt-0 self-start"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CustomCard>
            </FadeIn>
          )}
        </AnimatePresence>

        <FadeIn direction="up" className="mt-12">
          <div className="relative p-6 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm">
            <div className="absolute -top-3 left-4">
              <Badge className="bg-background border-primary/30 text-foreground px-3 py-1">
                <Layers className="w-3.5 h-3.5 mr-1.5" />
                Architecture
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
              <div className="space-y-2">
                <h4 className="font-medium">Frontend Layer</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    React Components
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Next.js Pages & App Router
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Tailwind CSS Styling
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Framer Motion Animations
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Application Layer</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    React Context API
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Custom Hooks
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    TypeScript Type System
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Data Visualization
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Infrastructure Layer</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Vercel Hosting
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Next.js API Routes
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Static Site Generation
                  </li>
                  <li className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Edge Functions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

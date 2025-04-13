"use client"

import type React from "react"

import { useState } from "react"
import { CustomCard } from "@/components/ui/custom-card"
import { FadeIn } from "@/components/section-transitions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  ChevronRight,
  Cpu,
  ExternalLink,
  GitBranch,
  Layout,
  Server,
  Database,
  Code,
  Globe,
  FileJson,
  Layers,
  Box,
  Workflow,
  BarChart,
  FileType,
  Braces,
  Blocks,
  Puzzle,
} from "lucide-react"
import { skillData, getTechColor } from "./skills-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

export function ProjectsSkills() {
  // Create a matrix of projects and skills
  const allTechnologies = new Set<string>()
  skillData.projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      allTechnologies.add(tech)
    })
  })

  const sortedTechnologies = Array.from(allTechnologies).sort()

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {/* Project Cards */}
        <FadeIn direction="up" duration={0.5}>
          {" "}
          {/* Reduced duration */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <span>Project Portfolio</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skillData.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </CustomCard>
        </FadeIn>

        {/* Skills Matrix - Enhanced version */}
        <FadeIn direction="up" delay={0.1} duration={0.5}>
          {" "}
          {/* Reduced duration and delay */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <GitBranch className="w-4 h-4 text-primary" />
                </div>
                <span>Skills Matrix</span>
              </div>
            }
          >
            <EnhancedSkillsMatrix projects={skillData.projects} technologies={sortedTechnologies} />
          </CustomCard>
        </FadeIn>

        {/* Technology Ecosystem */}
        <FadeIn direction="up" delay={0.15} duration={0.5}>
          {" "}
          {/* Reduced duration and delay */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Cpu className="w-4 h-4 text-primary" />
                </div>
                <span>Technology Ecosystem</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TechStackCard
                title="Frontend Stack"
                icon={<Layout className="w-4 h-4 text-primary" />}
                items={[
                  "Next.js + React for component-based UI",
                  "Tailwind CSS for responsive styling",
                  "Chart.js & ApexCharts for data visualization",
                ]}
              />
              <TechStackCard
                title="Backend Stack"
                icon={<Server className="w-4 h-4 text-primary" />}
                items={[
                  "FastAPI for high-performance Python APIs",
                  "Node.js for JavaScript server environments",
                  "RESTful API design principles",
                ]}
              />
              <TechStackCard
                title="Data Stack"
                icon={<Database className="w-4 h-4 text-primary" />}
                items={[
                  "MongoDB for NoSQL document storage",
                  "MySQL for relational database needs",
                  "Data modeling and optimization techniques",
                ]}
              />
            </div>
          </CustomCard>
        </FadeIn>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: {
    name: string
    technologies: string[]
    type: string
  }
}

// Add animations to project cards with reduced animation duration
function ProjectCard({ project }: ProjectCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const displayTechs = project.technologies.slice(0, 4)
  const hiddenTechs = project.technologies.slice(4)

  return (
    <motion.div
      whileHover={{
        y: -3, // Reduced hover effect
        boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.2)",
        borderColor: "rgba(var(--primary), 0.3)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.2 }} // Faster animation
      className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/10 transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">{project.name}</h3>
        <Badge>{project.type}</Badge>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {displayTechs.map((tech, index) => (
          <motion.div
            key={`${project.name}-${tech}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }} // Faster animation, reduced delay
          >
            <Badge variant="outline" className={getTechColor(tech)}>
              {tech}
            </Badge>
          </motion.div>
        ))}
        {hiddenTechs.length > 0 && (
          <TooltipProvider>
            <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                  {" "}
                  {/* Faster animation */}
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setShowTooltip(true)}
                  >
                    +{hiddenTechs.length} more
                  </Badge>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-1">
                  {hiddenTechs.map((tech, index) => (
                    <div key={index} className="py-1">
                      {tech}
                    </div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        {project.name === "Travel and Tourism System" &&
          "A comprehensive travel booking and management system with user authentication."}
        {project.name === "The Daily SunRise" &&
          "Modern online newspaper with dynamic content management and responsive design."}
        {project.name === "SMAQ Dashboards" &&
          "Enterprise analytics platform with interactive dashboards and data visualizations."}
      </p>
    </motion.div>
  )
}

interface EnhancedSkillsMatrixProps {
  projects: {
    name: string
    technologies: string[]
  }[]
  technologies: string[]
}

// Add animations to the skills matrix table with reduced animation duration
function EnhancedSkillsMatrix({ projects, technologies }: EnhancedSkillsMatrixProps) {
  // Map technologies to appropriate icons
  const getTechIcon = (tech: string) => {
    switch (tech.toLowerCase()) {
      case "react":
        return <Code className="w-4 h-4" />
      case "javascript":
        return <Braces className="w-4 h-4" />
      case "typescript":
        return <FileType className="w-4 h-4" />
      case "html":
        return <Globe className="w-4 h-4" />
      case "css":
        return <Layout className="w-4 h-4" />
      case "node.js":
        return <Server className="w-4 h-4" />
      case "express":
        return <Box className="w-4 h-4" />
      case "mongodb":
        return <Database className="w-4 h-4" />
      case "mysql":
        return <Database className="w-4 h-4" />
      case "tailwind":
        return <Layers className="w-4 h-4" />
      case "next.js":
        return <Workflow className="w-4 h-4" />
      case "chart.js":
        return <BarChart className="w-4 h-4" />
      case "json":
        return <FileJson className="w-4 h-4" />
      case "api":
        return <Blocks className="w-4 h-4" />
      default:
        return <Puzzle className="w-4 h-4" />
    }
  }

  return (
    <div className="p-2 overflow-x-auto">
      {/* Scrollable table with fixed header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} // Faster animation
        className="overflow-x-auto"
      >
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-background z-10">
            <tr>
              <motion.th
                initial={{ opacity: 0, x: -10 }} // Reduced animation distance
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }} // Faster animation
                className="py-3 px-2 md:px-4 text-left font-medium text-primary border-b border-primary/20 w-[180px]"
              >
                Projects / Technologies
              </motion.th>
              {technologies.map((tech, index) => (
                <motion.th
                  key={tech}
                  initial={{ opacity: 0, y: -10 }} // Reduced animation distance
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.03 * index }} // Faster animation, reduced delay
                  className="py-3 px-2 md:px-4 text-center font-medium border-b border-primary/20 min-w-[120px]"
                >
                  <motion.div
                    whileHover={{ y: -2, scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-2"
                  >
                    {" "}
                    {/* Faster animation */}
                    <motion.div
                      whileHover={{
                        boxShadow: "0 0 10px rgba(var(--primary), 0.3)",
                      }}
                      transition={{ duration: 0.2 }} // Faster animation
                      className={`w-8 h-8 rounded-md ${getTechColor(tech)} flex items-center justify-center`}
                    >
                      {getTechIcon(tech)}
                    </motion.div>
                    <span className="text-xs whitespace-nowrap">{tech}</span>
                  </motion.div>
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <motion.tr
                key={project.name}
                initial={{ opacity: 0, x: -10 }} // Reduced animation distance
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }} // Faster animation, reduced delay
                whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                className={index % 2 === 0 ? "bg-card/30" : "bg-transparent"}
              >
                <td className="py-3 md:py-4 px-2 md:px-4 border-b border-primary/10">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="font-medium">{project.name}</span>
                  </div>
                </td>
                {technologies.map((tech, techIndex) => {
                  const hasSkill = project.technologies.includes(tech)
                  return (
                    <td
                      key={`${project.name}-${tech}`}
                      className="py-3 md:py-4 px-2 md:px-4 text-center border-b border-primary/10"
                    >
                      <div className="flex justify-center">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                            delay: 0.05 * index + 0.01 * techIndex, // Reduced delay
                          }}
                          whileHover={{
                            scale: 1.1, // Reduced scale effect
                            boxShadow: hasSkill ? "0 0 10px rgba(var(--primary), 0.5)" : "none",
                          }}
                          className={`w-8 h-8 rounded-md flex items-center justify-center ${
                            hasSkill ? "bg-primary text-primary-foreground" : "bg-muted/20 text-muted-foreground"
                          }`}
                        >
                          {hasSkill ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span>—</span>
                          )}
                        </motion.div>
                      </div>
                    </td>
                  )
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

interface TechStackCardProps {
  title: string
  icon: React.ReactNode
  items: string[]
}

// Add animations to tech stack cards with reduced animation duration
function TechStackCard({ title, icon, items }: TechStackCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -3, // Reduced hover effect
        boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.2)",
        borderColor: "rgba(var(--primary), 0.3)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.2 }} // Faster animation
      className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/10"
    >
      <motion.h3
        initial={{ opacity: 0, x: -5 }} // Reduced animation distance
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }} // Faster animation
        className="font-medium mb-3 flex items-center gap-2"
      >
        <motion.div
          animate={{
            rotate: [0, 5, 0, -5, 0], // Reduced rotation
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }} // Slower rotation animation
        >
          {icon}
        </motion.div>
        <span>{title}</span>
      </motion.h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }} // Reduced animation distance
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }} // Faster animation, reduced delay
            whileHover={{ x: 3, color: "hsl(var(--primary))" }} // Reduced hover effect
            className="flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 text-primary" />
            <span className="text-sm">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

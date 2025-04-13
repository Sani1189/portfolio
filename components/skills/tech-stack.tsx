"use client"

import { useState } from "react"
import { CustomCard } from "@/components/ui/custom-card"
import { FadeIn } from "@/components/section-transitions"
import { ProgressRing } from "@/components/ui/progress-ring"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Code, Database, Layout, Layers, Server, Star, Terminal } from "lucide-react"
import { skillData, getTechColor, getTechIcon } from "./skills-utils"
import { motion } from "framer-motion"

export function TechStack() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  // Find projects that use the selected technology
  const projectsUsingTech = selectedTech
    ? skillData.projects.filter((project) => project.technologies.includes(selectedTech))
    : []

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(skillData.techStack).map(([category, technologies], index) => (
          <FadeIn key={category} direction="up" delay={index * 0.1}>
            <CustomCard
              variant="glass"
              hoverEffect="glow"
              title={
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    {category === "Frontend" ? (
                      <Layout className="w-4 h-4 text-primary" />
                    ) : category === "Backend" ? (
                      <Server className="w-4 h-4 text-primary" />
                    ) : category === "Database" ? (
                      <Database className="w-4 h-4 text-primary" />
                    ) : category === "Languages" ? (
                      <Code className="w-4 h-4 text-primary" />
                    ) : category === "Tools" ? (
                      <Terminal className="w-4 h-4 text-primary" />
                    ) : category === "RemoteWork" ? (
                      <Briefcase className="w-4 h-4 text-primary" />
                    ) : (
                      <Layers className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span>{category}</span>
                </div>
              }
            >
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    key={tech}
                    className={`px-4 py-2 rounded-lg ${getTechColor(tech)} flex items-center gap-2 cursor-pointer transition-all duration-300 ${selectedTech === tech ? "ring-2 ring-primary/50 shadow-lg" : ""}`}
                    onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                  >
                    {getTechIcon(tech)}
                    <span className="font-medium">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </CustomCard>
          </FadeIn>
        ))}
      </div>

      {selectedTech && (
        <FadeIn direction="up" className="mt-6">
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <span>Projects Using {selectedTech}</span>
              </div>
            }
          >
            {projectsUsingTech.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {projectsUsingTech.map((project) => (
                  <motion.div
                    whileHover={{
                      boxShadow: "0 0 20px rgba(var(--primary), 0.2)",
                      y: -5,
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/50 rounded-lg p-4 border border-primary/10 hover:border-primary/30 transition-colors"
                    key={project.name}
                  >
                    <h3 className="font-medium mb-2">{project.name}</h3>
                    <Badge className="mb-2">{project.type}</Badge>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={`${project.name}-${tech}`}
                          variant="outline"
                          className={`${tech === selectedTech ? "bg-primary/20 border-primary/40" : "bg-card/50"}`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">No projects found using {selectedTech}</div>
            )}
          </CustomCard>
        </FadeIn>
      )}

      <FadeIn direction="up" className="mt-6">
        <CustomCard
          variant="glass"
          hoverEffect="glow"
          title={
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span>Technology Proficiency</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ProficiencyCard title="Frontend" value={90} technologies="HTML, CSS, JavaScript, React, Next.js" />
            <ProficiencyCard title="Backend" value={75} technologies="Node.js, FastAPI, PHP" />
            <ProficiencyCard title="Database" value={80} technologies="MySQL, MongoDB" />
            <ProficiencyCard title="Problem Solving" value={85} technologies="Algorithms, Data Structures" />
          </div>
        </CustomCard>
      </FadeIn>
    </div>
  )
}

interface ProficiencyCardProps {
  title: string
  value: number
  technologies: string
}

function ProficiencyCard({ title, value, technologies }: ProficiencyCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex flex-col items-center justify-center p-4 bg-card/50 rounded-lg border border-primary/10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProgressRing value={value} size={100} label={title} />
      </motion.div>
      <p className="mt-3 text-sm text-muted-foreground">{technologies}</p>
    </motion.div>
  )
}

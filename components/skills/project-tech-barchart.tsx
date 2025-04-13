"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts"

interface ProjectTechBarChartProps {
  projects: {
    name: string
    technologies: string[]
  }[]
}

export function ProjectTechBarChart({ projects }: ProjectTechBarChartProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Determine which project to display - prioritize selected (clicked) over hovered
  const displayedProject = selectedProject || hoveredProject

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] bg-muted/20 animate-pulse rounded-lg"></div>
  }

  const isDark = resolvedTheme === "dark"
  const textColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
  const gridColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"

  // Define 3 distinct, colorful colors for the bars
  const barColors = [
    "#FF5733", // Bright orange-red
    "#33A1FF", // Bright blue
    "#33FF57", // Bright green
  ]

  // Format data for the chart with specific colors for each bar
  const chartData = projects.map((project, index) => ({
    name: project.name, // Use full project name
    technologies: project.technologies.length,
    tooltip: project.technologies.join(", "),
    fill: barColors[index % barColors.length], // Assign one of the three colors
  }))

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload

      return (
        <div className="bg-background/90 border border-primary/20 p-3 rounded-md shadow-lg max-w-xs">
          <p className="font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm mb-2">
            <span className="font-medium">Technologies:</span> <span className="text-primary">{data.technologies}</span>
          </p>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">List:</span> {data.tooltip}
          </div>
        </div>
      )
    }
    return null
  }

  const handleBarClick = (data: any) => {
    // If clicking the already selected project, deselect it
    if (selectedProject === data.name) {
      setSelectedProject(null)
    } else {
      // Otherwise select the clicked project
      setSelectedProject(data.name)
    }
    // Clear any hover state when clicking
    setHoveredProject(null)
  }

  // Handle mouse events for hover effect
  const handleMouseEnter = (data: any) => {
    setHoveredProject(data.name)
  }

  const handleMouseLeave = () => {
    setHoveredProject(null)
  }

  return (
    <div className="flex flex-col space-y-6" ref={containerRef}>
      {/* Bar Chart - now above the details panel */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="name"
              stroke={textColor}
              tick={{ fontSize: 10 }}
              tickLine={{ stroke: gridColor }}
              axisLine={{ stroke: gridColor }}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={80}
            />
            <YAxis
              stroke={textColor}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: gridColor }}
              axisLine={{ stroke: gridColor }}
              label={{
                value: "Number of Technologies",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: textColor, fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="technologies"
              name="Technologies"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={2000}
              animationEasing="ease-in-out"
              barSize={40}
              onClick={handleBarClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              cursor="pointer"
            >
              <LabelList
                dataKey="technologies"
                position="top"
                fill={textColor}
                formatter={(value: any) => value}
                style={{ fontWeight: "bold", fontSize: 12 }}
                offset={5}
              />
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke={
                    selectedProject === entry.name || hoveredProject === entry.name
                      ? "hsl(var(--primary))"
                      : "transparent"
                  }
                  strokeWidth={selectedProject === entry.name || hoveredProject === entry.name ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Instructions */}
      {!displayedProject && (
        <div className="text-center text-xs text-muted-foreground">Hover or click on bars to view project details.</div>
      )}

      {/* Selected/Hovered Project Details - now below the graph */}
      <AnimatePresence mode="wait">
        {displayedProject && (
          <motion.div
            key={displayedProject}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: hoveredProject ? 0.2 : 0.3,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-card/50 rounded-lg border border-primary/20 max-w-3xl mx-auto">
              <h3 className="text-lg font-medium mb-3">{displayedProject}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Technologies ({projects.find((p) => p.name === displayedProject)?.technologies.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {projects
                      .find((p) => p.name === displayedProject)
                      ?.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-primary/10">
                          {tech}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Technology Categories</h4>
                  <div className="space-y-2">
                    {/* Frontend */}
                    {projects
                      .find((p) => p.name === displayedProject)
                      ?.technologies.some((t) =>
                        [
                          "React",
                          "Next.js",
                          "HTML",
                          "CSS",
                          "JavaScript",
                          "Tailwind CSS",
                          "Bootstrap",
                          "Material UI",
                        ].includes(t),
                      ) && (
                      <div>
                        <span className="text-sm">Frontend: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {projects
                            .find((p) => p.name === displayedProject)
                            ?.technologies.filter((t) =>
                              [
                                "React",
                                "Next.js",
                                "HTML",
                                "CSS",
                                "JavaScript",
                                "Tailwind CSS",
                                "Bootstrap",
                                "Material UI",
                              ].includes(t),
                            )
                            .map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Backend */}
                    {projects
                      .find((p) => p.name === displayedProject)
                      ?.technologies.some((t) => ["PHP", "Node.js", "FastAPI", "React Query"].includes(t)) && (
                      <div>
                        <span className="text-sm">Backend: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {projects
                            .find((p) => p.name === displayedProject)
                            ?.technologies.filter((t) => ["PHP", "Node.js", "FastAPI", "React Query"].includes(t))
                            .map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="bg-green-500/10 text-green-500 border-green-500/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Database */}
                    {projects
                      .find((p) => p.name === displayedProject)
                      ?.technologies.some((t) => ["MySQL", "MongoDB"].includes(t)) && (
                      <div>
                        <span className="text-sm">Database: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {projects
                            .find((p) => p.name === displayedProject)
                            ?.technologies.filter((t) => ["MySQL", "MongoDB"].includes(t))
                            .map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="bg-orange-500/10 text-orange-500 border-orange-500/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Visualization */}
                    {projects
                      .find((p) => p.name === displayedProject)
                      ?.technologies.some((t) => ["ApexCharts", "Chart.js"].includes(t)) && (
                      <div>
                        <span className="text-sm">Visualization: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {projects
                            .find((p) => p.name === displayedProject)
                            ?.technologies.filter((t) => ["ApexCharts", "Chart.js"].includes(t))
                            .map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="bg-purple-500/10 text-purple-500 border-purple-500/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

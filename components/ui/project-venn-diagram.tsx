"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Project {
  name: string
  technologies: string[]
  type?: string
}

interface VennDiagramProps {
  projects: Project[]
}

export function ProjectVennDiagram({ projects }: VennDiagramProps) {
  const { resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [mounted, setMounted] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [hoveredIntersection, setHoveredIntersection] = useState<string[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setMounted(true)
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      })
    }

    const handleResize = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.clientWidth,
          height: ref.current.clientHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return <div ref={ref} className="w-full h-full" />

  const isDark = resolvedTheme === "dark"

  // Limit to 3 projects for the Venn diagram
  const displayProjects = projects.slice(0, 3)

  // Calculate shared technologies between projects
  const getSharedTechnologies = (projectA: Project, projectB: Project) => {
    return projectA.technologies.filter((tech) => projectB.technologies.includes(tech))
  }

  const getSharedTechnologiesBetweenAll = () => {
    if (displayProjects.length < 3) return []

    return displayProjects[0].technologies.filter(
      (tech) => displayProjects[1].technologies.includes(tech) && displayProjects[2].technologies.includes(tech),
    )
  }

  // Calculate unique technologies for each project
  const getUniqueTechnologies = (project: Project, otherProjects: Project[]) => {
    return project.technologies.filter(
      (tech) => !otherProjects.some((p) => p.name !== project.name && p.technologies.includes(tech)),
    )
  }

  // Circle positions and sizes
  const circleRadius = Math.min(dimensions.width, dimensions.height) * 0.22
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  // Calculate positions for each circle
  const getCirclePosition = (index: number, total: number) => {
    if (total === 1) return { x: centerX, y: centerY }

    if (total === 2) {
      const offset = circleRadius * 0.7
      return index === 0 ? { x: centerX - offset, y: centerY } : { x: centerX + offset, y: centerY }
    }

    // For 3 circles, position in a triangle
    const angle = ((2 * Math.PI) / 3) * index - Math.PI / 2
    const distance = circleRadius * 0.8
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle),
    }
  }

  // Colors for each project
  const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

  // Generate project circles
  const projectCircles = displayProjects.map((project, index) => {
    const position = getCirclePosition(index, displayProjects.length)
    const uniqueTechs = getUniqueTechnologies(
      project,
      displayProjects.filter((p) => p.name !== project.name),
    )

    return (
      <TooltipProvider key={project.name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.circle
              cx={position.x}
              cy={position.y}
              r={circleRadius}
              initial={{ r: 0, opacity: 0 }}
              animate={isInView ? { r: circleRadius, opacity: 0.7 } : { r: 0, opacity: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.3,
                type: "spring",
                stiffness: 100,
              }}
              fill={colors[index]}
              fillOpacity={hoveredProject === project.name ? 0.9 : 0.7}
              stroke={hoveredProject === project.name ? "hsl(var(--primary))" : "transparent"}
              strokeWidth={2}
              onMouseEnter={() => setHoveredProject(project.name)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ cursor: "pointer" }}
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="p-2">
              <h4 className="font-medium mb-1">{project.name}</h4>
              <p className="text-sm mb-2">
                <span className="font-medium">Total Technologies:</span> {project.technologies.length}
              </p>
              {uniqueTechs.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium">Unique Technologies:</span> {uniqueTechs.join(", ")}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  })

  // Add project labels
  const projectLabels = displayProjects.map((project, index) => {
    const position = getCirclePosition(index, displayProjects.length)

    return (
      <motion.text
        key={`label-${project.name}`}
        x={position.x}
        y={position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isDark ? "white" : "black"}
        fontWeight="bold"
        fontSize="14"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
      >
        {project.name.split(" ")[0]}
      </motion.text>
    )
  })

  // Add intersection labels for shared technologies
  const intersectionLabels = []

  if (displayProjects.length >= 2) {
    // For each pair of projects
    for (let i = 0; i < displayProjects.length - 1; i++) {
      for (let j = i + 1; j < displayProjects.length; j++) {
        const shared = getSharedTechnologies(displayProjects[i], displayProjects[j])

        if (shared.length > 0) {
          const pos1 = getCirclePosition(i, displayProjects.length)
          const pos2 = getCirclePosition(j, displayProjects.length)

          // Position label between the two circles
          const labelX = (pos1.x + pos2.x) / 2
          const labelY = (pos1.y + pos2.y) / 2

          intersectionLabels.push(
            <TooltipProvider key={`intersection-${i}-${j}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.circle
                    cx={labelX}
                    cy={labelY}
                    r={20}
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    onMouseEnter={() => setHoveredIntersection([displayProjects[i].name, displayProjects[j].name])}
                    onMouseLeave={() => setHoveredIntersection([])}
                    style={{ cursor: "pointer" }}
                  />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="p-2">
                    <h4 className="font-medium mb-1">Shared Technologies</h4>
                    <p className="text-sm">
                      <span className="font-medium">Between:</span> {displayProjects[i].name} &{" "}
                      {displayProjects[j].name}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Technologies:</span> {shared.join(", ")}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>,
          )

          intersectionLabels.push(
            <motion.text
              key={`intersection-label-${i}-${j}`}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isDark ? "white" : "black"}
              fontWeight="bold"
              fontSize="12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              {shared.length}
            </motion.text>,
          )
        }
      }
    }
  }

  // Add center intersection for all three projects if applicable
  if (displayProjects.length === 3) {
    const sharedAll = getSharedTechnologiesBetweenAll()

    if (sharedAll.length > 0) {
      intersectionLabels.push(
        <TooltipProvider key="intersection-all">
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={25}
                fill="hsl(var(--primary))"
                fillOpacity={0.5}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                style={{ cursor: "pointer" }}
              />
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="p-2">
                <h4 className="font-medium mb-1">Common Technologies</h4>
                <p className="text-sm">
                  <span className="font-medium">Shared across all projects:</span> {sharedAll.join(", ")}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>,
      )

      intersectionLabels.push(
        <motion.text
          key="intersection-all-label"
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isDark ? "white" : "black"}
          fontWeight="bold"
          fontSize="14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          {sharedAll.length}
        </motion.text>,
      )
    }
  }

  // Add legend
  const legend = (
    <motion.g
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.2 }}
    >
      {displayProjects.map((project, index) => (
        <g key={`legend-${index}`} transform={`translate(${dimensions.width - 150}, ${20 + index * 25})`}>
          <rect width="15" height="15" fill={colors[index]} rx="2" />
          <text x="20" y="12" fontSize="12" fill={isDark ? "white" : "black"}>
            {project.name}
          </text>
        </g>
      ))}
    </motion.g>
  )

  // Add decorative elements
  const decorations = (
    <motion.g
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      {/* Decorative connecting lines */}
      {displayProjects.length >= 2 &&
        displayProjects.map((_, i) => {
          if (i === displayProjects.length - 1) return null

          const pos1 = getCirclePosition(i, displayProjects.length)
          const pos2 = getCirclePosition(i + 1, displayProjects.length)

          return (
            <motion.line
              key={`line-${i}`}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeDasharray="5,5"
              strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
            />
          )
        })}

      {/* Connect last to first for 3 projects */}
      {displayProjects.length === 3 && (
        <motion.line
          key="line-last"
          x1={getCirclePosition(2, 3).x}
          y1={getCirclePosition(2, 3).y}
          x2={getCirclePosition(0, 3).x}
          y2={getCirclePosition(0, 3).y}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="5,5"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 1.6 }}
        />
      )}

      {/* Decorative particles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * circleRadius * 2

        return (
          <motion.circle
            key={`particle-${i}`}
            cx={centerX + Math.cos(angle) * distance}
            cy={centerY + Math.sin(angle) * distance}
            r={Math.random() * 3 + 1}
            fill="hsl(var(--primary))"
            fillOpacity={Math.random() * 0.5 + 0.2}
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, Math.random() * 20 - 10, 0],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2 + 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        )
      })}
    </motion.g>
  )

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      <svg width={dimensions.width} height={dimensions.height} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
        {decorations}
        {projectCircles}
        {projectLabels}
        {intersectionLabels}
        {legend}
      </svg>
    </div>
  )
}

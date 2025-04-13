"use client"

import { CustomCard } from "@/components/ui/custom-card"
import { AnimatedPieChart } from "@/components/advanced-charts"
import { SkillRadarChart } from "@/components/ui/skill-radar-chart"
import { FadeIn } from "@/components/section-transitions"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Gauge, PieChart, Star } from "lucide-react"
import { skillData, getTechColor, getTechIcon } from "./skills-utils"
import { useState } from "react"
import { ProjectTechBarChart } from "./project-tech-barchart"
import { motion } from "framer-motion"

// Add hover effects to the pie chart with reduced animation duration
const AnimatedPieChartComponent = ({
  data,
  animated = true,
  showLabels = false,
  showValues = false,
  className = "",
}: { data: any; animated?: boolean; showLabels?: boolean; showValues?: boolean; className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }} // Reduced scale effect
      transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.2 }} // Faster animation
      className={`w-full h-full ${className}`}
    >
      <AnimatedPieChart
        data={data}
        animated={animated}
        showLabels={showLabels}
        showValues={showValues}
        className="w-full h-full"
        // Removed tooltipStyles as it is not supported by AnimatedPieChart
      />
    </motion.div>
  )
}

export function SkillsOverview() {
  // Convert skill distribution to chart data format with custom colors
  const skillDistributionData = Object.entries(skillData.overview.skillDistribution).map(([name, value], index) => ({
    name,
    value,
    fill: `hsl(${index * 60}, 70%, 60%)`, // Use different hue for each segment
  }))

  // Create data for competency profile
  const competencyData = {
    category: "Competency Profile",
    data: [
      { name: "Frontend", value: 85 },
      { name: "Backend", value: 75 },
      { name: "Database", value: 80 },
      { name: "Problem Solving", value: 90 },
      { name: "UI/UX", value: 75 },
      { name: "DevOps", value: 65 },
    ],
  }

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Skill Distribution Pie Chart */}
        <FadeIn direction="up" className="md:col-span-1" duration={0.5}>
          {" "}
          {/* Reduced duration */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            className="h-full"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <PieChart className="w-4 h-4 text-primary" />
                </div>
                <span className="text-primary">Skill Distribution</span>
              </div>
            }
          >
            <div className="h-[300px] flex items-center justify-center">
              <AnimatedPieChartComponent
                data={skillDistributionData}
                animated={true}
                showLabels={false}
                showValues={false}
                className="w-full h-full"
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {skillDistributionData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-sm font-medium truncate text-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CustomCard>
        </FadeIn>

        {/* Most Used Stack */}
        <FadeIn direction="up" delay={0.05} className="md:col-span-2" duration={0.5}>
          {" "}
          {/* Reduced duration and delay */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            className="h-full"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <span className="text-primary">Most Used Stack</span>
              </div>
            }
          >
            <div className="flex flex-col h-full">
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                {["Next.js", "React", "Tailwind CSS", "Node.js", "MongoDB", "MySQL"].map((tech) => (
                  <TooltipProvider key={tech}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.03 }} // Reduced scale effect
                          transition={{ duration: 0.2 }} // Faster animation
                          className={`px-3 md:px-4 py-2 rounded-lg ${getTechColor(tech)} flex items-center gap-2`}
                        >
                          {getTechIcon(tech)}
                          <span className="font-medium">{tech}</span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-card border border-primary/30 text-foreground font-medium shadow-lg">
                        <p>Used in {skillData.projects.filter((p) => p.technologies.includes(tech)).length} projects</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <div className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/10">
                  <h4 className="text-sm font-medium text-primary mb-2">Primary Focus</h4>
                  <p className="font-medium text-foreground">
                    Full-stack web development with modern JavaScript frameworks and Python backends
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/10">
                  <h4 className="text-sm font-medium text-primary mb-2">Current Project</h4>
                  <p className="font-medium text-foreground">
                    SMAQ Analytics Dashboard - Enterprise data visualization platform
                  </p>
                </div>
              </div>
            </div>
          </CustomCard>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        {/* Project Technology Bar Chart */}
        <FadeIn direction="up" delay={0.1} className="col-span-1 md:col-span-1" duration={0.5}>
          {" "}
          {/* Reduced duration and delay */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            className="h-full"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-primary">Technologies Per Project</span>
              </div>
            }
          >
            <div className="p-2">
              <ProjectTechBarChart projects={skillData.projects} />
            </div>
          </CustomCard>
        </FadeIn>

        {/* Competency Profile */}
        <FadeIn direction="up" delay={0.15} className="col-span-1 md:col-span-1" duration={0.5}>
          {" "}
          {/* Reduced duration and delay */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            className="h-full"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Gauge className="w-4 h-4 text-primary" />
                </div>
                <span className="text-primary">Competency Profile</span>
              </div>
            }
          >
            <div className="h-[300px] flex items-center justify-center">
              <SkillRadarChart
                skills={competencyData}
                size={300}
                animated={true}
                render3D={true}
                showValues={true}
                showLabels={true}
              />
            </div>
          </CustomCard>
        </FadeIn>
      </div>

      <FadeIn direction="up" delay={0.2} className="mt-4 md:mt-6" duration={0.5}>
        {" "}
        {/* Reduced duration and delay */}
        <CustomCard
          variant="glass"
          hoverEffect="glow"
          title={
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span className="text-primary">Skill Category Highlights</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Frontend Card */}
            <SkillCategoryCard
              title="Frontend"
              skills={skillData.techStack.Frontend}
              proficiency={85}
              colorClass="blue-500"
              className="hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200" // Faster transition
            />

            {/* Backend Card */}
            <SkillCategoryCard
              title="Backend"
              skills={skillData.techStack.Backend}
              proficiency={75}
              colorClass="green-500"
              className="hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200" // Faster transition
            />

            {/* Database Card */}
            <SkillCategoryCard
              title="Database"
              skills={skillData.techStack.Database}
              proficiency={80}
              colorClass="orange-500"
              className="hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200" // Faster transition
            />
          </div>
        </CustomCard>
      </FadeIn>
    </div>
  )
}

interface SkillCategoryCardProps {
  title: string
  skills: string[]
  proficiency: number
  colorClass: string
  className?: string
}

// Update the Skill Category Card to show percentage values and tooltip for "+3 more"
function SkillCategoryCard({ title, skills, proficiency, colorClass, className }: SkillCategoryCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const hiddenSkills = skills.length > 5 ? skills.slice(5) : []

  return (
    <motion.div
      whileHover={{ y: -3 }} // Reduced hover effect
      transition={{ duration: 0.2 }} // Faster animation
      className={`bg-card/50 rounded-lg p-3 md:p-4 border border-primary/10 hover:border-primary/30 transition-colors ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-md bg-${colorClass}/10`}>{getTechIcon(title)}</div>
        <h3 className="font-medium text-primary">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {skills.slice(0, 5).map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className={`bg-${colorClass}/5 text-${colorClass} border-${colorClass}/20`}
          >
            {tech}
          </Badge>
        ))}
        {skills.length > 5 && (
          <TooltipProvider>
            <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={`bg-${colorClass}/5 text-${colorClass} border-${colorClass}/20 cursor-pointer`}
                  onClick={() => setShowTooltip(true)}
                >
                  +{skills.length - 5} more
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-card border border-primary/30 text-foreground font-medium shadow-lg">
                <div className="p-1">
                  {hiddenSkills.map((skill, index) => (
                    <div key={index} className="py-1 text-foreground">
                      {skill}
                    </div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground">Proficiency</span>
        <div className="w-2/3 bg-muted rounded-full h-2 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${proficiency}%` }}
            transition={{ duration: 0.5 }} // Reduced animation duration
            className={`h-2 rounded-full bg-${colorClass}`}
          ></motion.div>
          <span
            className={`absolute -top-5 text-xs font-medium text-${colorClass}`}
            style={{ left: `${proficiency - 5}%` }}
          >
            {proficiency}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}

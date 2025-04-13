"use client"

import type React from "react"
import { motion } from "framer-motion"

import { CustomCard } from "@/components/ui/custom-card"
import { FadeIn } from "@/components/section-transitions"
import { AnimatedBarChart, AnimatedPieChart } from "@/components/advanced-charts"
import { Award, BookOpen, Braces, Code, GraduationCap, Star, Briefcase } from "lucide-react"
import { skillData } from "./skills-utils"

export function ProblemSolving() {
  // Convert problem solving data to chart format
  const platformData = Object.entries(skillData.problemSolving.platforms).map(([name, value], index) => ({
    name,
    value,
    fill: `hsl(${index * 120}, 70%, 60%)`, // Use different colors for each platform
  }))

  const categoryData = Object.entries(skillData.problemSolving.categories).map(([name, value], index) => ({
    name,
    value,
    fill: `hsl(${index * 60}, 70%, 60%)`, // Use different colors for each category
  }))

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Solving Stats */}
        <FadeIn direction="up">
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <span className="text-primary">Problem Solving Stats</span>
              </div>
            }
          >
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <StatCard value={skillData.problemSolving.totalSolved} label="Total Problems Solved" />
                <StatCard value={Object.keys(skillData.problemSolving.platforms).length} label="Platforms" />
                <StatCard value={Object.keys(skillData.problemSolving.categories).length} label="Problem Categories" />
              </div>

              {/* Add floating animation to the pie chart */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  rotate: [0, 1, 0, -1, 0],
                  transition: {
                    scale: { duration: 0.3 },
                    rotate: { duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                  },
                }}
                className="h-[250px]"
              >
                <AnimatedPieChart
                  data={platformData}
                  showLabels={false}
                  showValues={false}
                />
              </motion.div>

              <div className="mt-2 grid grid-cols-3 gap-2">
                {platformData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CustomCard>
        </FadeIn>

        {/* Problem Categories */}
        <FadeIn direction="up" delay={0.2}>
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Braces className="w-4 h-4 text-primary" />
                </div>
                <span className="text-primary">Problem Categories</span>
              </div>
            }
          >
            {/* Add hover effect to bar chart */}
            <motion.div
              whileHover={{
                boxShadow: "0 0 30px rgba(var(--primary), 0.15)",
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
              className="h-[350px]"
            >
              <AnimatedBarChart
                data={categoryData}
                showValues={true}
                customColors={true}
              />
            </motion.div>
          </CustomCard>
        </FadeIn>
      </div>

      {/* Achievement Badges */}
      <FadeIn direction="up" delay={0.3} className="mt-6">
        <CustomCard
          variant="glass"
          hoverEffect="glow"
          title={
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <span className="text-primary">Achievement Badges</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <AchievementBadge
              icon={<Star className="w-8 h-8 text-blue-500" />}
              title="Problem Solver"
              description="Solved 200+ coding challenges across platforms"
              color="blue-500"
            />
            <AchievementBadge
              icon={<Code className="w-8 h-8 text-green-500" />}
              title="Full Stack Developer"
              description="Mastered both frontend and backend technologies"
              color="green-500"
            />
            <AchievementBadge
              icon={<GraduationCap className="w-8 h-8 text-purple-500" />}
              title="Academic Excellence"
              description="Dean's List & Vice Chancellor's List recipient"
              color="purple-500"
            />
            <AchievementBadge
              icon={<Briefcase className="w-8 h-8 text-orange-500" />}
              title="Professional Growth"
              description="Rapid progression from Frontend to Full Stack Engineer"
              color="orange-500"
            />
          </div>
        </CustomCard>
      </FadeIn>
    </div>
  )
}

interface StatCardProps {
  value: number
  label: string
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-card/50 rounded-lg p-4 border border-primary/10 flex flex-col items-center justify-center">
      <div className="text-3xl font-bold text-primary mb-2">{value}+</div>
      <div className="text-sm text-center text-foreground">{label}</div>
    </div>
  )
}

interface AchievementBadgeProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

function AchievementBadge({ icon, title, description, color }: AchievementBadgeProps) {
  return (
    // Add glow and hover effect to achievement badges
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: `0 10px 25px -5px rgba(${color.replace("-500", "")}, 0.3)`,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="bg-card/50 rounded-lg p-4 border border-primary/10 flex flex-col items-center text-center"
    >
      <motion.div
        animate={{
          boxShadow: [
            `0 0 0px rgba(${color.replace("-500", "")}, 0.3)`,
            `0 0 10px rgba(${color.replace("-500", "")}, 0.5)`,
            `0 0 0px rgba(${color.replace("-500", "")}, 0.3)`,
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className={`w-16 h-16 rounded-full bg-${color}/10 flex items-center justify-center mb-3`}
      >
        {icon}
      </motion.div>
      <h3 className="font-medium mb-1 text-primary">{title}</h3>
      <p className="text-sm text-foreground">{description}</p>
    </motion.div>
  )
}

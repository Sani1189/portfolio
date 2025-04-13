"use client"

import { motion } from "framer-motion"
import { CustomCard } from "@/components/ui/custom-card"
import { FadeIn } from "@/components/section-transitions"
import { Badge } from "@/components/ui/badge"
import { AnimatedAreaChart } from "@/components/advanced-charts"
import { CheckCircle2, Lightbulb, TrendingUp } from "lucide-react"
import { skillData } from "./skills-utils"

export function SkillGrowth() {
  // Format skill growth data for chart
  const skillGrowthChartData = skillData.skillGrowth.map((yearData) => ({
    name: yearData.year,
    Frontend: yearData.Frontend * 10, // Scale to percentage
    Backend: yearData.Backend * 10,
    "Problem Solving": yearData.ProblemSolving * 10,
  }))

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {/* Skill Growth Chart */}
        <FadeIn direction="up" duration={0.5}>
          {" "}
          {/* Reduced duration */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <span>Skill Growth Timeline</span>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Reduced animation distance
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} // Faster animation
              whileHover={{
                boxShadow: "0 0 30px rgba(var(--primary), 0.15)",
                scale: 1.01, // Reduced scale effect
              }}
              className="h-[350px]"
            >
              <AnimatedAreaChart data={skillGrowthChartData} animationDuration={0.5} />{" "}
              {/* Reduced animation duration */}
            </motion.div>
          </CustomCard>
        </FadeIn>

        {/* Milestones */}
        <FadeIn direction="up" delay={0.1} duration={0.5}>
          {" "}
          {/* Reduced duration and delay */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span>Career Milestones</span>
              </div>
            }
          >
            <div className="relative pl-6 md:pl-8 before:content-[''] before:absolute before:left-2 md:before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-primary/20">
              {skillData.milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }} // Reduced animation distance
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }} // Faster animation, reduced delay
                  whileHover={{
                    x: 3, // Reduced hover effect
                    backgroundColor: "rgba(var(--primary), 0.05)",
                  }}
                  className="mb-6 relative"
                >
                  <MilestoneItem key={index} milestone={milestone} />
                </motion.div>
              ))}
            </div>
          </CustomCard>
        </FadeIn>

        {/* Learning Velocity */}
        <FadeIn direction="up" delay={0.15} duration={0.5}>
          {" "}
          {/* Reduced duration and delay */}
          <CustomCard
            variant="glass"
            hoverEffect="glow"
            title={
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                <span>Learning Velocity</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <StatCard value="200" label="Coding Problems Solved" />
              <StatCard value="15" label="Technologies Mastered" />
              <StatCard value="5" label="Certifications Completed" />
            </div>
            <div className="mt-4 md:mt-6 bg-card/50 rounded-lg p-3 md:p-4 border border-primary/10">
              <h3 className="font-medium mb-3">Learning Focus Areas</h3>
              <div className="space-y-3">
                <ProgressBar label="Frontend Development" value={90} />
                <ProgressBar label="Backend Development" value={75} />
                <ProgressBar label="Data Structures & Algorithms" value={85} />
              </div>
            </div>
          </CustomCard>
        </FadeIn>
      </div>
    </div>
  )
}

interface MilestoneItemProps {
  milestone: {
    title: string
    date: string
  }
}

function MilestoneItem({ milestone }: MilestoneItemProps) {
  return (
    <div className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{milestone.title}</h3>
        <Badge variant="outline" className="bg-primary/10">
          {milestone.date}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {milestone.title.includes("CSE Degree") && "Started my journey in Computer Science & Engineering."}
        {milestone.title.includes("Academic Project") &&
          "Developed a comprehensive travel booking system with user authentication."}
        {milestone.title.includes("Problems Solved") &&
          "Achieved a significant milestone in algorithmic problem solving across multiple platforms."}
        {milestone.title.includes("Research") &&
          "Began research on violence detection using computer vision and deep learning."}
        {milestone.title.includes("Frontend Engineer") &&
          "Started professional career at SMAQ, focusing on dashboard development."}
        {milestone.title.includes("Full Stack") && "Expanded skill set to include backend development with FastAPI."}
      </p>
    </div>
  )
}

interface StatCardProps {
  value: string
  label: string
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.2)" }} // Reduced hover effect
      transition={{ type: "spring", stiffness: 400, damping: 17, duration: 0.2 }} // Faster animation
      className="bg-card/50 rounded-lg p-3 md:p-4 border border-primary/10 flex flex-col items-center justify-center"
    >
      <div className="text-3xl font-bold text-primary mb-2">{value}+</div>
      <div className="text-sm text-center text-muted-foreground">{label}</div>
    </motion.div>
  )
}

interface ProgressBarProps {
  label: string
  value: number
}

function ProgressBar({ label, value }: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }} // Reduced animation duration
          className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/70"
        />
      </div>
    </div>
  )
}

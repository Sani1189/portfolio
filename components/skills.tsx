"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Activity, Code, Database, Server, Layers, Briefcase, TrendingUp, Terminal, Layout, Puzzle } from "lucide-react"
import { AnimatedTabs } from "@/components/ui/animated-tabs"
import { FadeIn, BlurIn } from "@/components/section-transitions"
import { GradientText } from "@/components/text-effects"

// Import our new components
import { SkillsOverview } from "./skills/skills-overview"
import { TechStack } from "./skills/tech-stack"
import { SkillGrowth } from "./skills/skill-growth"
import { ProjectsSkills } from "./skills/projects-skills"
import { ProblemSolving } from "./skills/problem-solving"

// Skill data
const skillData = {
  overview: {
    mostUsedStack: ["Next.js", "Tailwind CSS", "FastAPI", "MongoDB"],
    skillDistribution: {
      Frontend: 35,
      Backend: 25,
      Database: 15,
      "Programming Languages": 15,
      Others: 10,
    },
  },
  techStack: {
    Frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap", "jQuery"],
    Backend: ["FastAPI", "PHP", "Node.js"],
    Database: ["MySQL", "MongoDB"],
    Languages: ["C", "C++", "Python", "Java"],
    Tools: ["VS Code", "Git", "Android Studio"],
    RemoteWork: ["Slack", "Linear", "Jira", "Google Meet", "Microsoft Teams"],
  },
  skillGrowth: [
    { year: "2020", Frontend: 1, Backend: 0, ProblemSolving: 3 },
    { year: "2021", Frontend: 3, Backend: 1, ProblemSolving: 4 },
    { year: "2022", Frontend: 5, Backend: 2, ProblemSolving: 6 },
    { year: "2023", Frontend: 7, Backend: 3, ProblemSolving: 7 },
    { year: "2024", Frontend: 8, Backend: 5, ProblemSolving: 8 },
    { year: "2025", Frontend: 9, Backend: 8, ProblemSolving: 9 },
  ],
  projects: [
    {
      name: "Travel and Tourism System",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap"],
      type: "Academic",
    },
    {
      name: "The Daily SunRise",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB"],
      type: "Personal",
    },
    {
      name: "SMAQ Dashboards",
      technologies: ["Next.js", "React", "Tailwind CSS", "FastAPI", "ApexCharts", "Material UI", "React Query"],
      type: "Professional",
    },
  ],
  problemSolving: {
    totalSolved: 200,
    platforms: {
      LeetCode: 80,
      Codeforces: 60,
      HackerRank: 60,
    },
    categories: {
      "Data Structures": 60,
      "Dynamic Programming": 40,
      Graph: 30,
      Greedy: 25,
      Math: 20,
      Others: 25,
    },
  },
  milestones: [
    { title: "Started CSE Degree", date: "2020" },
    { title: "First Academic Project (Tourism System)", date: "2021" },
    { title: "200+ Problems Solved", date: "2023" },
    { title: "Research in Computer Vision", date: "2023" },
    { title: "Joined SMAQ as Frontend Engineer", date: "2024-11" },
    { title: "Transitioned to Full Stack Engineer", date: "2025-02" },
  ],
}

// Helper function to get icon for technology
const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase()
  if (
    techLower.includes("html") ||
    techLower.includes("css") ||
    techLower.includes("react") ||
    techLower.includes("next") ||
    techLower.includes("tailwind") ||
    techLower.includes("bootstrap") ||
    techLower.includes("jquery") ||
    techLower.includes("ui")
  ) {
    return <Layout className="w-4 h-4" />
  } else if (
    techLower.includes("php") ||
    techLower.includes("node") ||
    techLower.includes("api") ||
    techLower.includes("fastapi")
  ) {
    return <Server className="w-4 h-4" />
  } else if (techLower.includes("sql") || techLower.includes("mongo") || techLower.includes("db")) {
    return <Database className="w-4 h-4" />
  } else if (techLower.includes("c++") || techLower.includes("java") || techLower.includes("python")) {
    return <Code className="w-4 h-4" />
  } else if (techLower.includes("git") || techLower.includes("vs code") || techLower.includes("android studio")) {
    return <Terminal className="w-4 h-4" />
  } else if (
    techLower.includes("slack") ||
    techLower.includes("jira") ||
    techLower.includes("linear") ||
    techLower.includes("meet") ||
    techLower.includes("teams")
  ) {
    return <Briefcase className="w-4 h-4" />
  } else {
    return <Layers className="w-4 h-4" />
  }
}

// Helper function to get color for technology
const getTechColor = (tech: string) => {
  const techLower = tech.toLowerCase()
  if (
    techLower.includes("html") ||
    techLower.includes("css") ||
    techLower.includes("react") ||
    techLower.includes("next") ||
    techLower.includes("tailwind") ||
    techLower.includes("bootstrap") ||
    techLower.includes("jquery") ||
    techLower.includes("ui")
  ) {
    return "bg-blue-500/10 text-blue-500 border-blue-500/20"
  } else if (
    techLower.includes("php") ||
    techLower.includes("node") ||
    techLower.includes("api") ||
    techLower.includes("fastapi")
  ) {
    return "bg-green-500/10 text-green-500 border-green-500/20"
  } else if (techLower.includes("sql") || techLower.includes("mongo") || techLower.includes("db")) {
    return "bg-orange-500/10 text-orange-500 border-orange-500/20"
  } else if (techLower.includes("c++") || techLower.includes("java") || techLower.includes("python")) {
    return "bg-purple-500/10 text-purple-500 border-purple-500/20"
  } else if (techLower.includes("git") || techLower.includes("vs code") || techLower.includes("android studio")) {
    return "bg-red-500/10 text-red-500 border-red-500/20"
  } else if (
    techLower.includes("slack") ||
    techLower.includes("jira") ||
    techLower.includes("linear") ||
    techLower.includes("meet") ||
    techLower.includes("teams")
  ) {
    return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
  } else {
    return "bg-primary/10 text-primary border-primary/20"
  }
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const tabs = [
    {
      value: "overview",
      label: "Overview",
      icon: <Activity className="w-4 h-4" />,
      content: <SkillsOverview />,
    },
    {
      value: "tech-stack",
      label: "Tech Stack",
      icon: <Layers className="w-4 h-4" />,
      content: <TechStack />,
    },
    {
      value: "skill-growth",
      label: "Growth",
      icon: <TrendingUp className="w-4 h-4" />,
      content: <SkillGrowth />,
    },
    {
      value: "projects",
      label: "Projects",
      icon: <Briefcase className="w-4 h-4" />,
      content: <ProjectsSkills />,
    },
    {
      value: "problem-solving",
      label: "Problem Solving",
      icon: <Puzzle className="w-4 h-4" />,
      content: <ProblemSolving />,
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 px-4 min-h-screen"
      style={{
        background: "linear-gradient(180deg, transparent, hsl(var(--background)/0.9), transparent)",
        boxShadow: "inset 0 0 50px rgba(var(--primary), 0.03)",
      }}
    >
      <div className="container mx-auto max-w-6xl z-10">
        <FadeIn direction="up" duration={0.8}>
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
              <GradientText
                text="Skills Dashboard"
                className="text-3xl md:text-4xl font-bold"
                animate={true}
                from="hsl(var(--primary))"
                to="#ffffff"
              />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interactive overview of my technical proficiency, growth trajectory, and project applications.
            </p>
          </div>
        </FadeIn>

        <BlurIn duration={0.8} delay={0.2}>
          <div className="bg-card/30 backdrop-blur-md rounded-xl border border-primary/20 shadow-xl overflow-hidden">
            <div className="p-1 sm:p-2">
              <AnimatedTabs
                tabs={tabs}
                variant="gradient"
                className="max-w-5xl mx-auto"
                tabsClassName="bg-background/50 p-1 rounded-lg border border-primary/10"
                contentClassName="mt-8 px-4 py-6"
              />
            </div>
          </div>
        </BlurIn>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></motion.div>
        <motion.div
          className="absolute top-1/3 left-1/4 w-24 h-24 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></motion.div>
      </div>
    </section>
  )
}

import { Briefcase, Code, Database, Layout, Layers, Server, Terminal } from "lucide-react"

// Types for skill data
export interface SkillData {
  overview: {
    mostUsedStack: string[]
    skillDistribution: Record<string, number>
  }
  techStack: Record<string, string[]>
  skillGrowth: {
    year: string
    Frontend: number
    Backend: number
    ProblemSolving: number
  }[]
  projects: {
    name: string
    technologies: string[]
    type: string
  }[]
  problemSolving: {
    totalSolved: number
    platforms: Record<string, number>
    categories: Record<string, number>
  }
  milestones: {
    title: string
    date: string
  }[]
}

// Helper function to get icon for technology
export const getTechIcon = (tech: string) => {
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
export const getTechColor = (tech: string) => {
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

// Skill data
export const skillData: SkillData = {
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

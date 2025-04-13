"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AnimatedTabs } from "@/components/ui/animated-tabs"
import { CustomCard } from "@/components/ui/custom-card"
import { CustomButton } from "@/components/ui/custom-button"
import { ProgressRing } from "@/components/ui/progress-ring"
import { AnimatedBadge } from "@/components/ui/animated-badge"
import {
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Database,
  Globe,
  Layers,
  Terminal,
  MessageSquare,
  Lightbulb,
  Zap,
} from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { SkillRadarChart } from "@/components/ui/skill-radar-chart"
import { GradientText, RevealText } from "@/components/text-effects"
import { StaggerContainer, StaggerItem } from "@/components/section-transitions"
import { Badge } from "@/components/ui/badge"

export default function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const tabs = [
    {
      value: "overview",
      label: "Overview",
      icon: <FileText className="w-4 h-4" />,
      content: <ResumeOverview />,
    },
    {
      value: "experience",
      label: "Experience",
      icon: <Briefcase className="w-4 h-4" />,
      content: <ResumeExperience />,
    },
    {
      value: "education",
      label: "Education",
      icon: <GraduationCap className="w-4 h-4" />,
      content: <ResumeEducation />,
    },
    {
      value: "skills",
      label: "Skills",
      icon: <Code className="w-4 h-4" />,
      content: <ResumeSkills />,
    },
    {
      value: "achievements",
      label: "Achievements",
      icon: <Award className="w-4 h-4" />,
      content: <ResumeAchievements />,
    },
  ]

  return (
    <section id="resume" ref={sectionRef} className="relative py-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <GradientText text="Resume Overview" animate={true} />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <RevealText text="My professional journey, skills, and achievements in one place." />
          </p>
          <div className="mt-6">
            <CustomButton
              variant="gradient"
              glowEffect
              animateOnHover
              iconLeft={<Download className="w-4 h-4" />}
              className="mt-4"
              style={{
                boxShadow: "0 0 15px hsl(var(--primary)/0.4)",
              }}
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              Download Resume
            </CustomButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatedTabs tabs={tabs} variant="gradient" className="max-w-5xl mx-auto" />
        </motion.div>
      </div>
    </section>
  )
}

function ResumeOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <CustomCard variant="glass" hoverEffect="glow" className="col-span-1 md:col-span-2 p-6">
        <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
        <p className="text-muted-foreground mb-4">
          Results-driven software developer with expertise in full-stack development and business intelligence
          solutions. Strong analytical mindset with exceptional problem-solving abilities.
        </p>
        <p className="text-muted-foreground mb-4">
          Specialized in creating responsive, data-driven applications and implementing modern frontend architectures.
          Proven track record in developing enterprise-level analytics dashboards and maintaining high-performance web
          applications.
        </p>
        <p className="text-muted-foreground">
          Experienced in remote collaboration with international teams and delivering solutions for global markets.
          Skilled at breaking down complex problems into manageable components and architecting efficient, scalable
          solutions.
        </p>
      </CustomCard>

      <div className="space-y-6">
        <CustomCard variant="glass" hoverEffect="glow" className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Experience</h3>
            <AnimatedBadge variant="outline" glowEffect>
              1+ years
            </AnimatedBadge>
          </div>
          <div className="flex justify-center py-2">
            <ProgressRing value={85} size={100} label="Professional Growth" />
          </div>
        </CustomCard>

        <CustomCard variant="glass" hoverEffect="glow" className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Projects</h3>
            <AnimatedBadge variant="outline" glowEffect>
              4+ completed
            </AnimatedBadge>
          </div>
          <div className="flex justify-center py-2">
            <ProgressRing value={90} size={100} label="Success Rate" />
          </div>
        </CustomCard>
      </div>

      <CustomCard variant="glass" hoverEffect="glow" className="col-span-1 md:col-span-3 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <h4 className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter to={200} suffix="+" />
            </h4>
            <p className="text-sm text-muted-foreground">Coding Challenges Solved</p>
          </div>
          <div className="p-4">
            <h4 className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter to={30} suffix="%" />
            </h4>
            <p className="text-sm text-muted-foreground">Team Efficiency Boost</p>
          </div>
          <div className="p-4">
            <h4 className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter to={3.6} decimals={1} />
            </h4>
            <p className="text-sm text-muted-foreground">CGPA (out of 4.0)</p>
          </div>
          <div className="p-4">
            <h4 className="text-3xl font-bold text-primary mb-2">
              <AnimatedCounter to={3} suffix="+" />
            </h4>
            <p className="text-sm text-muted-foreground">Academic Awards</p>
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

function ResumeExperience() {
  return (
    <div className="space-y-6 mt-6">
      <CustomCard variant="glass" hoverEffect="lift" className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Full Stack Engineer</h3>
              <div className="flex items-center gap-2">
                <AnimatedBadge variant="outline">Nov 2024 - Present</AnimatedBadge>
              </div>
            </div>
            <h4 className="text-primary font-medium mb-2">Common Analytics (SMAQ) | Remote - Hong Kong Based</h4>
            <p className="text-sm text-muted-foreground mb-3">
              A Fast-growing startup serving global enterprises with SMAQ - AI business analytics Application
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Developed interactive dashboards and data visualizations using Next.js, Chart.js, ApexCharts,
                  TailwindCSS
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Managed dashboard layouts, tables, and dynamic UI components using Material UI and Shadcn/ui
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Implemented real-time data fetching and state management using React Query, reducing redundant API
                  calls
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Established reusable UI component library and documentation system, improving team productivity
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Built and maintained the landing page for SMAQ's portfolio business site</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Transitioned to full-stack development (Feb-2025), leveraging Next.js and Python FastAPI for backend
                  integration
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Collaborated with teams to integrate analytics features and implemented updates based on client
                  requirements
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="lift" className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Freelance Software Developer</h3>
              <div className="flex items-center gap-2">
                <AnimatedBadge variant="outline">2023 - Present</AnimatedBadge>
              </div>
            </div>
            <h4 className="text-primary font-medium mb-2">Various Clients | Remote</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Developed custom web applications and solutions for various clients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Created responsive, user-friendly interfaces using React, Next.js, and Tailwind CSS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Built backend systems using Node.js, Express, and various database technologies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Implemented RESTful APIs for seamless frontend-backend integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Managed project timelines and client communication throughout development lifecycle</span>
              </li>
            </ul>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="lift" className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Code className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Research on Computer Vision</h3>
              <div className="flex items-center gap-2">
                <AnimatedBadge variant="outline">June 2023 - Present</AnimatedBadge>
              </div>
            </div>
            <h4 className="text-primary font-medium mb-2">Violence Detection and Classification</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Focusing on violence detection and classification using CNN and LSTM models</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Comparative analysis with multiple datasets to enhance model accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Collaborating with peers and advisors to refine research methodology</span>
              </li>
            </ul>
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

function ResumeEducation() {
  return (
    <div className="space-y-6 mt-6">
      <CustomCard variant="glass" hoverEffect="lift" className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Bachelor of Science in Computer Science & Engineering</h3>
              <div className="flex items-center gap-2">
                <AnimatedBadge variant="outline">2020 - Present</AnimatedBadge>
              </div>
            </div>
            <h4 className="text-primary font-medium mb-2">Independent University, Bangladesh</h4>
            <p className="text-muted-foreground mb-4">CGPA: 3.6 (out of 4)</p>

            <h5 className="font-medium mb-2">Relevant Coursework:</h5>
            <div className="flex flex-wrap gap-2 mb-4">
              <AnimatedBadge variant="secondary">Data Structures & Algorithms</AnimatedBadge>
              <AnimatedBadge variant="secondary">Database Management Systems</AnimatedBadge>
              <AnimatedBadge variant="secondary">Web Development</AnimatedBadge>
              <AnimatedBadge variant="secondary">Computer Networks</AnimatedBadge>
              <AnimatedBadge variant="secondary">Software Engineering</AnimatedBadge>
              <AnimatedBadge variant="secondary">Artificial Intelligence</AnimatedBadge>
              <AnimatedBadge variant="secondary">Machine Learning</AnimatedBadge>
            </div>

            <h5 className="font-medium mb-2">Academic Achievements:</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Dean's List (2020, 2021)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Vice Chancellor's List (2022)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Runner-up in Tech Fest, IUB (Web Application Course)</span>
              </li>
            </ul>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="lift" className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Higher Secondary Certificate (HSC)</h3>
              <div className="flex items-center gap-2">
                <AnimatedBadge variant="outline">2018 - 2020</AnimatedBadge>
              </div>
            </div>
            <h4 className="text-primary font-medium mb-2">Govt Science College</h4>
            <p className="text-muted-foreground mb-4">GPA: 4.25 (out of 5.0)</p>
            <h5 className="font-medium mb-2">Focus:</h5>
            <div className="flex flex-wrap gap-2">
              <AnimatedBadge variant="secondary">Science Group</AnimatedBadge>
              <AnimatedBadge variant="secondary">Mathematics</AnimatedBadge>
              <AnimatedBadge variant="secondary">Physics</AnimatedBadge>
              <AnimatedBadge variant="secondary">Chemistry</AnimatedBadge>
              <AnimatedBadge variant="secondary">Biology</AnimatedBadge>
            </div>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="lift" className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Secondary School Certificate (SSC)</h3>
              <div className="flex items-center gap-2">
                <AnimatedBadge variant="outline">2016 - 2018</AnimatedBadge>
              </div>
            </div>
            <h4 className="text-primary font-medium mb-2">A.S High School</h4>
            <p className="text-muted-foreground mb-4">GPA: 5.0 (out of 5.0)</p>
            <h5 className="font-medium mb-2">Achievements:</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Perfect GPA score</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Science Group</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>School merit scholarship recipient</span>
              </li>
            </ul>
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

function ResumeSkills() {
  const frontendSkills = {
    category: "Frontend",
    data: [
      { name: "HTML/CSS", value: 90 },
      { name: "JavaScript", value: 85 },
      { name: "TypeScript", value: 80 },
      { name: "React", value: 85 },
      { name: "Next.js", value: 80 },
      { name: "Tailwind CSS", value: 85 },
    ],
  }

  const backendSkills = {
    category: "Backend",
    data: [
      { name: "Node.js", value: 75 },
      { name: "FastAPI", value: 70 },
      { name: "PHP", value: 65 },
      { name: "REST API", value: 80 },
      { name: "MongoDB", value: 80 },
      { name: "MySQL", value: 75 },
    ],
  }

  return (
    <div className="mt-6">
      <StaggerContainer className="grid grid-cols-1 gap-6 mb-8">
        <StaggerItem>
          <CustomCard variant="glass" hoverEffect="glow" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Technical Skills Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SkillCategory
                icon={<Code className="w-5 h-5 text-blue-500" />}
                title="Programming Languages"
                skills={["C", "C++", "Python", "Java", "JavaScript"]}
                color="blue"
              />
              <SkillCategory
                icon={<Globe className="w-5 h-5 text-green-500" />}
                title="Web Application"
                skills={[
                  "HTML",
                  "CSS",
                  "Bootstrap",
                  "PHP",
                  "React",
                  "Node.js",
                  "jQuery",
                  "JavaScript",
                  "TypeScript",
                  "Next.js",
                  "Tailwind CSS",
                  "Fastapi",
                ]}
                color="green"
              />
              <SkillCategory
                icon={<Database className="w-5 h-5 text-orange-500" />}
                title="Database Management"
                skills={["MySQL", "MongoDB"]}
                color="orange"
              />
              <SkillCategory
                icon={<MessageSquare className="w-5 h-5 text-purple-500" />}
                title="Remote Work Technologies"
                skills={["Slack", "Linear", "Jira", "Google Meet", "Microsoft Teams"]}
                color="purple"
              />
              <SkillCategory
                icon={<Terminal className="w-5 h-5 text-red-500" />}
                title="Development Tools"
                skills={["VS Code", "Git", "Android Studio"]}
                color="red"
              />
              <SkillCategory
                icon={<Layers className="w-5 h-5 text-indigo-500" />}
                title="Development Concepts"
                skills={["UML diagrams", "ERD", "REST API design"]}
                color="indigo"
              />
            </div>
          </CustomCard>
        </StaggerItem>

        <StaggerItem>
          <CustomCard variant="glass" hoverEffect="glow" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Problem Solving</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-muted-foreground mb-4">
                  Successfully solved over 200 programming challenges on various online judges, including platforms like
                  LeetCode, Codeforces and HackerRank.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <PlatformCard name="LeetCode" count={80} icon={<Code className="w-5 h-5" />} />
                  <PlatformCard name="Codeforces" count={60} icon={<Code className="w-5 h-5" />} />
                  <PlatformCard name="HackerRank" count={60} icon={<Code className="w-5 h-5" />} />
                </div>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <ProgressRing value={90} size={150} label="Problem Solving" />
              </div>
            </div>
          </CustomCard>
        </StaggerItem>
      </StaggerContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-6 text-center">Frontend Skills</h3>
          <div className="flex justify-center mb-8">
            <SkillRadarChart skills={frontendSkills} size={300} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {frontendSkills.data.map((skill) => (
              <CustomCard key={skill.name} variant="glass" className="p-4">
                <h4 className="font-medium mb-2">{skill.name}</h4>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-blue-500"
                  />
                </div>
              </CustomCard>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6 text-center">Backend Skills</h3>
          <div className="flex justify-center mb-8">
            <SkillRadarChart skills={backendSkills} size={300} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {backendSkills.data.map((skill) => (
              <CustomCard key={skill.name} variant="glass" className="p-4">
                <h4 className="font-medium mb-2">{skill.name}</h4>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-blue-500"
                  />
                </div>
              </CustomCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ResumeAchievements() {
  return (
    <div className="space-y-6 mt-6">
      <CustomCard variant="glass" hoverEffect="glow" className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Dean's List (2020, 2021) & Vice Chancellor's List (2022)</h3>
            <p className="text-muted-foreground">
              Recognized for academic excellence at Independent University, Bangladesh.
            </p>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="glow" className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Runner-up in Tech Fest, IUB</h3>
            <p className="text-muted-foreground">
              Showcased skills in web development and received recognition in the Web Application Course competition.
            </p>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="glow" className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Code className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">200+ Programming Challenges Solved</h3>
            <p className="text-muted-foreground">
              Successfully solved over 200 programming challenges on various online judges, including platforms like
              LeetCode, Codeforces, and HackerRank.
            </p>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="glow" className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Productivity Boost: Improved Team Efficiency by 30%</h3>
            <p className="text-muted-foreground">
              Developed and implemented a custom UI component library that significantly improved team productivity and
              development speed.
            </p>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="glow" className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Perfect GPA in SSC</h3>
            <p className="text-muted-foreground">
              Achieved a perfect GPA of 5.0 out of 5.0 in Secondary School Certificate (SSC) examination, demonstrating
              academic excellence and dedication to studies.
            </p>
          </div>
        </div>
      </CustomCard>

      <CustomCard variant="glass" hoverEffect="glow" className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Research Contributions</h3>
            <p className="text-muted-foreground">
              Contributing to the field of computer vision through research on violence detection and classification,
              applying advanced deep learning techniques to solve real-world problems.
            </p>
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

interface SkillCategoryProps {
  icon: React.ReactNode
  title: string
  skills: string[]
  color: string
}

function SkillCategory({ icon, title, skills, color }: SkillCategoryProps) {
  return (
    <div className={`bg-${color}-500/10 rounded-lg p-4 border border-${color}-500/20`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-1">
        {skills.map((skill, index) => (
          <Badge key={index} variant="outline" className={`bg-${color}-500/5 text-${color}-500 border-${color}-500/20`}>
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
}

interface PlatformCardProps {
  name: string
  count: number
  icon: React.ReactNode
}

function PlatformCard({ name, count, icon }: PlatformCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.2)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="bg-card/50 rounded-lg p-4 border border-primary/10 flex flex-col items-center justify-center"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">{icon}</div>
      <h4 className="font-medium">{name}</h4>
      <p className="text-2xl font-bold text-primary">{count}</p>
    </motion.div>
  )
}

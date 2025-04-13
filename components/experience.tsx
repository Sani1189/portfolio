"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap, Calendar, Award, Code, Building, MapPin } from "lucide-react"
import { CustomCard } from "./ui/custom-card"
import { CustomButton } from "./custom-button"
import { Badge } from "@/components/ui/badge"
import { GradientText, RevealText, ShimmerText } from "./text-effects"
import { FadeIn, StaggerContainer, StaggerItem } from "./section-transitions"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="experience" ref={sectionRef} className="relative py-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <GradientText text="Experience & Education" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <RevealText text="My professional journey and academic background that have shaped my skills and expertise in software development." />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Professional Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">
                <ShimmerText text="Professional Experience" />
              </h3>
            </div>

            <StaggerContainer className="space-y-8">
              {/* Freelance Experience */}
              <StaggerItem>
                <ExperienceCard
                  title="Freelance Software Developer"
                  company="Various Clients"
                  period="2023 - Present"
                  location="Remote"
                  description="Developing custom web applications and solutions for various clients. Specializing in full-stack development with modern technologies."
                  skills={["Next.js", "React", "Node.js", "Express", "MySQL", "MongoDB", "Tailwind CSS", "REST API"]}
                  type="work"
                />
              </StaggerItem>

              {/* SMAQ Experience */}
              <StaggerItem>
                <ExperienceCard
                  title="Full Stack Engineer"
                  company="Common Analytics (SMAQ)"
                  period="November 2024 - Present"
                  location="Remote - Hong Kong Based"
                  description="Developing interactive dashboards and data visualizations. Implementing real-time data fetching and state management. Transitioned to full-stack development leveraging Next.js and Python FastAPI."
                  skills={["Next.js", "React", "Tailwind CSS", "FastAPI", "ApexCharts", "Material UI", "React Query"]}
                  type="work"
                />
              </StaggerItem>

              {/* Research Experience */}
              <StaggerItem>
                <ExperienceCard
                  title="Research on Computer Vision"
                  company="Violence Detection and Classification"
                  period="June 2023 - Present"
                  description="Focusing on violence detection and classification using CNN and LSTM models. Comparative analysis with multiple datasets to enhance model accuracy."
                  skills={["Python", "Computer Vision", "CNN", "LSTM", "Machine Learning"]}
                  type="research"
                />
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">
                <ShimmerText text="Education" />
              </h3>
            </div>

            <StaggerContainer className="space-y-8">
              {/* BSc */}
              <StaggerItem>
                <EducationCard
                  degree="Bachelor of Science in Computer Science & Engineering"
                  institution="Independent University, Bangladesh"
                  period="2020 - Present"
                  gpa="3.6"
                  maxGpa="4.0"
                  achievements={[
                    "Dean's List (2020, 2021)",
                    "Vice Chancellor's List (2022)",
                    "Runner-up in Tech Fest, IUB (Web Application Course)",
                  ]}
                />
              </StaggerItem>

              {/* HSC */}
              <StaggerItem>
                <EducationCard
                  degree="Higher Secondary Certificate (HSC)"
                  institution="Govt Science College"
                  period="2018 - 2020"
                  gpa="4.25"
                  maxGpa="5.0"
                  achievements={["Science Group", "Participated in various science competitions"]}
                />
              </StaggerItem>

              {/* SSC */}
              <StaggerItem>
                <EducationCard
                  degree="Secondary School Certificate (SSC)"
                  institution="A.S High School"
                  period="2016 - 2018"
                  gpa="5.0"
                  maxGpa="5.0"
                  achievements={["Science Group", "Perfect GPA score", "School merit scholarship recipient"]}
                />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

        {/* Skills Gained Section */}
        <FadeIn direction="up" delay={0.5} className="mt-16">
          <CustomCard variant="glass" hoverEffect="glow" className="p-6">
            <h3 className="text-xl font-bold mb-6 text-center">
              <GradientText text="Skills Gained Through Experience" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <SkillCategory
                icon={<Code className="w-5 h-5" />}
                title="Technical Skills"
                skills={[
                  "Full-stack web development",
                  "Responsive UI design",
                  "RESTful API development",
                  "Database design & optimization",
                  "State management",
                ]}
              />
              <SkillCategory
                icon={<Briefcase className="w-5 h-5" />}
                title="Professional Skills"
                skills={[
                  "Remote collaboration",
                  "Project management",
                  "Client communication",
                  "Time management",
                  "Problem-solving",
                ]}
              />
              <SkillCategory
                icon={<Award className="w-5 h-5" />}
                title="Academic Achievements"
                skills={[
                  "Research methodology",
                  "Data analysis",
                  "Technical writing",
                  "Algorithm design",
                  "Critical thinking",
                ]}
              />
            </div>
          </CustomCard>
        </FadeIn>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <CustomButton
            variant="gradient"
            glowEffect
            animateOnHover
            className="px-8"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            View Full Resume
          </CustomButton>
        </div>
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  location?: string
  description: string
  skills: string[]
  type: "work" | "research"
}

function ExperienceCard({ title, company, period, location, description, skills, type }: ExperienceCardProps) {
  return (
    <CustomCard variant="glass" hoverEffect="lift" className="border border-primary/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-bold text-primary">{title}</h4>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {period}
          </Badge>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Building className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{company}</span>

          {location && (
            <>
              <span className="text-muted-foreground mx-1">•</span>
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{location}</span>
            </>
          )}
        </div>

        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <TooltipProvider key={skill}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={`
                      ${type === "work" ? "bg-primary/10 hover:bg-primary/20" : "bg-blue-500/10 hover:bg-blue-500/20"} 
                      transition-colors cursor-default
                    `}
                  >
                    {skill}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Used in {type === "work" ? "professional projects" : "research"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </CustomCard>
  )
}

interface EducationCardProps {
  degree: string
  institution: string
  period: string
  gpa: string
  maxGpa: string
  achievements: string[]
}

function EducationCard({ degree, institution, period, gpa, maxGpa, achievements }: EducationCardProps) {
  return (
    <CustomCard variant="glass" hoverEffect="lift" className="border border-primary/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-bold text-primary">{degree}</h4>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {period}
          </Badge>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Building className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{institution}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/70"
              initial={{ width: 0 }}
              whileInView={{ width: `${(Number.parseFloat(gpa) / Number.parseFloat(maxGpa)) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <span className="font-bold text-primary whitespace-nowrap">
            GPA: {gpa}/{maxGpa}
          </span>
        </div>

        {achievements.length > 0 && (
          <div className="mt-4">
            <h5 className="font-medium mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Achievements
            </h5>
            <ul className="space-y-1">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </CustomCard>
  )
}

interface SkillCategoryProps {
  icon: React.ReactNode
  title: string
  skills: string[]
}

function SkillCategory({ icon, title, skills }: SkillCategoryProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.2)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="bg-card/50 rounded-lg p-5 border border-primary/10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
        <h4 className="text-lg font-bold">{title}</h4>
      </div>

      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="flex items-start gap-2"
          >
            <span className="text-primary mt-1">•</span>
            <span className="text-muted-foreground">{skill}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { User, Briefcase, GraduationCap, Award, Github, Linkedin, Mail } from "lucide-react"
import { useSpaceTheme } from "./theme-context"
import { CustomCard } from "./custom-card"
import { RevealText, GradientText } from "./text-effects"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { themeColors } = useSpaceTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" ref={sectionRef} className="relative py-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-lg border border-primary/20 mb-4 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
              <h2 className="text-2xl font-bold text-primary flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                <GradientText text="About Me" from="hsl(var(--primary))" to="#ffffff" />
              </h2>
            </div>

            <p className="text-foreground leading-relaxed font-medium">
              <RevealText text="I'm a results-driven software developer with expertise in full-stack development and business intelligence solutions. I have a strong analytical mindset with exceptional problem-solving abilities." />
            </p>

            <p className="text-foreground leading-relaxed font-medium">
              <RevealText
                text="I specialize in creating responsive, data-driven applications and implementing modern frontend architectures. I have a proven track record in developing enterprise-level analytics dashboards and maintaining high-performance web applications."
                delay={0.2}
              />
            </p>

            <p className="text-foreground leading-relaxed font-medium">
              <RevealText
                text="I'm experienced in remote collaboration with international teams and delivering solutions for global markets. I'm skilled at breaking down complex problems into manageable components and architecting efficient, scalable solutions."
                delay={0.4}
              />
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <motion.a
                href="https://github.com/saniulislam58"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: themeColors.buttonGlow,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">GitHub</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/saniulislam58"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: themeColors.buttonGlow,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">LinkedIn</span>
              </motion.a>
              <motion.a
                href="mailto:saniulislam58@gmail.com"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: themeColors.buttonGlow,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">Email</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <CustomCard
              className="border border-primary/20 shadow-lg hover:border-primary/40 p-6"
              style={{
                boxShadow: `0 0 20px hsl(var(--primary)/0.2)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-1">Work Experience</h3>
                  <p className="text-primary font-medium">Common Analytics (SMAQ)</p>
                  <p className="text-muted-foreground text-sm">Nov 2024 - Present | Remote - Hong Kong Based</p>
                  <p className="text-foreground mt-2">Frontend Engineer → Full Stack Engineer</p>
                </div>
              </div>
            </CustomCard>

            <CustomCard
              className="border border-primary/20 shadow-lg hover:border-primary/40 p-6"
              style={{
                boxShadow: `0 0 20px hsl(var(--primary)/0.2)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-1">Education</h3>
                  <p className="text-primary font-medium">Bachelor of Science in Computer Science & Engineering</p>
                  <p className="text-muted-foreground text-sm">Independent University, Bangladesh | 2020-present</p>
                  <p className="text-foreground mt-2">CGPA: 3.6 (out of 4)</p>
                </div>
              </div>
            </CustomCard>

            <CustomCard
              className="border border-primary/20 shadow-lg hover:border-primary/40 p-6"
              style={{
                boxShadow: `0 0 20px hsl(var(--primary)/0.2)`,
                background: "linear-gradient(to bottom right, hsl(var(--card)/0.9), hsl(var(--card)/0.7))",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Achievements</h3>
                  <ul className="text-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Dean's List (2020, 2021) & Vice Chancellor's List (2022)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Runner-up in Tech Fest, IUB (Web Application Course)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>200+ programming challenges solved on LeetCode, Codeforces, and HackerRank</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Improved team efficiency by 30% through custom UI library</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CustomCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

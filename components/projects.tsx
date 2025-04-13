"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"
import Image from "next/image"
import { CustomCard } from "@/components/ui/custom-card"
import { CustomButton } from "@/components/ui/custom-button"
import { AnimatedBadge } from "@/components/ui/animated-badge"
import { GradientText, RevealText } from "@/components/text-effects"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  details: string
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const projects: Project[] = [
    {
      id: "travel-tourism",
      title: "Travel and Tourism Management System",
      description:
        "A comprehensive travel and tourism management system with user-friendly interface and efficient database management.",
      image: "/travel.png",
      tags: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "Bootstrap", "MySQL"],
      liveUrl: "https://github.com/Sani1189/travel-and-tourism-management-system",
      githubUrl: "https://github.com/Sani1189/travel-and-tourism-management-system",
      details:
        "This Travel and Tourism Management System provides a comprehensive solution for managing travel bookings, packages, and customer information. The system features a user-friendly interface built with HTML, CSS, Bootstrap, and JavaScript for dynamic content and interactions. The backend is implemented with PHP to handle server-side operations and MySQL for efficient database management. Key features include user authentication, package browsing and booking, payment processing, and admin dashboard for managing bookings and packages.",
    },
    {
      id: "daily-sunrise",
      title: "The Daily SunRise Online Newspaper",
      description:
        "An online news portal with modern and responsive user interfaces built using Next.js and Tailwind CSS.",
      image: "/news.png?height=400&width=600",
      tags: ["Next.js", "React.js", "Tailwind CSS", "MongoDB"],
      liveUrl: "https://the-daily-sunrise.netlify.app/",
      githubUrl: "https://github.com/Sani1189/the-daily-sunrise",
      details:
        "The Daily SunRise is an online newspaper portal developed using Next.js and Tailwind CSS for creating modern and responsive user interfaces. The application features a clean, intuitive design that adapts to various screen sizes. MongoDB with Mongoose was utilized for data management, ensuring efficient storage and retrieval of news articles, user data, and comments. The system includes features such as categorized news sections, search functionality, user authentication, commenting system, and an admin panel for content management. The application is optimized for performance with server-side rendering and image optimization.",
    },
    {
      id: "violence-detection",
      title: "Violence Detection and Classification",
      description:
        "Research project on computer vision for violence detection and classification using CNN and LSTM models.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Python", "Computer Vision", "CNN", "LSTM", "Machine Learning"],
      details:
        "This ongoing research project focuses on violence detection and classification in video content using computer vision techniques. The system employs Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) models to analyze video frames and detect violent content. The research includes comparative analysis with multiple datasets to enhance model accuracy and performance. The project aims to develop a robust system that can be integrated into surveillance systems, content moderation platforms, and other applications requiring violence detection. The implementation is primarily in Python, utilizing libraries such as TensorFlow, Keras, and OpenCV.",
    },
    {
      id: "smaq-dashboard",
      title: "SMAQ Analytics Dashboard",
      description:
        "Enterprise-level analytics dashboard with interactive data visualizations and real-time data fetching.",
      image: "/smaq.png?height=400&width=600",
      tags: ["Next.js", "React", "Chart.js", "ApexCharts", "Tailwind CSS", "React Query"],
      details:
        "Developed as part of my work at Common Analytics (SMAQ), this enterprise-level analytics dashboard provides comprehensive business intelligence solutions. The dashboard features interactive data visualizations created using Chart.js and ApexCharts, with a responsive design implemented using Tailwind CSS. Real-time data fetching and state management are handled using React Query, significantly reducing redundant API calls and improving performance. The dashboard includes various components such as data tables, filters, and export functionality, all designed with a focus on user experience and performance.",
    },
  ]

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
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            <GradientText text="Projects" animate={true} from="hsl(var(--primary))" to="#ffffff" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <RevealText text="Here are some of the projects I've worked on. Click on a project to learn more about it." />
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(project)}
            >
              <CustomCard
                variant="glass"
                className="overflow-hidden cursor-pointer h-full"
                style={{
                  boxShadow: "0 0 20px hsl(var(--primary)/0.2)",
                  borderColor: "hsl(var(--primary)/0.2)",
                }}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    <GradientText text={project.title} />
                  </h3>
                  <p className="text-muted-foreground mb-4 font-medium">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <AnimatedBadge key={`${project.id}-${tag}`} variant="secondary" className="text-xs" glowEffect>
                        {tag}
                      </AnimatedBadge>
                    ))}
                  </div>
                  <CustomButton
                    variant="gradient"
                    className="w-full"
                    glowEffect
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProject(project)
                    }}
                  >
                    View Details
                  </CustomButton>
                </div>
              </CustomCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
                <button
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <AnimatedBadge
                      key={`modal-${selectedProject.id}-${tag}`}
                      variant="secondary"
                      className="text-xs"
                      glowEffect
                    >
                      {tag}
                    </AnimatedBadge>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">{selectedProject.details}</p>
                <div className="flex flex-wrap gap-4">
                  {selectedProject.liveUrl && (
                    <CustomButton
                      variant="gradient"
                      glowEffect
                      onClick={() => window.open(selectedProject.liveUrl, "_blank")}
                    >
                      Live Demo
                    </CustomButton>
                  )}
                  {selectedProject.githubUrl && (
                    <CustomButton
                      variant="outline"
                      onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                    >
                      View Code
                    </CustomButton>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

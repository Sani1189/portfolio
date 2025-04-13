"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Camera,
  Gamepad2,
  BookOpen,
  Music,
  Plane,
  MountainIcon as Mountains,
  ChefHat,
  Dumbbell,
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import { CustomCard } from "@/components/ui/custom-card"
import { CustomButton } from "@/components/ui/custom-button"
import { FadeIn, StaggerContainer, StaggerItem, ZoomIn } from "@/components/section-transitions"
import { GradientText, RevealText } from "@/components/text-effects"
import { useSpaceTheme } from "./theme-context"
import { AnimatedBadge } from "@/components/ui/animated-badge"

// Hobby interface
interface Hobby {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
  images: string[]
  details: {
    since: string
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    favoriteAspect: string
    funFact: string
  }
}

export default function Hobbies() {
  const { themeColors } = useSpaceTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Hobbies data
  const hobbies: Hobby[] = [
    {
      id: "photography",
      icon: <Camera className="w-6 h-6" />,
      title: "Photography",
      description: "Capturing moments and exploring visual storytelling through the lens.",
      color: "#3b82f6",
      images: [
        "/placeholder.svg?height=400&width=800&text=Landscape+Photography",
        "/placeholder.svg?height=400&width=800&text=Street+Photography",
        "/placeholder.svg?height=400&width=800&text=Portrait+Photography",
      ],
      details: {
        since: "2018",
        level: "Intermediate",
        favoriteAspect: "Finding unique perspectives in ordinary scenes and playing with natural light.",
        funFact: "My photo of a misty mountain sunrise was featured in a local travel magazine.",
      },
    },
    {
      id: "gaming",
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Gaming",
      description: "Exploring virtual worlds and enjoying competitive and cooperative gameplay experiences.",
      color: "#8b5cf6",
      images: [
        "/placeholder.svg?height=400&width=800&text=Gaming+Setup",
        "/placeholder.svg?height=400&width=800&text=Favorite+Games",
      ],
      details: {
        since: "2010",
        level: "Advanced",
        favoriteAspect: "Strategy games that require critical thinking and team-based competitive games.",
        funFact: "Reached Diamond rank in League of Legends and participated in several local tournaments.",
      },
    },
    {
      id: "reading",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Reading",
      description:
        "Diving into books across various genres, from science fiction to philosophy and technical literature.",
      color: "#10b981",
      images: [
        "/placeholder.svg?height=400&width=800&text=Book+Collection",
        "/placeholder.svg?height=400&width=800&text=Reading+Corner",
      ],
      details: {
        since: "2008",
        level: "Expert",
        favoriteAspect: "Exploring complex ideas and different perspectives through literature and non-fiction.",
        funFact: "I maintain a digital library of over 500 books and read at least 30 books per year.",
      },
    },
    {
      id: "music",
      icon: <Music className="w-6 h-6" />,
      title: "Music",
      description: "Playing guitar, exploring different genres, and creating digital music compositions.",
      color: "#f59e0b",
      images: [
        "/placeholder.svg?height=400&width=800&text=Guitar+Collection",
        "/placeholder.svg?height=400&width=800&text=Home+Studio",
      ],
      details: {
        since: "2015",
        level: "Intermediate",
        favoriteAspect: "The creative process of composing and the technical aspects of music production.",
        funFact:
          "Created background music for a friend's indie game project that was showcased at a local game dev meetup.",
      },
    },
    {
      id: "travel",
      icon: <Plane className="w-6 h-6" />,
      title: "Travel",
      description: "Exploring new cultures, cuisines, and landscapes around the world.",
      color: "#ec4899",
      images: [
        "/placeholder.svg?height=400&width=800&text=Travel+Destinations",
        "/placeholder.svg?height=400&width=800&text=Travel+Memories",
      ],
      details: {
        since: "2016",
        level: "Intermediate",
        favoriteAspect: "Immersing in local cultures and discovering hidden gems off the tourist path.",
        funFact:
          "Once spent three days living with a local family in a remote village with no electricity or running water.",
      },
    },
    {
      id: "hiking",
      icon: <Mountains className="w-6 h-6" />,
      title: "Hiking",
      description: "Exploring nature trails, mountains, and enjoying the serenity of the outdoors.",
      color: "#ef4444",
      images: [
        "/placeholder.svg?height=400&width=800&text=Mountain+Trails",
        "/placeholder.svg?height=400&width=800&text=Scenic+Views",
      ],
      details: {
        since: "2019",
        level: "Intermediate",
        favoriteAspect: "The physical challenge combined with breathtaking views and peaceful moments in nature.",
        funFact: "Completed a 30-mile trail in a single day, which tested my physical and mental endurance.",
      },
    },
    {
      id: "cooking",
      icon: <ChefHat className="w-6 h-6" />,
      title: "Cooking",
      description: "Experimenting with recipes from around the world and creating fusion dishes.",
      color: "#0ea5e9",
      images: [
        "/placeholder.svg?height=400&width=800&text=Culinary+Creations",
        "/placeholder.svg?height=400&width=800&text=Kitchen+Experiments",
      ],
      details: {
        since: "2017",
        level: "Intermediate",
        favoriteAspect: "The creativity of combining flavors and techniques from different cuisines.",
        funFact: "Hosted a themed dinner party where each course represented a different country I've visited.",
      },
    },
    {
      id: "fitness",
      icon: <Dumbbell className="w-6 h-6" />,
      title: "Fitness",
      description: "Maintaining physical health through various workout routines and sports activities.",
      color: "#14b8a6",
      images: [
        "/placeholder.svg?height=400&width=800&text=Workout+Routine",
        "/placeholder.svg?height=400&width=800&text=Sports+Activities",
      ],
      details: {
        since: "2014",
        level: "Advanced",
        favoriteAspect: "The discipline of consistent training and the satisfaction of achieving fitness goals.",
        funFact: "Completed a half-marathon with only two months of specific training.",
      },
    },
  ]

  // Hobby card component with interactive elements
  const HobbyCard = ({ hobby }: { hobby: Hobby }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setSelectedHobby(hobby)}
        className="cursor-pointer h-full"
      >
        <CustomCard
          variant="glass"
          className="h-full border border-primary/20 overflow-hidden relative"
          style={{
            boxShadow: isHovered ? `0 10px 30px -5px ${hobby.color}30` : `0 0 20px ${hobby.color}20`,
            background: `linear-gradient(135deg, ${hobby.color}10, ${hobby.color}05)`,
            transition: "all 0.3s ease",
          }}
        >
          {/*  ${hobby.color}05)`,
            transition: "all 0.3s ease",
          }}
        >
          {/* Interactive background effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.2 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${hobby.color}, transparent 70%)`,
            }}
          />

          <div className="p-6 relative z-10">
            <motion.div
              animate={{
                y: isHovered ? -5 : 0,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${hobby.color}20`, color: hobby.color }}
            >
              {hobby.icon}
            </motion.div>

            <h3 className="text-xl font-bold mb-2" style={{ color: hobby.color }}>
              {hobby.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">{hobby.description}</p>

            <div className="flex justify-between items-center">
              <AnimatedBadge
                variant="outline"
                style={{
                  borderColor: `${hobby.color}40`,
                  color: hobby.color,
                }}
              >
                {hobby.details.level}
              </AnimatedBadge>

              <motion.span
                animate={{
                  x: isHovered ? 5 : 0,
                  opacity: isHovered ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: hobby.color }}
              >
                View Details <ArrowRight className="w-3 h-3" />
              </motion.span>
            </div>
          </div>
        </CustomCard>
      </motion.div>
    )
  }

  // Hobby detail modal component
  const HobbyDetailModal = () => {
    if (!selectedHobby) return null

    // Image gallery navigation
    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % selectedHobby.images.length)
    }

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + selectedHobby.images.length) % selectedHobby.images.length)
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        onClick={() => setSelectedHobby(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-card/95 rounded-xl border border-primary/20 shadow-2xl w-full max-w-4xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedHobby(null)
              }}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image gallery */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={selectedHobby.images[currentImageIndex] || "/placeholder.svg?height=400&width=800"}
                  alt={selectedHobby.title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Image navigation */}
              {selectedHobby.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image indicators */}
              {selectedHobby.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {selectedHobby.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index ? "bg-white w-4" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2"
                  style={{ backgroundColor: `${selectedHobby.color}30`, color: selectedHobby.color }}
                >
                  {selectedHobby.icon}
                  <span className="font-medium">{selectedHobby.title}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">My {selectedHobby.title} Journey</h3>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: `${selectedHobby.color}10`, borderLeft: `3px solid ${selectedHobby.color}` }}
              >
                <h4 className="text-sm font-semibold mb-1" style={{ color: selectedHobby.color }}>
                  Since
                </h4>
                <p className="text-foreground">{selectedHobby.details.since}</p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: `${selectedHobby.color}10`, borderLeft: `3px solid ${selectedHobby.color}` }}
              >
                <h4 className="text-sm font-semibold mb-1" style={{ color: selectedHobby.color }}>
                  Skill Level
                </h4>
                <p className="text-foreground">{selectedHobby.details.level}</p>
              </div>
              <div
                className="rounded-lg p-4 sm:col-span-2"
                style={{ backgroundColor: `${selectedHobby.color}10`, borderLeft: `3px solid ${selectedHobby.color}` }}
              >
                <h4 className="text-sm font-semibold mb-1" style={{ color: selectedHobby.color }}>
                  Favorite Aspect
                </h4>
                <p className="text-foreground">{selectedHobby.details.favoriteAspect}</p>
              </div>
            </div>

            <div
              className="rounded-lg p-4 mb-6"
              style={{ backgroundColor: `${selectedHobby.color}10`, border: `1px dashed ${selectedHobby.color}40` }}
            >
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 mt-0.5" style={{ color: selectedHobby.color }} />
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: selectedHobby.color }}>
                    Fun Fact
                  </h4>
                  <p className="text-muted-foreground">{selectedHobby.details.funFact}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <CustomButton variant="outline" onClick={() => setSelectedHobby(null)}>
                Close
              </CustomButton>
              {selectedHobby.id === "photography" && (
                <CustomButton
                  variant="default"
                  style={{ backgroundColor: selectedHobby.color, color: "white" }}
                  className="gap-2"
                  onClick={() => window.open("https://unsplash.com", "_blank")}
                >
                  View Gallery <ExternalLink className="w-4 h-4" />
                </CustomButton>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Interactive hobby showcase
  const HobbyShowcase = () => {
    return (
      <div className="mt-16 rounded-2xl overflow-hidden border border-primary/20 bg-card/30">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              <GradientText text="Why Hobbies Matter" />
            </h3>
            <p className="text-muted-foreground mb-4">
              My diverse interests outside of programming help me maintain creativity, perspective, and work-life
              balance. These activities often inspire unique solutions to technical problems and keep my mind fresh.
            </p>
            <p className="text-muted-foreground">
              Whether I'm capturing a perfect sunset photo, exploring a new hiking trail, or mastering a complex recipe,
              I bring the same dedication and attention to detail that I apply to my development work.
            </p>

            <div className="mt-6">
              <CustomButton
                variant="default"
                size="sm"
                glowEffect
                onClick={() => {
                  const randomIndex = Math.floor(Math.random() * hobbies.length)
                  setSelectedHobby(hobbies[randomIndex])
                }}
              >
                Discover a Random Hobby
              </CustomButton>
            </div>
          </div>

          <div className="relative h-64 md:h-auto overflow-hidden">
            {/* Interactive image collage */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
              {[...Array(4)].map((_, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05, zIndex: 10 }} className="relative overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=200&width=300&text=Hobby+${i + 1}`}
                    alt={`Hobby ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2"
                  >
                    <span className="text-xs text-white font-medium">{hobbies[i % hobbies.length].title}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="hobbies" ref={sectionRef} className="relative py-20 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: "hsl(var(--primary))",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl z-10 relative">
        <FadeIn direction="up" duration={0.8}>
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                <GradientText text="Beyond Coding" animate={true} />
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <RevealText text="Exploring life beyond the screen. These passions fuel my creativity and bring balance to my technical work." />
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerAmount={0.1}>
          {hobbies.map((hobby) => (
            <StaggerItem key={hobby.id}>
              <HobbyCard hobby={hobby} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Hobby showcase */}
        <ZoomIn delay={0.3}>
          <HobbyShowcase />
        </ZoomIn>

        {/* Hobby detail modal */}
        <AnimatePresence>{selectedHobby && <HobbyDetailModal />}</AnimatePresence>
      </div>
    </section>
  )
}

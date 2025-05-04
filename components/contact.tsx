"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CustomButton } from "./custom-button"
import { useSpaceTheme } from "./theme-context"
import { RevealText } from "./text-effects"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export default function Contact() {
  const { themeColors } = useSpaceTheme()
  const [stars, setStars] = useState<
    Array<{
      width: number
      height: number
      top: string
      left: string
      opacity: number
      animation: string
    }>
  >([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Generate consistent stars
    const generatedStars = Array.from({ length: 20 }, (_, i) => {
      // Use seeded values instead of pure random
      const seed = i * 0.1 + 20 // Different seed than other components
      const width = 1 + Math.sin(seed * 5) * 1.5
      const height = 1 + Math.cos(seed * 7) * 1.5
      const top = `${(Math.sin(seed * 10) * 50 + 50).toFixed(2)}%`
      const left = `${(Math.cos(seed * 15) * 50 + 50).toFixed(2)}%`
      const opacity = 0.3 + Math.sin(seed * 3) * 0.5
      const duration = 3 + Math.sin(seed * 2) * 5
      const delay = Math.cos(seed * 5) * 5

      return {
        width,
        height,
        top,
        left,
        opacity,
        animation: `twinkle ${duration.toFixed(2)}s infinite ${delay.toFixed(2)}s`,
      }
    })

    setStars(generatedStars)
  }, [])

  // If not mounted yet, return a simple placeholder to avoid hydration mismatch
  if (!isMounted) {
    return <section id="contact" className="relative py-20 px-4"></section>
  }

  return (
    <section id="contact" style={{ position: "relative" }} className="jsx-9d9ee921a8a6c62f py-20 px-4">
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: var(--opacity);
            transform: scale(1);
          }
          50% {
            opacity: calc(var(--opacity) + 0.3);
            transform: scale(1.3);
          }
          100% {
            opacity: var(--opacity);
            transform: scale(1);
          }
        }
      `}</style>

      <div className="jsx-9d9ee921a8a6c62f absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            style={
              {
                width: star.width,
                height: star.height,
                top: star.top,
                left: star.left,
                opacity: star.opacity,
                animation: star.animation,
                "--opacity": star.opacity,
              } as React.CSSProperties
            }
            className="jsx-9d9ee921a8a6c62f absolute bg-primary/70 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <RevealText text="Let's Work Together" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            <RevealText text="Have a project in mind or want to discuss potential opportunities? I'd love to hear from you." />
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="text-muted-foreground">
              Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative
              ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Email</h4>
                  <a
                    href="mailto:saniulislam58@gmail.com"
                    className="text-primary hover:underline transition-all duration-300"
                  >
                    saniulislam58@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Phone</h4>
                  <a href="tel:+8801835-025522" className="text-primary hover:underline transition-all duration-300">
                    +8801835-025522
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Location</h4>
                  <p className="text-muted-foreground">Bashundhara R/A, Dhaka-1229, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Sani1189"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/saniul-islam-sani-841898281/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form
              className="space-y-6 p-6 rounded-xl backdrop-blur-sm border border-primary/10"
              style={{ background: "linear-gradient(145deg, hsl(var(--card)/0.3), hsl(var(--card)/0.5))" }}
            >
              <h3 className="text-2xl font-bold">Send Me a Message</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-background/50 border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-background/50 border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Subject of your message"
                    className="bg-background/50 border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={5}
                    className="bg-background/50 border-primary/20 focus:border-primary resize-none"
                  />
                </div>
              </div>

              <CustomButton
                variant="gradient"
                glowEffect
                animateOnHover
                className="w-full shadow-lg transition-all duration-300"
                style={{
                  boxShadow: themeColors.buttonGlow,
                  background: `linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.7))`,
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </span>
              </CustomButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp, Heart, Code } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { GradientText } from "@/components/text-effects"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Hobbies", href: "#hobbies" },
    { name: "Contact", href: "#contact" },
  ]

  // Social links
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Sani1189",
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/saniul-islam-sani-841898281/",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: "Email",
      href: "mailto:saniulislam58@gmail.com",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      name: "Phone",
      href: "tel:+8801835025522",
      icon: <Phone className="w-5 h-5" />,
    },
  ]

  // Contact info
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      text: "saniulislam58@gmail.com",
      href: "mailto:saniulislam58@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      text: "+8801835025522",
      href: "tel:+8801835025522",
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      text: "Dhaka, Bangladesh",
    },
  ]

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Update URL without page reload
      window.history.pushState({}, "", href)
    }
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* About column */}
          <div className="md:col-span-4">
            <Link href="#home" onClick={(e) => scrollToSection(e, "#home")}>
              <h3 className="text-2xl font-bold text-primary mb-4">Saniul Islam</h3>
            </Link>
            <p className="text-muted-foreground mb-6">
              Full-stack developer specializing in creating responsive, data-driven applications with a focus on
              exceptional user experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">More</h3>
            <ul className="space-y-2">
              {navLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1">{item.icon}</div>
                  <div>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{item.text}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} <GradientText text="Saniul Islam" /> • All rights reserved
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="flex items-center">
              Made with <Heart className="w-4 h-4 text-primary mx-1" /> and{" "}
              <Code className="w-4 h-4 text-primary mx-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <CustomButton
              variant="gradient"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </CustomButton>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

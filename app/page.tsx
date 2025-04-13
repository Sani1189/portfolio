import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Services from "@/components/services"
import Hobbies from "@/components/hobbies"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ThemeBackgroundController from "@/components/theme-background-controller"
import TechnologyShowcase from "@/components/technology-showcase"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ThemeBackgroundController />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <TechnologyShowcase />
      <Services />
      <Hobbies />
      <Contact />
      <Footer />
    </main>
  )
}

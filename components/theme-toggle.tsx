"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Check, Monitor, Sparkles } from "lucide-react"
import { useSpaceTheme } from "./theme-context"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { spaceTheme, setSpaceTheme } = useSpaceTheme()
  const [mounted, setMounted] = React.useState(false)
  const [colorScheme, setColorScheme] = React.useState<string | undefined>(undefined)
  const [isOpen, setIsOpen] = React.useState(false)

  // Update color scheme
  React.useEffect(() => {
    if (mounted) {
      // Remove any existing theme data attribute
      document.documentElement.removeAttribute("data-theme")

      // Add new theme data attribute if a color scheme is selected
      if (colorScheme) {
        document.documentElement.setAttribute("data-theme", colorScheme)
      }
    }
  }, [colorScheme, mounted])

  // Handle initial mount
  React.useEffect(() => {
    setMounted(true)

    // Get initial color scheme from localStorage if available
    const savedColorScheme = localStorage.getItem("color-scheme")
    if (savedColorScheme) {
      setColorScheme(savedColorScheme)
    }
    
    // Log current space theme for debugging
    console.log("Initial space theme:", spaceTheme)
  }, [spaceTheme])

  // Replace the handleColorSchemeChange function with this optimized version
  const handleColorSchemeChange = (value: string) => {
    console.log("Changing color scheme to:", value)
    // Update state and localStorage
    setColorScheme(value)
    localStorage.setItem("color-scheme", value)

    // Apply the theme attribute directly without removing it first
    document.documentElement.setAttribute("data-theme", value || "")

    // Use a lightweight approach to notify about theme changes
    // This avoids heavy DOM manipulations
    window.dispatchEvent(
      new CustomEvent("themeChanged", {
        detail: { colorScheme: value, theme },
      }),
    )
  }
  
  // Add a handler for space theme changes
  const handleSpaceThemeChange = (value: "galaxy" | "nebula") => {
    console.log("Changing space theme to:", value)
    setSpaceTheme(value)
  }

  if (!mounted) {
    return null
  }

  interface ColorSchemeButtonProps {
    value: string
    label: string
    color: string
    currentValue: string
    onChange: (value: string) => void
  }

  // Replace the ColorSchemeButton component with this optimized version
  function ColorSchemeButton({ value, label, color, currentValue, onChange }: ColorSchemeButtonProps) {
    return (
      <button
        className="flex flex-col items-center justify-center gap-1 p-1 rounded-md hover:bg-primary/10 transition-colors"
        onClick={() => onChange(value)}
        title={label}
      >
        <div
          className={`w-6 h-6 rounded-full ${color} ${currentValue === value ? "ring-1 ring-primary ring-offset-1" : ""}`}
        ></div>
        <span className="text-xs font-medium">{label}</span>
      </button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative overflow-hidden hover:bg-primary/10 transition-colors">
          {theme === "dark" ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 border-primary/20 bg-background/95 backdrop-blur-sm animate-fade-in shadow-lg"
      >
        <DropdownMenuLabel className="text-primary font-medium">Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/10" />

        {/* Theme Mode Selection */}
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem
            value="light"
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-colors"
          >
            <Sun className="mr-2 h-4 w-4 text-primary" />
            <span>Light</span>
            {theme === "light" && <Check className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            value="dark"
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-colors"
          >
            <Moon className="mr-2 h-4 w-4 text-primary" />
            <span>Dark</span>
            {theme === "dark" && <Check className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            value="system"
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-colors"
          >
            <Monitor className="mr-2 h-4 w-4 text-primary" />
            <span>System</span>
            {theme === "system" && <Check className="ml-auto h-4 w-4 text-primary" />}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuLabel className="text-primary font-medium">Color Scheme</DropdownMenuLabel>

        {/* Color Scheme Selection */}
        <div className="p-2 grid grid-cols-4 gap-2">
          <ColorSchemeButton
            value=""
            label="Default"
            color="bg-gradient-to-br from-gray-900 to-gray-600 dark:from-gray-50 dark:to-gray-300"
            currentValue={colorScheme || ""}
            onChange={handleColorSchemeChange}
          />

          <ColorSchemeButton
            value="red"
            label="Red"
            color="bg-red-500"
            currentValue={colorScheme || ""}
            onChange={handleColorSchemeChange}
          />

          <ColorSchemeButton
            value="rose"
            label="Rose"
            color="bg-rose-500"
            currentValue={colorScheme || ""}
            onChange={handleColorSchemeChange}
          />

          <ColorSchemeButton
            value="orange"
            label="Orange"
            color="bg-orange-500"
            currentValue={colorScheme || ""}
            onChange={handleColorSchemeChange}
          />

          <ColorSchemeButton
            value="green"
            label="Green"
            color="bg-green-500"
            currentValue={colorScheme || ""}
            onChange={handleColorSchemeChange}
          />

          <ColorSchemeButton
            value="blue"
            label="Blue"
            color="bg-blue-500"
            currentValue={colorScheme || ""}
            onChange={handleColorSchemeChange}
          />

          <ColorSchemeButton
            value="yellow"
            label="Yellow"
            color="bg-yellow-500"
            currentValue={colorScheme || ""}
            onChange={handleColorSchemeChange}
          />

          <ColorSchemeButton
            value="violet"
            label="Violet"
            color="bg-violet-500"
            currentValue={colorScheme || ""}
            onChange={handleColorSchemeChange}
          />
        </div>

        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuLabel className="text-primary font-medium">Space Theme</DropdownMenuLabel>

        {/* Space Theme Selection - Updated options */}
        <DropdownMenuRadioGroup value={spaceTheme} onValueChange={handleSpaceThemeChange as any}>
          <DropdownMenuRadioItem
            value="galaxy"
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-colors"
          >
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span>Galaxy</span>
            {spaceTheme === "galaxy" && <Check className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            value="nebula"
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-colors"
          >
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span>Nebula</span>
            {spaceTheme === "nebula" ? <Check className="ml-auto h-4 w-4 text-primary" /> : null}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabItem {
  value: string
  label: React.ReactNode
  content: React.ReactNode
  icon?: React.ReactNode
}

interface AnimatedTabsProps {
  tabs: TabItem[]
  defaultValue?: string
  className?: string
  tabsClassName?: string
  contentClassName?: string
  variant?: "underline" | "pills" | "boxed" | "gradient"
  orientation?: "horizontal" | "vertical"
  onChange?: (value: string) => void
}

export function AnimatedTabs({
  tabs,
  defaultValue,
  className,
  tabsClassName,
  contentClassName,
  variant = "underline",
  orientation = "horizontal",
  onChange,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || tabs[0]?.value)
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to prevent hydration issues
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onChange?.(value)
  }

  // Get variant-specific classes
  const getVariantClasses = (isActive: boolean) => {
    switch (variant) {
      case "pills":
        return isActive
          ? "bg-primary text-primary-foreground rounded-full shadow-md"
          : "text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-full"
      case "boxed":
        return isActive
          ? "bg-background text-primary border-b-2 border-primary rounded-t-lg shadow-sm"
          : "text-muted-foreground hover:text-foreground border-b border-border hover:border-primary/30 rounded-t-lg"
      case "gradient":
        return isActive
          ? "bg-gradient-to-r from-primary to-primary/70 text-primary-foreground rounded-md shadow-md"
          : "text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-md"
      case "underline":
      default:
        return isActive
          ? "text-primary font-medium"
          : "text-muted-foreground hover:text-foreground hover:text-primary/80"
    }
  }

  if (!mounted) {
    return <div className="w-full h-20 bg-muted/20 animate-pulse rounded-md"></div>
  }

  return (
    <div
      className={cn(
        "w-full",
        orientation === "vertical" ? "flex flex-row gap-4 flex-wrap md:flex-nowrap" : "flex flex-col",
        className,
      )}
    >
      <div
        className={cn(
          orientation === "vertical"
            ? "flex flex-col gap-2 min-w-[150px] md:max-w-[200px] flex-shrink-0"
            : "flex flex-wrap gap-2 justify-center",
          tabsClassName,
        )}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={cn(
              "px-4 py-2 transition-all relative flex items-center gap-2",
              getVariantClasses(activeTab === tab.value),
            )}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              boxShadow: activeTab === tab.value ? "0 0 15px hsl(var(--primary)/0.3)" : "none",
            }}
          >
            {tab.icon}
            {tab.label}
            {variant === "underline" && activeTab === tab.value && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <div className={cn("relative w-full", orientation === "vertical" ? "mt-0" : "mt-6", contentClassName)}>
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={cn(
              "transition-all duration-300 ease-in-out w-full",
              activeTab === tab.value ? "opacity-100 visible" : "opacity-0 invisible absolute inset-0",
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

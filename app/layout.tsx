import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider as NextThemesProvider } from "@/components/theme-provider"
import { ThemeProvider } from "@/components/theme-context"
import { Toaster } from "@/components/ui/toaster"
import ThemeBackgroundController from "@/components/theme-background-controller"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Saniul Islam Sani | Full Stack Engineer",
  description:
    "Portfolio website of Saniul Islam Sani, a Full Stack Engineer specializing in Next.js, React, and modern web technologies.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeProvider>
            <ThemeBackgroundController />
            {children}
            <Toaster />
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  )
}


import './globals.css'
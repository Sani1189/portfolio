"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts"

interface ChartProps {
  className?: string
  animated?: boolean
  data: any[]
}

export function AnimatedLineChart({ className = "", animated = true, data }: ChartProps) {
  const { resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [chartWidth, setChartWidth] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (ref.current) {
      setChartWidth(ref.current.clientWidth)
    }

    const handleResize = () => {
      if (ref.current) {
        setChartWidth(ref.current.clientWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const textColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
  const gridColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"

  // Ensure we have data to display
  const chartData =
    data && data.length > 0
      ? data
      : [
          { name: "Item 1", value: 85, value2: 80 },
          { name: "Item 2", value: 75, value2: 70 },
          { name: "Item 3", value: 90, value2: 85 },
          { name: "Item 4", value: 80, value2: 75 },
          { name: "Item 5", value: 70, value2: 65 },
        ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(var(--primary), 0.15)",
        transition: { duration: 0.3 },
      }}
      className={`w-full h-full ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)",
              borderColor: gridColor,
              color: textColor,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              padding: "10px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Project Progress"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-1))", r: 6, strokeWidth: 2, stroke: isDark ? "#000" : "#fff" }}
            activeDot={{ r: 8, strokeWidth: 2, stroke: isDark ? "#000" : "#fff" }}
            isAnimationActive={animated}
            animationDuration={2000}
            animationEasing="ease-in-out"
          />
          <Line
            type="monotone"
            dataKey="value2"
            name="Overall Progress"
            stroke="hsl(var(--chart-2))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-2))", r: 6, strokeWidth: 2, stroke: isDark ? "#000" : "#fff" }}
            activeDot={{ r: 8, strokeWidth: 2, stroke: isDark ? "#000" : "#fff" }}
            isAnimationActive={animated}
            animationDuration={2000}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// Update the AnimatedBarChart component for Problem Categories
export function AnimatedBarChart({
  className = "",
  animated = true,
  data,
  showValues = false,
  customColors = false,
  tooltip,
}: ChartProps & {
  showValues?: boolean
  customColors?: boolean
  tooltip?: (props: any) => React.ReactNode
}) {
  const { resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const textColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
  const gridColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"

  // Ensure we have data to display
  const chartData =
    data && data.length > 0
      ? data
      : [
          { name: "Item 1", value: 85, value2: 80 },
          { name: "Item 2", value: 75, value2: 70 },
          { name: "Item 3", value: 90, value2: 85 },
          { name: "Item 4", value: 80, value2: 75 },
          { name: "Item 5", value: 70, value2: 65 },
        ]

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // If custom tooltip function is provided, use it
      if (tooltip) {
        return tooltip(payload[0].payload)
      }

      const data = payload[0].payload

      // For Technologies Per Project chart (has tooltip property)
      if (data.tooltip) {
        return (
          <div className="bg-background/90 border border-primary/20 p-3 rounded-md shadow-lg max-w-xs">
            <p className="font-medium text-foreground mb-1">{label}</p>
            <p className="text-sm mb-2">
              <span className="font-medium">Technologies:</span>{" "}
              <span className="text-primary">{data.technologies}</span>
            </p>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">List:</span> {data.tooltip}
            </div>
          </div>
        )
      }

      // For Problem Categories chart (has value property)
      if (data.value !== undefined) {
        return (
          <div className="bg-background/90 border border-primary/20 p-3 rounded-md shadow-lg">
            <p className="font-medium text-foreground mb-1">{label}</p>
            <p className="text-sm">
              <span className="font-medium">Count:</span> <span className="text-primary">{data.value}</span>
            </p>
          </div>
        )
      }
    }
    return null
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(var(--primary), 0.15)",
        transition: { duration: 0.3 },
      }}
      className={`w-full h-full ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="name"
            stroke={textColor}
            tick={{ fontSize: 9 }}
            tickLine={{ stroke: gridColor }}
            axisLine={{ stroke: gridColor }}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis
            stroke={textColor}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: gridColor }}
            axisLine={{ stroke: gridColor }}
            label={{
              value: chartData[0]?.technologies !== undefined ? "Number of Technologies" : "Solve Count",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: textColor, fontSize: 12 },
            }}
          />
          <Tooltip
            content={tooltip ? <CustomTooltip /> : undefined}
            contentStyle={{
              backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)",
              borderColor: gridColor,
              color: textColor,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              padding: "10px",
            }}
          />
          <Bar
            dataKey={chartData[0]?.technologies !== undefined ? "technologies" : "value"}
            name="Count"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
            isAnimationActive={animated}
            animationDuration={2000}
            animationEasing="ease-in-out"
            barSize={40}
          >
            {customColors &&
              chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || `hsl(var(--chart-${(index % 5) + 1}))`} />
              ))}
            {showValues && (
              <LabelList
                dataKey={chartData[0]?.technologies !== undefined ? "technologies" : "value"}
                position="top"
                fill={textColor}
                formatter={(value:any) => value}
                style={{ fontWeight: "bold", fontSize: 12 }}
                offset={5}
              />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// Update the AnimatedAreaChart component with distinct colors and simplified legend
export function AnimatedAreaChart({ className = "", animated = true, data }: ChartProps) {
  const { resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const textColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
  const gridColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"

  // Ensure we have data to display
  const chartData =
    data && data.length > 0
      ? data
      : [
          { name: "Item 1", value: 85, value2: 80 },
          { name: "Item 2", value: 75, value2: 70 },
          { name: "Item 3", value: 90, value2: 85 },
          { name: "Item 4", value: 80, value2: 75 },
          { name: "Item 5", value: 70, value2: 65 },
        ]

  // Distinct colors for each line
  const frontendColor = "#FF5733" // Bright red-orange
  const backendColor = "#33FF57" // Bright green
  const problemSolvingColor = "#3357FF" // Bright blue

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(var(--primary), 0.15)",
        transition: { duration: 0.3 },
      }}
      className={`w-full h-full ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="name"
            stroke={textColor}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: gridColor }}
            axisLine={{ stroke: gridColor }}
          />
          <YAxis
            stroke={textColor}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: gridColor }}
            axisLine={{ stroke: gridColor }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)",
              borderColor: gridColor,
              color: textColor,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              padding: "10px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconSize={10}
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px" }}
          />
          <defs>
            <linearGradient id="colorFrontend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={frontendColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={frontendColor} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorBackend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={backendColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={backendColor} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorProblemSolving" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={problemSolvingColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={problemSolvingColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="Frontend"
            name="Frontend Skills"
            stroke={frontendColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorFrontend)"
            isAnimationActive={animated}
            animationDuration={2000}
            animationEasing="ease-in-out"
            activeDot={{ r: 6, strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="Backend"
            name="Backend Skills"
            stroke={backendColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBackend)"
            isAnimationActive={animated}
            animationDuration={2000}
            animationEasing="ease-in-out"
            activeDot={{ r: 6, strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="Problem Solving"
            name="Problem Solving"
            stroke={problemSolvingColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorProblemSolving)"
            isAnimationActive={animated}
            animationDuration={2000}
            animationEasing="ease-in-out"
            activeDot={{ r: 6, strokeWidth: 1 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// Update the AnimatedPieChart component to show values inside the chart
export function AnimatedPieChart({
  className = "",
  animated = true,
  data,
  showLabels = false,
  showValues = false,
}: ChartProps & { showLabels?: boolean; showValues?: boolean }) {
  const { theme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme?.includes("dark") || theme === "cosmic"
  const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"

  // Use colors from the theme or data-provided colors
  const COLORS = data[0]?.fill
    ? data.map((item) => item.fill)
    : [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
      ]

  // Custom label renderer to show values inside pie chart
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, value } = props
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

    return (
      <text
        x={x}
        y={y}
        fill={isDark ? "white" : "black"}
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="bold"
        fontSize="12"
      >
        {`${value}`}
      </text>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.03,
        rotate: [0, 1, 0, -1, 0],
        transition: {
          scale: { duration: 0.3 },
          rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
        },
      }}
      className={`w-full h-full ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={30}
            paddingAngle={4}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={renderCustomizedLabel}
            isAnimationActive={animated}
            animationDuration={2000}
            animationEasing="ease-in-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill || COLORS[index % COLORS.length]}
                stroke={isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.8)"}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "rgba(255, 248, 248, 0.8)" : "rgba(255, 255, 255, 0.8)",
              borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              color: textColor,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              padding: "10px",
            }}
            formatter={(value, name) => [name, value]}
          />
          {showValues && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconSize={10}
              iconType="circle"
              formatter={(value, entry) => (
                <span style={{ color: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)" }}>{value}</span>
              )}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function AnimatedRadarChart({ className = "", animated = true, data }: ChartProps) {
  const { theme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme?.includes("dark") || theme === "cosmic"
  const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
  const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.05,
        rotate: [0, 1, 0, -1, 0],
        transition: {
          scale: { duration: 0.3 },
          rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
        },
      }}
      className={`w-full ${className}`}
    >
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis dataKey="name" stroke={textColor} />
          <PolarRadiusAxis stroke={textColor} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
            isAnimationActive={animated}
            animationDuration={2000}
            animationEasing="ease-in-out"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
              borderColor: gridColor,
              color: textColor,
            }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

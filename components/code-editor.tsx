"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface CodeEditorProps {
  code: string
  language: string
}

export default function CodeEditor({ code, language }: CodeEditorProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const codeLines = code.split("\n")
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isTyping) return

    const typingInterval = setInterval(() => {
      if (currentLine < codeLines.length - 1) {
        setCurrentLine((prev) => prev + 1)
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [currentLine, codeLines.length, isTyping])

  const formatCode = (line: string) => {
    // Simple syntax highlighting
    return line
      .replace(/(\/\/.*)/g, '<span class="text-gray-400">$1</span>')
      .replace(/('.*?'|".*?")/g, '<span class="text-yellow-300">$&</span>')
      .replace(
        /\b(import|export|from|function|return|const|let|var|if|else|for|while)\b/g,
        '<span class="text-purple-400">$1</span>',
      )
      .replace(/\b(className|onClick|href)\b/g, '<span class="text-blue-300">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-300">$1</span>')
  }

  return (
    <motion.div
      ref={editorRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-lg overflow-hidden shadow-2xl bg-gray-900 border border-gray-700"
    >
      <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-sm text-gray-400">portfolio.tsx</div>
      </div>

      <div className="p-4 font-mono text-sm overflow-x-auto">
        <table className="w-full">
          <tbody>
            {codeLines.slice(0, currentLine + 1).map((line, index) => (
              <tr key={index} className="leading-relaxed">
                <td className="text-right pr-4 text-gray-500 select-none w-10">{index + 1}</td>
                <td className="text-gray-200" dangerouslySetInnerHTML={{ __html: formatCode(line) }} />
              </tr>
            ))}
            {isTyping && (
              <tr>
                <td></td>
                <td>
                  <span className="inline-block w-2 h-4 bg-white animate-pulse"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

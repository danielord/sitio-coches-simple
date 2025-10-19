'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const shouldBeDark = savedTheme === 'dark'
    
    setIsDark(shouldBeDark)
    document.documentElement.className = shouldBeDark ? 'dark' : ''
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.className = newIsDark ? 'dark' : ''
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  if (!mounted) return <div className="w-10 h-10"></div>

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
    </button>
  )
}
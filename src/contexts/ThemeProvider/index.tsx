'use client'

import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { ThemeContext, ThemeMode } from '#contexts/ThemeProvider/context'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('light')
  // const [theme, setTheme] = useState<ThemeMode>(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedTheme = localStorage.getItem('theme') as ThemeMode
  //     if (storedTheme) return storedTheme

  //     if (window.matchMedia('(prefers-color-scheme: dark)').matches)
  //       return 'dark'
  //   }
  //   return 'light'
  // })

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem('theme') as ThemeMode
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    const isDarkMode =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    // add or delete dark class
    document.documentElement.classList.toggle('dark', isDarkMode)

    if (theme !== 'system') {
      localStorage.setItem('theme', theme)
    } else {
      localStorage.removeItem('theme')
    }
  }, [theme])

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

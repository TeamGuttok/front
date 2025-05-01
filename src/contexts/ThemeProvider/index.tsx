'use client'

import type { ReactNode } from 'react'
import { useState, useEffect, useMemo } from 'react'
import { ThemeContext, ThemeMode } from '#contexts/ThemeProvider/context'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('light')

  useEffect(() => {
    setMounted(true)

    const storedTheme = localStorage.getItem('theme') as ThemeMode | null

    if (storedTheme) {
      setTheme(storedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  const isDarkMode = useMemo(() => {
    if (theme === 'dark') return true
    if (theme === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [theme])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.classList.toggle('dark', isDarkMode)

    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement('link')
    favicon.setAttribute('rel', 'icon')
    favicon.setAttribute('type', 'image/png')

    const href = isDarkMode
      ? '/images/favicon/dark_favicon.png?v=dark'
      : '/images/favicon/light_favicon.png?v=light'
    favicon.setAttribute('href', href)

    if (!favicon.parentNode) {
      document.head.appendChild(favicon)
    }

    console.log('[파비콘 및 다크모드 설정]', { isDarkMode, href })

    if (theme === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', theme)
    }
  }, [isDarkMode, theme, mounted])

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

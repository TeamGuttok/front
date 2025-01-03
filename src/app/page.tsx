'use client'

import useTheme from '#contexts/ThemeProvider/hook'

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="">
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        테마
      </button>
    </div>
  )
}

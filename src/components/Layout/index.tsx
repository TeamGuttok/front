'use client'

import { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from '#hooks/useMediaQuery'
import SideBar from '#components/Layout/SideBar'
import NavigationBar from '#components/Layout/NavigationBar'
import { BREAKPOINTS } from '#constants/breakpoints'

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.sm})`)
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  // avoid ssr hydration error
  if (!isMount) return null

  return (
    <>
      {isMobile ? (
        <NavigationBar pathname={pathname} />
      ) : (
        <SideBar pathname={pathname} />
      )}
      {children}
    </>
  )
}

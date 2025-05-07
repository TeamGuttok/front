'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from '#hooks/useMediaQuery'
import NavigationBar from '#components/ui/NavigationBar'
import SideBar from '#components/ui/SideBar'
import { BREAKPOINTS } from '#constants/breakpoints'

export default function ResponsiveNav() {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.sm})`)
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  if (!isMount) return null

  return isMobile ? <NavigationBar /> : <SideBar />
}

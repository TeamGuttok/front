'use client'

import type { ReactNode } from 'react'
import SideBar from '#components/Layout/SideBar'
import NavigationBar from '#components/Layout/NavigationBar'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex">
      <SideBar pathname={pathname} />
      <NavigationBar pathname={pathname} />
      {children}
    </div>
  )
}

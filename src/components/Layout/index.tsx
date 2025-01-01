import type { ReactNode } from 'react'
import SideBar from '#components/Layout/SideBar'
import NavigationBar from '#components/Layout/NavigationBar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SideBar />
      <NavigationBar />
      {children}
    </div>
  )
}

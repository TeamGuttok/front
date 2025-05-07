import type { ReactNode } from 'react'
import LayoutShell from './LayoutShell'
import ResponsiveNav from './ResponsiveNav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutShell>
      <ResponsiveNav />
      {children}
    </LayoutShell>
  )
}

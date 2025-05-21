import type { ReactNode } from 'react'
import LayoutShell from './LayoutShell'
import ResponsiveNav from './ResponsiveNav'
import Bubble from '#components/_common/Bubble'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <LayoutShell>
        <ResponsiveNav />
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
          <Bubble />
        </main>
      </LayoutShell>
    </div>
  )
}

import type { ReactNode } from 'react'

export default function GroupDetailLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="sm:w-[calc(100vw-16rem)] sm:max-w-2xl m-4 sm:mx-auto sm:mt-8 space-y-4">
      {children}
    </div>
  )
}

import type { ReactNode } from 'react'

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center sm:m-auto sm:-translate-y-12">
      <div className="w-full sm:w-[60vw] sm:max-w-[832px] sm:p-8 sm:rounded-md sm:border sm:border-border">
        {children}
      </div>
    </div>
  )
}

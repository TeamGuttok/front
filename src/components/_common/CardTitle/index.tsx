import * as React from 'react'
import { cn } from '#components/lib/utils'

interface TitleProps {
  className?: string
  children: React.ReactNode
}

export default function CardTitle({
  className,
  children,
}: TitleProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center sm:m-auto sm:-translate-y-12',
        className,
      )}
    >
      <div className="w-full sm:w-[60vw] sm:max-w-[832px] sm:p-8 sm:rounded-md sm:border sm:border-border">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-full mt-5">
          </div>
          <div className="w-full h-[1px] bg-border mt-5"></div>
          <div className="w-full mt-5">{children}</div>
        </div>
      </div>
    </div>
  )
}
CardTitle.displayName = 'CardTitle'

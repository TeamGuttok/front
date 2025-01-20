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
      <p className="hidden sm:block text-4xl mb-2">
        <span className="font-bold">구</span>독을{' '}
        <span className="font-bold">똑</span>똑하게
      </p>
      <p className="hidden sm:block text-lg text-sub mb-6">
        스마트한 구독 생활을 위한 최고의 선택
      </p>

      <div className="w-full sm:w-[60vw] sm:max-w-[832px] sm:p-8 sm:rounded-md sm:border sm:border-border">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-full mt-5">
            <span className="text-3xl font-bold ">{children}</span>
          </div>
          <div className="w-full h-[1px] bg-border mt-5"></div>
          <div className="w-full mt-5">{children}</div>
        </div>
      </div>
    </div>
  )
}
CardTitle.displayName = 'CardTitle'

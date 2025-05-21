'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function FeedbackButton() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed sm:bottom-6 bottom-[5.5rem] left-5 sm:left-60 z-50 group ">
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSdeV-8mvo3COEiIIMArbABfbqm1T5LuyNgXPUjpMXnl5T35hg/viewform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-primary p-4 w-20 h-20 rounded-full relative hover:bg-primary/80 flex items-center justify-center gap-2">
          <p className="text-base leading-tight text-white text-center">
            피드백
          </p>

          <X
            className="absolute top-1 right-1 w-4 h-4 rounded-full hover:bg-zinc-500 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setVisible(false)
            }}
          />
        </button>
      </Link>
    </div>
  )
}

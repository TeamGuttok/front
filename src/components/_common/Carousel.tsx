import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { KNOWN_SERVICES } from '#constants/knownServices'
import { Card } from './card'

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const duplicatedServices = [...KNOWN_SERVICES, ...KNOWN_SERVICES]

  useEffect(() => {
    if (carouselRef.current) {
      const interval = setInterval(() => {
        setIsAnimating(true)
        const firstChild = carouselRef.current?.firstChild as HTMLElement

        if (firstChild) {
          setTimeout(() => {
            carouselRef.current?.appendChild(firstChild)
            setIsAnimating(false)
          }, 300)
        }
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={carouselRef}
        className={`flex ${isAnimating ? 'transition-transform duration-700' : ''}`} // 애니메이션 부드럽게
        style={{
          transform: isAnimating ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        {duplicatedServices.map((service, index) => (
          <Card
            key={`${service.id}-${index}`}
            className="flex-shrink-0 w-64 h-40 background-color-[hsl(var(--muted-foreground))] shadow-lg rounded-lg flex flex-col justify-center items-center mx-2"
          >
            <Image
              src={service.iconUrl}
              alt={service.name}
              width={64}
              height={64}
              className="w-16 h-16 mb-2"
            />
            <span className="text-lg font-semibold ">{service.name}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}

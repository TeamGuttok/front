import React from 'react'
import { KNOWN_SERVICES } from '#constants/knownServices'
import { Card } from '../../_common/Card'

export default function Carousel() {
  const duplicatedServices = [...KNOWN_SERVICES, ...KNOWN_SERVICES]

  return (
    <div className="overflow-hidden w-full relative mt-2">
      <div className="flex animate-scroll w-[max-content] min-w-full">
        {duplicatedServices.map((service, index) => (
          <Card
            key={`${service.id}-${index}`}
            className="flex-shrink-0 w-64 h-40 background-color-[hsl(var(--muted-foreground))] shadow-lg rounded-lg flex flex-col justify-center items-center mx-2"
          >
            <div
              className="w-16 h-16 mb-2 bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url(${service.iconUrl})`,
              }}
            />
            <span className="text-lg font-semibold ">{service.name}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}

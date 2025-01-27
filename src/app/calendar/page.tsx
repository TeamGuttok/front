'use client'

import { useState } from 'react'
import { CalendarGrid } from '#components/Calendar/CalendarGrid'
import { CalendarHeader } from '#components/Calendar/CalendarHeader'
import { CalendarViewType } from '#components/Calendar/calendarTypes'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState(CalendarViewType.MONTHLY)

  const handleDateChange = (date: Date) => {
    setCurrentDate(date)
  }

  const handleViewChange = (view: CalendarViewType) => {
    setViewType(view)
  }

  const mockEvents = [
    {
      id: 1,
      title: 'Netflix',
      subscription: 'NETFLIX',
      paymentAmount: 14500,
      paymentMethod: 'CARD',
      paymentStatus: 'COMPLETED',
      paymentCycle: 'MONTHLY',
      paymentDay: 27,
      registerDate: '2025-01-27T00:00:00',
      updateDate: '2025-01-27T00:00:00',
    },
    {
      id: 2,
      title: 'Spotify',
      subscription: 'SPOTIFY',
      paymentAmount: 10900,
      paymentMethod: 'CARD',
      paymentStatus: 'PENDING',
      paymentCycle: 'MONTHLY',
      paymentDay: 15,
      registerDate: '2025-01-15T00:00:00',
      updateDate: '2025-01-15T00:00:00',
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={handleDateChange}
        onViewChange={handleViewChange}
        viewType={viewType}
      />
      <CalendarGrid
        currentDate={currentDate}
        events={mockEvents}
        viewType={viewType}
      />
    </div>
  )
}

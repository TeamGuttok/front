'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CalendarGrid } from '#components/Calendar/CalendarGrid'
import { CalendarHeader } from '#components/Calendar/CalendarHeader'
import {
  CalendarEvent,
  CalendarViewType,
} from '#components/Calendar/calendarTypes'
import CalendarSideBar from '#components/Calendar/CalendarSideBar'

interface CalendarClientPageProps {
  initialData: {
    contents: CalendarEvent[]
    lastId?: string
    hasNext: boolean
  }
}

export default function CalendarClientPage({
  initialData,
}: CalendarClientPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [viewType, setViewType] = useState(CalendarViewType.MONTHLY)

  useEffect(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      const parsedDate = new Date(dateParam)
      if (!isNaN(parsedDate.getTime())) {
        setCurrentDate(parsedDate)
      }
    }
  }, [searchParams])

  function handleDateChange(date: Date) {
    const newParams = new URLSearchParams(searchParams.toString())
    const formattedDate = date.toISOString().split('T')[0]
    newParams.set('date', formattedDate)
    router.replace(`?${newParams.toString()}`)
    setCurrentDate(date)
  }

  function handleViewChange(view: CalendarViewType) {
    setViewType(view)
  }

  // temporary pseudo code for react query
  const allEvents = initialData.contents
  const fetchNextData = () => {}

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex flex-col grow 2xl:max-w-[1200px] w-full h-full 2xl:max-h-[800px] m-auto">
        <CalendarHeader
          currentDate={currentDate}
          viewType={viewType}
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
          fetchNextData={fetchNextData}
        />
        <CalendarGrid
          currentDate={currentDate}
          viewType={viewType}
          events={allEvents}
        />
      </div>

      <CalendarSideBar allEvents={allEvents} />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CalendarGrid } from '#components/Calendar/CalendarGrid'
import { CalendarHeader } from '#components/Calendar/CalendarHeader'
import {
  CalendarEvent,
  CalendarViewType,
} from '#components/Calendar/calendarTypes'

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
    <>
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
    </>
  )
}

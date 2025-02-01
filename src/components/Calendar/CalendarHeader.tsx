'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useCalendarStore } from '#stores/useCalendarStore'

import { Button } from '#components/_common/Button'
import { calculateNewDate, formatLocalizedDate } from '#utils/calendarUtils'
import { CalendarViewEnum } from '#types/calendar'

interface CalendarHeaderProps {
  fetchNextData: () => void
}

export default function CalendarHeader({ fetchNextData }: CalendarHeaderProps) {
  const { currentDate, viewType, setCurrentDate, setViewType } =
    useCalendarStore()

  const handlePrev = () => {
    fetchNextData()
    const newDate = calculateNewDate(currentDate, viewType, 'prev')
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = calculateNewDate(currentDate, viewType, 'next')
    setCurrentDate(newDate)
  }

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={handlePrev}
          aria-label="이전"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-lg font-medium">
          {formatLocalizedDate(currentDate, viewType)}
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={handleNext}
          aria-label="다음"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant={viewType === CalendarViewEnum.MONTHLY ? 'default' : 'ghost'}
          onClick={() => setViewType(CalendarViewEnum.MONTHLY)}
        >
          월간
        </Button>
        <Button
          type="button"
          variant={viewType === CalendarViewEnum.YEARLY ? 'default' : 'ghost'}
          onClick={() => setViewType(CalendarViewEnum.YEARLY)}
        >
          연간
        </Button>
      </div>
    </header>
  )
}

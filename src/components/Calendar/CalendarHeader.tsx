'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '#components/_common/Button'

import { CalendarViewType } from './calendarTypes'
import { calculateNewDate, formatLocalizedDate } from './calendarUtils'

interface CalendarHeaderProps {
  currentDate: Date
  viewType: CalendarViewType
  onDateChange: (date: Date) => void
  onViewChange: (view: CalendarViewType) => void
  fetchNextData: () => void
}

export function CalendarHeader({
  currentDate,
  viewType,
  onDateChange,
  onViewChange,
  fetchNextData,
}: CalendarHeaderProps) {
  const handlePrev = () => {
    fetchNextData()

    const newDate = calculateNewDate(currentDate, viewType, 'prev')
    onDateChange(newDate)
  }

  const handleNext = () => {
    const newDate = calculateNewDate(currentDate, viewType, 'next')
    onDateChange(newDate)
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
          variant={viewType === CalendarViewType.MONTHLY ? 'default' : 'ghost'}
          onClick={() => onViewChange(CalendarViewType.MONTHLY)}
        >
          월간
        </Button>
        <Button
          type="button"
          variant={viewType === CalendarViewType.YEARLY ? 'default' : 'ghost'}
          onClick={() => onViewChange(CalendarViewType.YEARLY)}
        >
          연간
        </Button>
      </div>
    </header>
  )
}

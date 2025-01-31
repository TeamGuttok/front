import { format, getDaysInMonth, startOfMonth } from 'date-fns'
import { cn } from '#components/lib/utils'

import { CalendarEvent, CalendarViewType } from './calendarTypes'
import { DayCell } from './DayCell'

interface CalendarGridProps {
  currentDate: Date
  viewType: CalendarViewType
  events: CalendarEvent[]
}

export function CalendarGrid({
  currentDate,
  viewType,
  events,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate)
  const daysInMonth = getDaysInMonth(monthStart)

  const weeks = []
  let currentWeek = []

  // Calculate first day offset
  const firstDayOfWeek = monthStart.getDay() // 0=Sunday, 1=Monday, ..., 6=Saturday

  // Add empty days for first week
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({
      date: null,
      formattedDate: '',
      isCurrentMonth: false,
    })
  }

  // Generate calendar grid
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(monthStart)
    date.setDate(day)

    currentWeek.push({
      date,
      formattedDate: format(date, 'd'),
      isCurrentMonth: true,
    })

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  // Add remaining empty days for last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: null,
        formattedDate: '',
        isCurrentMonth: false,
      })
    }
    weeks.push(currentWeek)
  }

  if (viewType == CalendarViewType.YEARLY) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">연간 뷰</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex gap-1 pb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={cn(
              'flex-1 text-center border py-1 bg-primary/10 font-medium text-sm rounded',
              {
                'text-red-500': index === 0,
                'text-blue-500': index === 6,
                'text-gray-600': index > 0 && index < 6,
              },
            )}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 flex-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="contents">
            {week.map((day, dayIndex) => (
              <DayCell
                key={
                  day.date
                    ? day.date.toISOString()
                    : `empty-${weekIndex}-${dayIndex}`
                }
                date={day.date}
                formattedDate={day.formattedDate}
                events={events}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

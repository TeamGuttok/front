import { format, getDaysInMonth, startOfMonth } from 'date-fns'
import { CalendarViewType, CalendarEvent } from './calendarTypes'

export function calculateNewDate(
  currentDate: Date,
  viewType: CalendarViewType,
  direction: 'prev' | 'next',
): Date {
  const newDate = new Date(currentDate)

  switch (viewType) {
    case CalendarViewType.MONTHLY:
      newDate.setDate(1)
      newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1))
      break
    case CalendarViewType.YEARLY:
      newDate.setFullYear(
        newDate.getFullYear() + (direction === 'prev' ? -1 : 1),
      )
      break
    default:
      break
  }

  return newDate
}

export function formatLocalizedDate(
  date: Date,
  viewType: CalendarViewType,
): string {
  switch (viewType) {
    case CalendarViewType.MONTHLY:
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
    case CalendarViewType.YEARLY:
      return `${date.getFullYear()}년`
    default:
      return date.toLocaleDateString()
  }
}

export function filterEventsByDate(events: CalendarEvent[], date: Date) {
  return events.filter((event) => {
    const eventDate = new Date(event.registerDate)
    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    )
  })
}

interface GridDay {
  date: Date | null
  formattedDate: string
  isCurrentMonth: boolean
}

export type CalendarGrid = GridDay[][]

export function generateCalendarGrid(monthDate: Date): CalendarGrid {
  const monthStart = startOfMonth(monthDate)
  const daysInMonth = getDaysInMonth(monthStart)
  const weeks: CalendarGrid = []
  let currentWeek: GridDay[] = []
  const firstDayOfWeek = monthStart.getDay()

  // Add empty days for first week
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({
      date: null,
      formattedDate: '',
      isCurrentMonth: false,
    })
  }

  // Fill with month days
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

  // Fill remaining days in last week
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

  return weeks
}

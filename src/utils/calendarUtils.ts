import { format, getDaysInMonth, startOfMonth } from 'date-fns'

import type { SubscriptionContents } from '#types/subscription'
import { CalendarViewEnum } from '#types/calendar'

/**
 * Calculates the new date based on the current date, view type (monthly/yearly), and direction.
 */
export function calculateNewDate(
  currentDate: Date,
  viewType: CalendarViewEnum,
  direction: 'prev' | 'next',
): Date {
  const newDate = new Date(currentDate)

  switch (viewType) {
    case CalendarViewEnum.MONTHLY:
      newDate.setDate(1) // Reset to the first day of the month
      newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1))
      break
    case CalendarViewEnum.YEARLY:
      newDate.setFullYear(
        newDate.getFullYear() + (direction === 'prev' ? -1 : 1),
      )
      break
    default:
      break
  }

  return newDate
}

/**
 * Formats a given date into a localized string based on the view type.
 */
export function formatLocalizedDate(
  date: Date,
  viewType: CalendarViewEnum,
): string {
  switch (viewType) {
    case CalendarViewEnum.MONTHLY:
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
    case CalendarViewEnum.YEARLY:
      return `${date.getFullYear()}년`
    default:
      return date.toLocaleDateString()
  }
}

/**
 * Filters events that match the given date.
 */
export function filterEventsByDate(events: SubscriptionContents[], date: Date) {
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

/**
 * Generates a calendar grid for the given month, including empty placeholders for alignment.
 */
export function generateCalendarGrid(monthDate: Date): CalendarGrid {
  const monthStart = startOfMonth(monthDate)
  const daysInMonth = getDaysInMonth(monthStart)
  const weeks: CalendarGrid = []
  let currentWeek: GridDay[] = []
  const firstDayOfWeek = monthStart.getDay()

  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({
      date: null,
      formattedDate: '',
      isCurrentMonth: false,
    })
  }

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

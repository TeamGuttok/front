import { CalendarViewType, CalendarEvent } from './calendarTypes'

export function calculateNewDate(
  currentDate: Date,
  viewType: CalendarViewType,
  direction: 'prev' | 'next',
): Date {
  const newDate = new Date(currentDate)

  switch (viewType) {
    case CalendarViewType.MONTHLY:
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

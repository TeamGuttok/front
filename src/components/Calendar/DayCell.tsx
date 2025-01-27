import Image from 'next/image'
import { CalendarEvent } from './calendarTypes'
import { filterEventsByDate } from './calendarUtils'

interface DayCellProps {
  date: Date | null
  formattedDate: string
  events: CalendarEvent[]
}

export function DayCell({ date, formattedDate, events }: DayCellProps) {
  return (
    <div className="bg-secondary border rounded-lg p-2 min-h-[100px]">
      <div className="text-left">{formattedDate}</div>
      {date &&
        filterEventsByDate(events, date).map((event) => (
          <div
            key={event.id}
            className={`flex items-center gap-1 text-xs mt-1 p-1 rounded ${
              event.paymentStatus === 'COMPLETED'
                ? 'bg-green-50 text-green-700'
                : 'bg-yellow-50 text-yellow-700'
            }`}
          >
            <Image
              src={`/images/logo/${event.subscription.toLowerCase()}-icon.svg`}
              alt={event.title}
              width={16}
              height={16}
            />
            <span>
              {event.title} - {event.paymentAmount.toLocaleString()}원
            </span>
          </div>
        ))}
    </div>
  )
}

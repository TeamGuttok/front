import Image from 'next/image'
import Link from 'next/link'
import { CalendarEvent } from './calendarTypes'
import { filterEventsByDate } from './calendarUtils'
import { cn } from '#components/lib/utils'

interface DayCellProps {
  date: Date | null
  formattedDate: string
  events: CalendarEvent[]
}

export function DayCell({ date, formattedDate, events }: DayCellProps) {
  const isToday = date && new Date().toDateString() === date.toDateString()

  return (
    <div
      className={cn(
        'border rounded-lg p-1 sm:p-2 aspect-square sm:aspect-auto sm:min-h-[100px]',
        isToday ? 'bg-primary/20' : 'bg-secondary',
      )}
    >
      <div
        className={cn('text-left text-sm sm:text-base', isToday && 'font-bold')}
      >
        {formattedDate}
      </div>

      <div className="flex gap-[1px] lg:gap-1 lg:flex-col">
        {date &&
          filterEventsByDate(events, date).map((event) => (
            <Link
              key={event.id}
              href={`/item/${event.id}`}
              className="block hover:scale-[1.02] transition-transform"
            >
              <div
                className={cn(
                  'lg:flex lg:items-center lg:gap-1 lg:text-xs lg:p-1 lg:rounded',
                  event.paymentStatus === 'COMPLETED'
                    ? 'lg:bg-primary/5'
                    : 'lg:bg-destructive/5',
                )}
              >
                <div
                  className={cn(
                    'w-2 h-2 rounded-full lg:hidden',
                    event.paymentStatus === 'COMPLETED'
                      ? 'bg-primary'
                      : 'bg-destructive',
                  )}
                />
                <div className="hidden lg:block">
                  {event.subscription !== 'CUSTOM_INPUT' && (
                    <Image
                      src={`/images/logo/${event.subscription.toLowerCase()}-icon.svg`}
                      alt={event.title}
                      width={16}
                      height={16}
                    />
                  )}
                </div>
                <span className="hidden lg:inline">
                  {event.title} - {event.paymentAmount.toLocaleString()}원
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { CalendarEvent } from './calendarTypes'
import { cn } from '#components/lib/utils'

interface CalendarSideBarProps {
  allEvents: CalendarEvent[]
}

export default function CalendarSideBar({ allEvents }: CalendarSideBarProps) {
  return (
    <div className="lg:right-0 lg:top-0 lg:h-screen lg:border-l lg:min-w-56 p-4 border-t lg:border-t-0 border-border bg-secondary shadow-sm">
      <div className="text-center mb-10">
        <h2 className="text-lg font-semibold mb-2">이번달 총 구독료</h2>
        <p className="text-sub font-semibold">￦60,600</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">구독 서비스 목록</h2>
        <div className="space-y-3">
          {allEvents.map((event) => (
            <Link
              key={event.id}
              href={`/item/${event.id}`} // Todo: Item 라우트 함수로 리팩터링
              className="block hover:scale-[1.02] transition-transform"
            >
              <div
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg shadow-sm',
                  event.paymentStatus === 'COMPLETED'
                    ? 'bg-primary/10'
                    : 'bg-destructive/10',
                )}
              >
                <div className="flex items-center">
                  {event.subscription !== 'CUSTOM_INPUT' ? (
                    <Image
                      src={`/images/logo/${event.subscription.toLowerCase()}-icon.svg`}
                      alt={event.subscription}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <div className="w-6 h-6" />
                  )}
                  <div>
                    <p className="ml-3 font-medium">{event.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sub">
                    ￦{event.paymentAmount}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

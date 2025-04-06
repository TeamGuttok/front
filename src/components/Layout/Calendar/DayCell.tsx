// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { useMediaQuery } from '#hooks/useMediaQuery'
// import { BREAKPOINTS } from '#constants/breakpoints'
// import { cn } from '#components/lib/utils'

// import type { SubscriptionContents } from '#types/subscription'
// import { filterEventsByDate } from '#utils/calendarUtils'

// interface DayCellProps {
//   date: Date | null
//   formattedDate: string
//   events: SubscriptionContents[]
//   forceMobile?: boolean
// }

// export function DayCell({
//   date,
//   formattedDate,
//   events,
//   forceMobile,
// }: DayCellProps) {
//   const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg})`)
//   const effectiveDesktop = isDesktop && !forceMobile

//   const isToday = date && new Date().toDateString() === date.toDateString()

//   return (
//     <div
//       className={cn(
//         'border rounded-lg p-1 aspect-square',
//         effectiveDesktop && 'p-2 aspect-auto min-h-[100px]',
//         isToday ? 'bg-primary/20' : 'bg-secondary',
//       )}
//     >
//       <div
//         className={cn(
//           'text-left text-sm text-sub/70',
//           effectiveDesktop && 'text-base text-secondary-foreground',
//           isToday && 'font-bold',
//         )}
//       >
//         {formattedDate}
//       </div>
//       <div
//         className={cn('flex gap-[1px]', effectiveDesktop && 'flex-col gap-1')}
//       >
//         {date &&
//           filterEventsByDate(events, date).map((event) => (
//             <Link
//               key={event.id}
//               href={`/item/${event.id}`}
//               className="block hover:scale-[1.02] transition-transform"
//             >
//               <div
//                 className={cn(
//                   !effectiveDesktop &&
//                     'block hover:scale-[1.02] transition-transform',
//                   effectiveDesktop && [
//                     'flex items-center gap-1 text-xs p-1 rounded transition-transform hover:scale-[1.02]',
//                     event.paymentStatus === 'COMPLETED'
//                       ? 'bg-primary/5'
//                       : 'bg-destructive/5',
//                   ],
//                 )}
//               >
//                 <div
//                   className={cn(
//                     'w-2 h-2 rounded-full',
//                     event.paymentStatus === 'COMPLETED'
//                       ? 'bg-primary'
//                       : 'bg-destructive',
//                     effectiveDesktop && 'hidden',
//                   )}
//                 />
//                 <div className={cn('hidden', effectiveDesktop && 'block')}>
//                   {event.subscription !== 'CUSTOM_INPUT' && (
//                     <Image
//                       src={`/images/logo/${event.subscription.toLowerCase()}-icon.svg`}
//                       alt={event.title}
//                       width={16}
//                       height={16}
//                     />
//                   )}
//                 </div>
//                 <span className={cn('hidden', effectiveDesktop && 'inline')}>
//                   {event.title} - {event.paymentAmount.toLocaleString()}원
//                 </span>
//               </div>
//             </Link>
//           ))}
//       </div>
//     </div>
//   )
// }

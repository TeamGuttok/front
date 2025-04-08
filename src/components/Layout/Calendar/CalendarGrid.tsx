// import { format } from 'date-fns'
// import { cn } from '#components/lib/utils'

// import { useCalendarStore } from '#stores/subscriptions/useCalendarStore'

// import type { SubscriptionContents } from '#types/subscription'
// import { CalendarViewEnum } from '#types/calendar'

// import type { CalendarGrid } from '#utils/calendarUtils'
// import { generateCalendarGrid } from '#utils/calendarUtils'
// import { DayCell } from './DayCell'

// interface CalendarGridProps {
//   events: SubscriptionContents[]
// }

// export default function CalendarGrid({ events }: CalendarGridProps) {
//   const { currentDate, viewType } = useCalendarStore()

//   // Yearly View
//   if (viewType === CalendarViewEnum.YEARLY) {
//     const monthsArray = Array.from({ length: 12 }, (_, i) => {
//       const dateCopy = new Date(currentDate)
//       dateCopy.setMonth(i)
//       return dateCopy
//     })

//     return (
//       <div className="grid lg:grid-cols-3 gap-4 p-4 overflow-auto">
//         {monthsArray.map((monthDate, idx) => {
//           const weeks = generateCalendarGrid(monthDate)
//           return (
//             <div key={idx} className="flex flex-col p-2 border rounded-sm">
//               <h3 className="text-center font-semibold">
//                 {format(monthDate, 'M월')}
//               </h3>
//               <DayHeaders />
//               <MonthGrid weeks={weeks} events={events} forceMobile />
//             </div>
//           )
//         })}
//       </div>
//     )
//   }

//   // Monthly View
//   const weeks = generateCalendarGrid(currentDate)
//   return (
//     <div className="flex flex-col h-full p-4">
//       <DayHeaders />
//       <MonthGrid weeks={weeks} events={events} />
//     </div>
//   )
// }

// /**
//  * ----------------
//  * Sub Module Start
//  */

// interface MonthGridProps {
//   weeks: CalendarGrid
//   events: SubscriptionContents[]
//   forceMobile?: boolean
// }

// const MonthGrid = ({ weeks, events, forceMobile = false }: MonthGridProps) => (
//   <div className="grid grid-cols-7 gap-1 flex-1">
//     {weeks.map((week, weekIndex) => (
//       <div key={weekIndex} className="contents">
//         {week.map((day, dayIndex) => (
//           <DayCell
//             key={
//               day.date
//                 ? day.date.toISOString()
//                 : `empty-${weekIndex}-${dayIndex}`
//             }
//             date={day.date}
//             formattedDate={day.formattedDate}
//             events={events}
//             forceMobile={forceMobile}
//           />
//         ))}
//       </div>
//     ))}
//   </div>
// )

// const DayHeaders = () => (
//   <div className="flex gap-1 pb-2">
//     {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
//       <div
//         key={day}
//         className={cn(
//           'flex-1 text-center border py-1 bg-primary/10 font-medium text-sm rounded',
//           {
//             'text-red-500': index === 0,
//             'text-blue-500': index === 6,
//             'text-gray-600': index > 0 && index < 6,
//           },
//         )}
//       >
//         {day}
//       </div>
//     ))}
//   </div>
// )

// import { isSameDay, setDate, parseISO } from 'date-fns'
// import type { SubscriptionItem } from '#stores/subscriptions/useItemStore'

// export function CalendarEvents(
//   items: SubscriptionItem[],
//   viewMonth: Date
// ): { date: Date; item: SubscriptionItem }[] {
//   const result: { date: Date; item: SubscriptionItem }[] = []

//   for (const item of items) {
//     if (!item.paymentCycle || !item.paymentDay) continue

//     const paymentDay = item.paymentDay

//     let dateToMark: Date | null = null

//     if (item.paymentCycle === 'MONTHLY') {
//       dateToMark = setDate(viewMonth, paymentDay)
//     }

//     if (item.paymentCycle === 'YEARLY') {
//       const createdDate = parseISO(item.createdAt)
//       if (createdDate.getMonth() === viewMonth.getMonth()) {
//         dateToMark = setDate(viewMonth, paymentDay)
//       }
//     }

//     if (dateToMark) {
//       result.push({ date: dateToMark, item })
//     }
//   }

//   return result
// }

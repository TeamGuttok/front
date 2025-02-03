import CalendarClientPage from '#app/calendar/CalendarClientPage'

import { SubscriptionContents } from '#types/subscription'

function getInitialData() {
  return {
    contents: [
      {
        id: 1,
        title: 'Netflix',
        subscription: 'NETFLIX',
        paymentAmount: 14500,
        paymentMethod: 'CARD',
        paymentStatus: 'PENDING',
        paymentCycle: 'MONTHLY',
        paymentDay: 27,
        registerDate: '2025-01-27T00:00:00',
        updateDate: '2025-01-27T00:00:00',
      },
      {
        id: 2,
        title: 'Spotify',
        subscription: 'SPOTIFY',
        paymentAmount: 10900,
        paymentMethod: 'CARD',
        paymentStatus: 'COMPLETED',
        paymentCycle: 'MONTHLY',
        paymentDay: 15,
        registerDate: '2025-01-15T00:00:00',
        updateDate: '2025-01-15T00:00:00',
      },
      {
        id: 3,
        title: 'Meal',
        subscription: 'CUSTOM_INPUT',
        paymentAmount: 11800,
        paymentMethod: 'CARD',
        paymentStatus: 'COMPLETED',
        paymentCycle: 'MONTHLY',
        paymentDay: 15,
        registerDate: '2025-01-15T00:00:00',
        updateDate: '2025-01-15T00:00:00',
      },
    ] as SubscriptionContents[],
    hasNext: true,
  }
}

export default async function CalendarPage() {
  const initialData = getInitialData()

  return <CalendarClientPage initialData={initialData} />
}

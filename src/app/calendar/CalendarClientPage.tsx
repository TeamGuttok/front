'use client'

import { useSyncDateWithSearchParams } from '#hooks/useSyncDateWithSearchParams'

import CalendarHeader from '#components/Calendar/CalendarHeader'
import CalendarGrid from '#components/Calendar/CalendarGrid'
import CalendarSideBar from '#components/Calendar/CalendarSideBar'

import type { SubscriptionContents } from '#types/subscription'

interface CalendarClientPageProps {
  initialData: {
    contents: SubscriptionContents[]
    lastId?: string
    hasNext: boolean
  }
}

export default function CalendarClientPage({
  initialData,
}: CalendarClientPageProps) {
  useSyncDateWithSearchParams()

  // temporary pseudo code for react query
  const allEvents = initialData.contents
  const fetchNextData = () => {}

  return (
    <div className="flex flex-col lg:w-[calc(100%-224px)] h-full">
      <div className="flex flex-col w-full h-full lg:max-w-[1200px] lg:max-h-[800px] m-auto mt-0 lg:mt-auto">
        <CalendarHeader fetchNextData={fetchNextData} />
        <CalendarGrid events={allEvents} />
      </div>

      <CalendarSideBar events={allEvents} />
    </div>
  )
}

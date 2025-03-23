'use client'

import { useSyncDateWithSearchParams } from '#hooks/useSyncDateWithSearchParams'
import CalendarHeader from '#components/Layout/Calendar/CalendarHeader'
import CalendarGrid from '#components/Layout/Calendar/CalendarGrid'
import CalendarSideBar from '#components/Layout/Calendar/CalendarSideBar'
import type { SubscriptionContents } from '#types/subscription'
import { BASE_URL } from '#constants/url'
import { useQuery } from '@tanstack/react-query'
import { subscriptions } from '#app/item/page'

const dummy: SubscriptionContents[] = subscriptions

// interface CalendarClientPageProps {
//   initialData: {
//     contents: SubscriptionContents[]
//     lastId?: string
//     hasNext: boolean
//   }
// }

// export default function CalendarClientPage({ initialData }: CalendarClientPageProps) {
//   useSyncDateWithSearchParams()

//   const { data, isLoading, error } = useQuery<{
//     contents: SubscriptionContents[]
//     size: number
//     hasNext: boolean
//   }>({
//     queryKey: ['subscriptions'],
//     queryFn: async () => {
//       const response = await fetch(`${BASE_URL}/api/subscriptions/user`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       })

//       if (!response.ok) {
//         throw new Error(`구독 목록을 가져오는데 실패했습니다: ${response.statusText}`)
//       }

//       return response.json()
//     },
//     //initialData,
//   })

//   if (isLoading) {
//     return <p className="text-center text-gray-500">📅 캘린더 데이터를 불러오는 중...</p>
//   }

//   if (error) {
//     return <p className="text-center text-red-500">⚠️ 데이터를 불러오는 중 오류 발생</p>
//   }

export default function CalendarClientPage() {
  useSyncDateWithSearchParams()

  // 📌 API 대신 더미 데이터 사용
  const allEvents = dummy

  // export default function CalendarClientPage({
  //   initialData,
  // }: CalendarClientPageProps) {
  //   useSyncDateWithSearchParams()

  //   // temporary pseudo code for react query
  //   const allEvents = initialData.contents
  //   const fetchNextData = () => {}

  return (
    <div className="flex flex-col lg:w-[calc(100%-224px)] h-full">
      <div className="flex flex-col w-full h-full lg:max-w-[1200px] lg:max-h-[800px] m-auto mt-0 lg:mt-auto">
        <CalendarHeader fetchNextData={() => {}} />
        <CalendarGrid events={allEvents} />
        {/* <CalendarGrid events={data?.contents ?? []} /> */}
      </div>
      <CalendarSideBar events={allEvents} />
      {/* <CalendarSideBar events={data?.contents ?? []} /> */}
    </div>
  )
}

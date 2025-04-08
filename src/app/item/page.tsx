'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import { Card } from '#components/_common/Card'
import { cn } from '#components/lib/utils'
//import type { SubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '#constants/url'
import { SubscriptionContents } from '#types/subscription'

export default function ItemList() {
  const { data, isLoading, error } = useQuery<{
    contents: SubscriptionContents[]
    size: number
    hasNext: boolean
  }>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/subscriptions/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error(
          `구독 목록을 가져오는데 실패했습니다: ${response.statusText}`,
        )
      }

      return response.json()
    },
  })

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">📦 구독 정보를 불러오는 중...</p>
    )
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        ⚠️ 구독 정보를 가져오는 중 오류 발생
      </p>
    )
  }

  const subscriptions = data?.contents ?? []

  return (
    <div className="grid grid-cols-1 gap-3">
      {subscriptions.map((sub) => (
        <Link key={sub.id} href={PATH.itemDetail(sub.id)} passHref>
          <Card
            key={sub.title}
            className={cn(
              'flex justify-between items-center p-4 rounded-lg shadow-md dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700',
              //sub.shared ? 'bg-red-100' : 'bg-white',
            )}
          >
            <div className="flex items-center gap-3">
              {/* <div className={cn('w-8 h-8 rounded-full', sub.color)}></div> */}
              <div className="dark:color-black">
                <h3 className="font-medium">{sub.title}</h3>
                <p className="text-xs dark:text-gray-500">{sub.paymentCycle}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                ₩{sub.paymentAmount.toLocaleString()}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

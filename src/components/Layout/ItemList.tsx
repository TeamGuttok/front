'use client'

import { Card } from '#components/_common/Card'
import { cn } from '#components/lib/utils'
import Link from 'next/link'
import { PATH } from '#app/routes'
import { useItemStore } from '#stores/subscriptions/useItemStore'
import { paymentCycleLabels } from '#types/subscription'
import { useSubscriptionsClient } from '#apis/subscriptionClient'

export default function ItemList() {
  //const { items } = useItemStore()
  const { data, isLoading, error } = useSubscriptionsClient()
  const items = data?.contents ?? []

  if (!items.length) {
    return (
      <p className="text-center text-gray-500">저장된 구독 항목이 없습니다.</p>
    )
  } else if (isLoading) {
    return <p className="text-center text-gray-500">로딩 중...</p>
  } else if (error) {
    ;<p className="text-center text-gray-500">
      구독 데이터를 불러오지 못했습니다.
    </p>
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item) =>  (
          <Link key={item.useId} href={PATH.itemDetail(itemId)} passHref>
            <Card
              className={cn(
                'flex justify-between items-center p-4 rounded-lg shadow-md dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700',
                item.paymentStatus ? 'bg-red-100' : 'bg-white',
              )}
            >
              <div className="flex items-center gap-3">
                {item.subscription !== 'CUSTOM_INPUT' && (
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{
                      backgroundImage: item.iconUrl
                        ? `url(${item.iconUrl})`
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                )}
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs dark:text-gray-500">
                    {item.paymentCycle
                      ? `매${paymentCycleLabels[item.paymentCycle as keyof typeof paymentCycleLabels]} ${item.paymentDay}일 결제`
                      : '주기 미지정'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  ₩{item.paymentAmount?.toLocaleString()}
                </p>
              </div>
            </Card>
          </Link>
        )
      ))}
    </div>
  )
}

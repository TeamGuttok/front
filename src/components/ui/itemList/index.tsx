'use client'

import { useGetItemsClient } from '#apis/subscriptionClient'
import ItemCard from '#components/ui/itemCard'

export default function ItemList() {
  const { data, isLoading, error } = useGetItemsClient()
  const items = data?.contents ?? []

  if (isLoading) {
    return <p className="text-center text-gray-500">구독 항목 로딩 중...</p>
  }

  if (error) {
    return (
      <p className="text-center text-gray-500">
        ⚠️ 구독 항목을 불러오지 못했습니다.
      </p>
    )
  }

  if (!items.length) {
    return (
      <p className="text-center text-gray-500">
        📭 저장된 구독 항목이 없습니다.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

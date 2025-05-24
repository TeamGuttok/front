'use client'

import { useNotifications } from '#apis/notiClient'
import type { NotiListProps } from '#types/notification'
import NotiCard from '#components/ui/NotiCard'

export default function NotiList({
  onDelete,
  onMarkAsRead,
}: NotiListProps & {
  isLoading: boolean
  error: unknown
}) {
  const { data, isLoading, error } = useNotifications()
  const notifications = data?.contents ?? []

  if (isLoading) {
    return <p className="text-center text-gray-500">결제 알림 로딩 중...</p>
  }

  if (error) {
    return (
      <p className="text-center text-gray-500">
        ⚠️ 알림을 불러오지 못했습니다.
      </p>
    )
  }

  if (!notifications.length) {
    return <p className="text-center text-gray-500">📭 알림이 없습니다</p>
  }

  return (
    <div className="grid grid-cols-1 gap-3 cursor-pointer mb-5">
      {notifications.map((item) => (
        <NotiCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  )
}

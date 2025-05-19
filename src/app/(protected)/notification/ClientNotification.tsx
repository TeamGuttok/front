'use client'

import CardTitle from '#components/_common/CardTitle'
import { useNotifications } from '#apis/notiAPI'
import { useMarkAsRead, useDeleteNotification } from '#apis/notiClient'
import { useToast } from '#hooks/useToast'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'
import NotiList from '#components/ui/NotiList'
import { useMemo, useState, useEffect } from 'react'

export default function ClientNotification() {
  const router = useRouter()
  const { toast } = useToast()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const [notifications, setNotifications] = useState<any[]>([])

  // TODO
  // [ ] 미들웨어 연결 후 삭제 (for SEO)
  if (typeof window !== 'undefined' && !isLoggedIn) {
    router.push(PATH.login)
    return null
  }

  const lastId = useMemo(() => {
    if (notifications.length === 0) return Number.MAX_SAFE_INTEGER
    return Math.min(...notifications.map((n) => n.id))
  }, [notifications])

  const size = 50

  // [2] 알림 조회 API 요청
  const { data, isLoading, error } = useNotifications({
    lastId,
    size,
  })

  useEffect(() => {
    if (data?.contents) {
      setNotifications((prev) => {
        const incomingIds = new Set(prev.map((item) => item.id))
        const newItems = data.contents.filter(
          (item) => !incomingIds.has(item.id),
        )
        return [...prev, ...newItems]
      })
    }
  }, [data])

  const { mutate: markAsReadAPI } = useMarkAsRead()
  const { mutate: deleteAPI } = useDeleteNotification()

  return (
    <CardTitle>
      <CardTitle.Heading>알림</CardTitle.Heading>
      <CardTitle.Divider />

      <div className="flex-1 overflow-auto my-7">
        <div className="grid grid-cols-1 gap-3 cursor-pointer mb-5"></div>

        <div className="grid grid-cols-1 gap-3 cursor-pointer">
          <NotiList
            notifications={data?.contents ?? []}
            onDelete={(id) => deleteAPI([id])}
            onMarkAsRead={(id) => markAsReadAPI([id])}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </CardTitle>
  )
}

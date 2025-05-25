'use client'

import CardTitle from '#components/_common/CardTitle'
import { useNotisClient } from '#apis/notiClient'
import { usePutNotisClient, useDeleteNotis } from '#apis/notiClient'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'
import NotiList from '#components/ui/NotiList'
import { useMemo, useState, useEffect } from 'react'
import { Button } from '#components/_common/Button'

export default function ClientNotification() {
  const router = useRouter()
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

  const { data, isLoading, error } = useNotisClient({
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

  const { mutate: markAsReadAPI } = usePutNotisClient()
  const { mutate: deleteAPI } = useDeleteNotis()

  return (
    <div className="mx-auto p-4 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <CardTitle.Heading>알림</CardTitle.Heading>
      <CardTitle.Divider />

      <div className="flex-1 overflow-auto my-6">
        <div className="grid grid-cols-1 gap-3 cursor-pointer">
          <div className="mb-3 flfex justify-center items-center">
            <Button
              className="mr-5"
              onClick={() => {
                const unreadIds = notifications
                  .filter((n) => n.status === 'UNREAD')
                  .map((n) => n.id)
                if (unreadIds.length) {
                  markAsReadAPI(unreadIds)
                }
              }}
            >
              모두 읽음
            </Button>
            <Button
              onClick={() => {
                const allIds = notifications.map((n) => n.id)
                if (allIds.length) {
                  deleteAPI(allIds)
                }
              }}
            >
              모두 삭제
            </Button>
          </div>
          <NotiList
            notifications={data?.contents ?? []}
            onDelete={(id) => deleteAPI([id])}
            onMarkAsRead={(id) => markAsReadAPI([id])}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import CardTitle from '#components/_common/CardTitle'
import { Card } from '#components/_common/Card'
import { Button } from '#components/_common/Button'
import { cn } from '#components/lib/utils'
import ItemList from '#components/Layout/ItemList'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { BASE_URL } from '#constants/url'
import { useNotificationStore } from '#stores/notification/useNotificationStore'
import { Notification as NotificationType } from '#types/notification'
import { useItemStore } from '#stores/subscriptions/useItemStore'
import { paymentCycleLabels } from '#types/subscription'
import {
  useNotifications,
  useMarkAsRead,
  useDeleteNotification,
} from '#apis/notiAPI'
import StatusBadge from '#components/Layout/StatusBadge'

export default function NotificationList() {
  const { data, isLoading, error } = useNotifications({ lastId: 0, size: 30 })
  const { mutate: markAsReadAPI } = useMarkAsRead()
  const { mutate: deleteAPI } = useDeleteNotification()

  // TODO
  // [ ]로그인하지 않고 접속하면 로그인 페이지로 이동시키기
  const items = useItemStore((state) => state.items)

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10">
        📭 알림을 불러오는 중...
      </p>
    )
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        ⚠️ 알림을 불러오는 중 오류 발생
      </p>
    )
  if (!data || !data.contents.length)
    return <p className="text-center text-gray-500 mt-10">📭 알림이 없습니다</p>

  return (
    <CardTitle className="mx-auto lg:m-8 p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex flex-col items-center w-full mt-5">
        <h2 className="text-3xl sm:text-3xl font-bold">알림</h2>
        <p className="mt-2">오른쪽으로 스와이프해서 알림을 삭제하세요.</p>
      </div>

      <div className="flex-1 overflow-auto mt-10">
        <div className="grid grid-cols-1 gap-3">
          {data.contents.map((n) => {
            const item = items.find((i) => i.title === n.message)
            return (
              <Card
                key={n.id}
                className={cn(
                  'flex justify-between items-center p-4 shadow-md rounded-lg dark:bg-gray-800 bg-white hover:bg-slate-200',
                )}
                onClick={() => {
                  if (n.status === 'UNREAD') {
                    markAsReadAPI([n.id])
                  }
                }}
              >
                <div className="flex items-center gap-3 relative">
                  <div className="flex-col gap-1 pr-8">
                    <h3 className="font-medium leading-snug">{n.message}</h3>
                    <p className="text-xs text-gray-600">
                      {new Date(n.registerDate).toLocaleString('ko-KR')}
                    </p>
                  </div>
                  {n.status === 'UNREAD' && (
                    <StatusBadge variant="notification" status="UNREAD" />
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteAPI([n.id])
                  }}
                  className="text-red rounded-full p-2 lg:p-3 hover:bg-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </Card>
            )
          })}
        </div>
      </div>
    </CardTitle>
  )
}

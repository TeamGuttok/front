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

export default function NotificationList() {
  const { data, isLoading, error } = useNotifications({ lastId: 0, size: 10 })
  const { mutate: markAsReadAPI } = useMarkAsRead()
  const { mutate: deleteAPI } = useDeleteNotification()

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
    <CardTitle className="mx-auto p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex flex-col items-center w-full mt-5">
        <h2 className="text-3xl sm:text-3xl font-bold">알림</h2>
      </div>
      <div className="w-full h-[1px] bg-border mt-5">
        <div className="relative">
          {/* {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )} */}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-3">
          {data.contents.map((n) => {
            const item = items.find((i) => i.title === n.message)
            return (
              <Card
                key={n.id}
                className={cn(
                  'flex justify-between items-center p-4 shadow-md rounded-lg dark:bg-gray-800',
                  n.status === 'UNREAD'
                    ? 'bg-yellow-100'
                    : 'bg-white hover:bg-slate-200',
                )}
                onClick={() => {
                  if (n.status === 'UNREAD') {
                    markAsReadAPI([n.id])
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-medium">
                      {item?.title ?? '제목 없음'}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {item?.paymentCycle && item?.paymentDay
                        ? `매${paymentCycleLabels[item.paymentCycle]} ${item.paymentDay}일 결제 예정`
                        : '결제 정보 없음'}
                    </p>
                  </div>
                  <div className="text-right">
                    {n.status === 'UNREAD' && (
                      <span className="text-xs font-semibold text-red-500">
                        읽지 않음
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteAPI([n.id])
                  }}
                  className="text-gray-600 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </CardTitle>
  )
}

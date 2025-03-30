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

interface Notification {
  id: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  paymentCycle: string
  paymentDay: string
}
import { isWithinInterval, addDays, parseISO } from 'date-fns'

interface NotificationResponse {
  contents: Notification[]
  size: number
  hasNext: boolean // 현재 페이지 이후 추가로 불러올 데이터 존재 유무
  status: string
  message?: string
}

export default function NotificationList() {
  const queryClient = useQueryClient()
  const { notifications, addNotification, markAsRead, removeNotification } =
    useNotificationStore()

  //알림 GET API
  const {
    // data: notiData,
    isLoading: notiLoading,
    error: notiError,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<NotificationResponse> => {
      const response = await fetch(
        `${BASE_URL}/api/notifications?pageRequest=${encodeURIComponent(
          JSON.stringify({ lastId: 0, size: 0 }),
        )}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      )
      const result: NotificationResponse = await response.json()

      if (!response.ok || result.status !== 'OK') {
        throw new Error(result.message || '알림 데이터를 불러오지 못했습니다.')
      }
      return result
    },
    select: (data) => {
      const today = new Date()
      return data.contents.filter((item) =>
        isWithinInterval(parseISO(item.createdAt), {
          start: today,
          end: addDays(today, 7),
        }),
      )
    },
  })
  // 더미
  // queryFn: async () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         contents: [
  //           {
  //             id: 1,
  //             category: 'subscriptions',
  //             message: '넷플릭스',
  //             status: 'UNREAD',
  //             registerDate: new Date().toISOString(),
  //             updateDate: new Date().toISOString(),
  //           },
  //           {
  //             id: 2,
  //             category: '알림',
  //             message: 'test',
  //             status: 'READ',
  //             registerDate: new Date().toISOString(),
  //             updateDate: new Date().toISOString(),
  //           },
  //         ],
  //         size: 2,
  //         hasNext: false,
  //         status: '100 CONTINUE',
  //       })
  //     }, 500) // 0.5초 후에 데이터 반환
  //   })
  // },
  // queryFn: async () => {
  //   const response = await fetch(`${BASE_URL}/api/notifications`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })

  //   if (!response.ok) {
  //     throw new Error(`알림 리스트 가져오기 실패: ${response.statusText}`)
  //   }

  //   return response.json()
  // },
  //})

  // 알림 읽음 처리 PUT API
  const { mutate: markAsReadAPI } = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${BASE_URL}/api/notifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      })
    },
    onSuccess: (_, id) => {
      markAsRead(id)
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  // 알림 삭제 처리 DELETE API
  const { mutate: deleteAPI } = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${BASE_URL}/api/notifications/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
    },
    onSuccess: (_, id) => {
      removeNotification(id)
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  if (notiLoading)
    return (
      <p className="text-center text-gray-500 mt-10">
        📭 알림을 불러오는 중...
      </p>
    )
  if (notiError)
    return (
      <p className="text-center text-red-500 mt-10">
        ⚠️ 알림을 불러오는 중 오류 발생
      </p>
    )
  if (!notifications.length)
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
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={cn(
                'flex justify-between items-center p-4 shadow-md rounded-lg dark:bg-gray-800',
                !n.isRead ? 'bg-yellow-100' : 'bg-white hover:bg-slate-200',
              )}
              onClick={() => {
                if (!n.isRead) markAsReadAPI(n.id)
              }}
            >
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium">{n.title}</h3>
                  <p className="text-xs text-gray-600">
                    {n.paymentCycle} {n.paymentDay}일 결제 예정
                  </p>
                </div>
                <div className="text-right">
                  {!n.isRead && (
                    <span className="text-xs font-semibold text-red-500">
                      읽지 않음
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteAPI(n.id)
                }}
                className="text-gray-600 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </CardTitle>
  )
}

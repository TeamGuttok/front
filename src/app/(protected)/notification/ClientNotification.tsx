'use client'

import CardTitle from '#components/_common/CardTitle'
import { Card } from '#components/_common/Card'
import { cn } from '#components/lib/utils'
import { Trash2 } from 'lucide-react'
import { useItemStore } from '#stores/subscriptions/useItemStore'
import { useNotifications } from '#apis/notiAPI'
import { useMarkAsRead, useDeleteNotification } from '#apis/notiClient'
import StatusBadge from '#components/ui/StatusBadge'
import { useToast } from '#hooks/useToast'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'

export default function ClientNotification() {
  const router = useRouter()
  const { toast } = useToast()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  // TODO
  // [ ] 미들웨어 연결 후 삭제 (for SEO)
  if (typeof window !== 'undefined' && !isLoggedIn) {
    router.push(PATH.login)
    return null
  }

  const { data, isLoading, error } = useNotifications({
    lastId: 10000,
    size: 10000,
  })
  const { mutate: markAsReadAPI } = useMarkAsRead()
  const { mutate: deleteAPI } = useDeleteNotification()
  const items = useItemStore((state) => state.items)
  const isEmpty =
    !data || !Array.isArray(data.contents) || data.contents.length === 0

  return (
    <CardTitle className="mx-auto lg:m-8 p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem] mt-10">
      <div className="flex flex-col items-center w-full mt-5">
        <h2 className="text-3xl sm:text-3xl font-bold">알림</h2>
      </div>

      <div className="flex-1 overflow-auto mt-10">
        {isLoading ? (
          <p className="text-center text-gray-500 mt-10">
            📭 알림을 불러오는 중...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">
            ⚠️ 알림을 불러오는 중 오류 발생
          </p>
        ) : isEmpty ? (
          <p className="text-center text-gray-500 mt-10">📭 알림이 없습니다</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 cursor-pointer">
            {data.contents
              .filter((n) => n.category === 'REMINDER')
              .map((n) => {
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
                      <div className="flex-col gap-1 pr-10">
                        <h3 className="font-medium leading-snug">
                          {n.message}
                        </h3>
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
        )}
      </div>
    </CardTitle>
  )
}

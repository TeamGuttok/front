'use client'

import { Button } from '#components/_common/Button'
import { PATH } from '#app/routes'
import Link from 'next/link'
import ItemList from '#components/Layout/ItemList'
import { getHours } from 'date-fns'
import { Plus } from 'lucide-react'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { useItemStore } from '#stores/subscriptions/useItemStore'
import { getGreeting } from '#hooks/getGreeting'
import { useMyProfileQuery } from '#apis/userClient'

export default function Page() {
  const currentHour = getHours(new Date())
  const { user } = useAuthStore()
  const { data: userInfo, isLoading } = useMyProfileQuery()
  const nickName = userInfo?.nickName

  const total = useItemStore((state) => state.getTotalPaymentAmount)

  return (
    <div className="mx-auto p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold flex flex-row">
            {getGreeting(nickName, isLoading)}
          </h1>
          <h2>
            이번 달 지출은{' '}
            <span className="font-bold">
              ₩
              {useItemStore.getState().getTotalPaymentAmount().toLocaleString()}
            </span>{' '}
            입니다.
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <ItemList />
      </div>

      <div className="fixed bottom-[5.5rem] sm:bottom-[3rem] right-4 sm:right-10 transform h-14 rounded-full shadow-lg flex items-center justify-center">
        <Link href={PATH.itemAdd} aria-label="구독 아이템 추가 페이지로 이동">
          <Button className="flex w-16 h-16 rounded-full shadow-lg items-center justify-center">
            <Plus size={48} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

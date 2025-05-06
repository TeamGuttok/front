'use client'

import Link from 'next/link'
import { Button } from '#components/_common/Button'
import { PATH } from '#app/routes'
import { useNotifications } from '#apis/notiAPI'
import { Notification } from '#types/notification'

export default function RegisterSuccess() {
  const { data, isLoading, isError } = useNotifications({ lastId: 1, size: 1 })

  const applicationNotifications: Notification[] =
    data?.contents.filter((item) => item.category === 'APPLICATION') || []

  return (
    <div className="flex flex-col items-center m-auto">
      {isLoading && (
        <p className="mt-6 text-sub text-sm">알림을 불러오는 중입니다...</p>
      )}
      {isError && (
        <p className="mt-6 text-error text-sm">알림을 가져오지 못했습니다.</p>
      )}

      {!isLoading && applicationNotifications[0] && (
        <>
          <div className="flex flex-col gap-1 text-center text-2xl font-bold">
            <p>{applicationNotifications[0].message}</p>
          </div>

          <div className="flex flex-col gap-1 mt-6 text-center text-lg font-medium text-sub">
            <p>관리의 새로운 시작,</p>
            <p>구똑과 함께 스마트한 구독 생활을 시작해 보세요</p>
          </div>
        </>
      )}

      <Link href={PATH.main} className="mt-8">
        <Button size="lg" className="rounded-lg">
          메인으로 가기
        </Button>
      </Link>
    </div>
  )
}

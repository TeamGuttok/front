'use client'

import { Button } from '#components/_common/Button'
import { PATH } from '#app/routes'
import Link from 'next/link'
import { getHours } from 'date-fns'
import { CalendarDays, Plus } from 'lucide-react'
import ItemList from '../../app/item/page'

export default function Page() {
  const currentHour = getHours(new Date())

  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) return <h3>좋은 아침입니다,</h3>
    if (currentHour >= 12 && currentHour < 18) return <h3>좋은 점심입니다,</h3>
    return <h3>좋은 저녁입니다, </h3>
  }

  return (
    <div className="mx-auto p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold flex flex-row">
            {getGreeting()}
            <span>&nbsp;</span>
            <p>
              <span>사용자</span> 님.
            </p>
          </h1>
          <h2>
            이번 달 지출은 <span className="font-bold">₩24,400</span> 입니다.
          </h2>
        </div>
        <Link
          href={PATH.calendarView}
          aria-label="캘린더 페이지로 이동"
          className="sm:hidden flex items-center"
        >
          <Button className="w-11 h-11">
            <CalendarDays size={35} />
          </Button>
        </Link>
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

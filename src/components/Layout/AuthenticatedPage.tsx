'use client'

import { Button } from '#components/_common/Button'
import { PATH } from '#app/routes'
import Link from 'next/link'
<<<<<<< HEAD
import { getHours } from 'date-fns'
import { CalendarDays, Plus } from 'lucide-react'
import ItemList from '../../app/item/page'
=======
import { cn } from '#components/lib/utils'
import { getHours } from 'date-fns'
import { CalendarDays, Plus } from 'lucide-react'
import { Card } from '#components/_common/Card'

const subscriptions = [
  {
    id: 1,
    name: '넷플릭스',
    price: 13500,
    cycle: '매월 15일 결제',
    shared: false,
    color: 'bg-red-500',
  },
  {
    id: 3,
    name: '헬스장',
    price: 100000,
    cycle: '3개월 마다 20일 결제',
    shared: false,
    color: 'bg-blue-500',
  },
  {
    id: 4,
    name: '가족 넷플릭스',
    price: 3375,
    cycle: '4인 공동 구독',
    shared: true,
    color: 'bg-purple-500',
  },
]
>>>>>>> upstream/main

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
<<<<<<< HEAD
        <ItemList />
      </div>

      <div className="fixed bottom-[5.5rem] sm:bottom-[3rem] right-4 sm:right-10 transform h-14 rounded-full shadow-lg flex items-center justify-center">
        <Link href={PATH.itemAdd} aria-label="구독 아이템 추가 페이지로 이동">
          <Button className="flex w-16 h-16 rounded-full shadow-lg items-center justify-center">
            <Plus size={48} />
          </Button>
        </Link>
=======
        <div className="grid grid-cols-1 gap-3">
          {subscriptions.map((sub) => (
            <Card
              key={sub.id}
              className={cn(
                'flex justify-between items-center p-4 rounded-lg shadow-md',
                sub.shared ? 'bg-red-100' : 'bg-white',
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-full', sub.color)}></div>
                <div>
                  <h3 className="font-medium">{sub.name}</h3>
                  <p className="text-xs text-gray-500">{sub.cycle}</p>
                </div>
              </div>
              <div className="text-right">
                {/* {sub.invitePending ? (
                <Button variant="outline" size="sm">
                  초대 대기
                </Button>
              ) : (
                <p className="text-sm font-semibold">
                  ₩{sub.price.toLocaleString()}
                </p>
              )} */}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[5.5rem] sm:bottom-[3rem] right-4 sm:right-10 transform h-14 rounded-full shadow-lg flex items-center justify-center">
        <Button className="flex w-16 h-16 rounded-full shadow-lg items-center justify-center">
          <Plus size={48} className="w-14 h-14" />
        </Button>
>>>>>>> upstream/main
      </div>
    </div>
  )
}

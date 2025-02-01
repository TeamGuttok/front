'use client'

import { Button } from '#components/_common/Button'
import { PATH } from '#app/routes'
import Link from 'next/link'
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

export default function Page() {
  const currentHour = getHours(new Date())

  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) return <h3>좋은 아침입니다, </h3>
    if (currentHour >= 12 && currentHour < 18) return <h3>좋은 점심입니다, </h3>
    return <h3>좋은 저녁입니다, </h3>
  }

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          {/* <div className="text-xl font-semibold flex flex-row"> */}
          <div>
            {getGreeting()}
            <span>&nbsp;</span>
            <h3>사용자 님.</h3>
          </div>
          <div>
            <p>
              이번 달 지출은 <span className="font-bold">₩24,400</span> 입니다.
            </p>
          </div>
          <Link
            href={PATH.calendarView}
            aria-label="캘린더 페이지로 이동"
            className="sm:hidden block"
          >
            <Button>
              <CalendarDays className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3">
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

        {/* 추가 버튼 */}
        <div className="flex justify-center mt-6">
          <Button className="w-full max-w-xs flex items-center gap-2">
            <Plus className="w-4 h-4" /> 추가하기
          </Button>
        </div>
      </div>
    </>
  )
}

import Link from 'next/link'
import { PATH } from '#app/routes'
import { Card } from '#components/_common/Card'
import { cn } from '#components/lib/utils'

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

export default function ItemList() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {subscriptions.map((sub) => (
        <Link key={sub.id} href={PATH.itemDetail(sub.id)} passHref>
          <Card
            key={sub.id}
            className={cn(
              'flex justify-between items-center p-4 rounded-lg shadow-md dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700',
              sub.shared ? 'bg-red-100' : 'bg-white',
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn('w-8 h-8 rounded-full', sub.color)}></div>
              <div className="dark:color-black">
                <h3 className="font-medium">{sub.name}</h3>
                <p className="text-xs dark:text-gray-500">{sub.cycle}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                ₩{sub.price.toLocaleString()}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

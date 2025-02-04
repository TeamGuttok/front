import Link from 'next/link'
import { PATH } from '#app/routes'
import CardTitle from '#components/_common/CardTitle'
import { Card } from '#components/_common/Card'
import { Button } from '#components/_common/Button'
import { cn } from '#components/lib/utils'
import ItemList from '#app/item/page'

export default function Notification() {
  return (
    <CardTitle className="mx-auto p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex flex-col items-center w-full mt-5">
        <h2 className="text-3xl sm:text-3xl font-bold">알림</h2>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>
      <div className="flex-1 overflow-auto">
        <Link href={PATH.groupDetail(1)} passHref>
          <Card
            key={1}
            className={cn(
              'mb-2 bg-red-100 dark:bg-red-300 hover:bg-slate-200 hover:dark:bg-red-00 flex justify-between items-center p-4 rounded-lg shadow-md',
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn('w-8 h-8 rounded-full')}></div>
              <div>
                <h3 className="font-medium">유튜브 프리미엄 그룹 초대</h3>
                <p className="text-xs text-gray-500">
                  김민수 님이 그룹에 초대하셨습니다
                </p>
              </div>
              <p className="px-3 py-1 text-sm text-red-600 bg-red-600/20 rounded-2xl">
                초대 대기
              </p>
            </div>
            <div className="text-right">
              <Button>
                <span>수락</span>
              </Button>
              <Button className="ml-2 bg-white dark:bg-slate-200 hover:bg-slate-300">
                <span className="text-black dark:font-white">거절</span>
              </Button>
            </div>
          </Card>
        </Link>
        <ItemList />
      </div>
    </CardTitle>
  )
}

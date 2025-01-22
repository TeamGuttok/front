import Link from 'next/link'
import { CalendarRange, Plus, ReceiptText } from 'lucide-react'
import { PATH } from '#app/routes'

export default function Group() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:w-[calc(100vw-16rem)] sm:max-w-[60rem] m-4 sm:mx-auto sm:mt-8">
        <div className="p-6 bg-secondary rounded-xl shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-0">
            <p className="text-lg font-semibold">넷플릭스 프리이엄 4인</p>
            <p className="px-3 py-1 text-sm text-primary bg-primary/20 rounded-2xl">
              다음 결제일: 2024.02.15
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-3 mt-4">
              <ReceiptText size={18} className="mt-[3px]" />
              <div className="flex flex-col">
                <p className="font-medium">월 납부금액</p>
                <p className="text-sm text-gray-500">4,500원/ (4인 분배)</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <CalendarRange size={18} className="mt-[3px]" />
              <div className="flex flex-col">
                <p className="font-medium">구독 상태</p>
                <p className="text-sm text-gray-500">정상 이용 중</p>
              </div>
            </div>
          </div>

          <Link
            href={PATH.groupDetail(1)}
            className="flex w-full justify-center mt-4 p-2 text-sm bg-primary text-primary-foreground rounded-lg"
          >
            그룹으로 이동
          </Link>
        </div>
      </div>

      <Link
        href={PATH.groupAdd}
        className="absolute bottom-6 right-6 flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg"
        aria-label="그룹 추가하기"
      >
        <Plus size={20} strokeWidth={3} aria-label="추가하기 아이콘" />
      </Link>
    </>
  )
}

import { CalendarRange, ReceiptText } from 'lucide-react'
import { Button } from '#components/_common/Button'

export default function Group() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 m-4 sm:m-10">
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

        <Button className="w-full mt-4 rounded-lg">그룹으로 이동</Button>
      </div>
    </div>
  )
}

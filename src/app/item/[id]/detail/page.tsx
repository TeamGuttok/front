import Link from 'next/link'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'
import { Settings, Trash2 } from 'lucide-react'

export default async function SubscriptionDetailPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const itemId = (await params).id
  const groupClassName = 'flex items-start justify-around'
  const labelClassName =
    'block mb-1 sm:mb-0 tracking-wide text-lg font-medium text-nowrap'

  return (
    <>
      <div className="flex dark:text-black bg-white rounded-xl flex-col max-w-[30rem] sm:max-w-[42rem] p-8 sm:rounded-md sm:border sm:border-border m-auto -translate-y-8 px-10 pb-8">
        <h1 className="text-3xl font-bold justify-center text-center">
          구독 서비스 상세 정보
        </h1>
        <div className="flex flex-col justify-center mt-8">
          <form className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 flex-col gap-2 sm:gap-4">
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>구독 서비스</span>
                <span className="text-lg">넷플릭스</span>
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 금액</span>
                <span className="text-lg">13,500원</span>
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 주기</span>
                <span className="text-lg">매주 3일</span>
              </div>

              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 수단</span>
                <span className="text-lg">네이버페이</span>
              </div>

              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>메모</span>
                <span className="text-lg">test</span>
              </div>
            </div>
            <div className="flex justify-end pb-1">
              <button className="mr-6">
                <Trash2
                  className="w-full h-full text-gray-500"
                  aria-label="삭제 아이콘"
                />
              </button>
              <Link
                href={PATH.itemEdit(itemId)}
                aria-label="수정 페이지로 이동"
              >
                <Settings
                  className="w-full h-full text-gray-500"
                  aria-label="수정 아이콘"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

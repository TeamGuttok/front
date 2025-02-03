import Link from 'next/link'
import { PATH } from '#app/routes'
import { Button } from '#components/_common/Button'
import CardTitle from '#components/_common/CardTitle'
import { cn } from '#components/lib/utils'

export default async function SubscriptionDetailPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const itemId = (await params).id
  const groupClassName = 'flex items-start sm:items-center justify-between'
  const labelClassName =
    'block mb-1 sm:mb-0 tracking-wide text-lg font-medium text-nowrap'

  return (
    <>
      <CardTitle className="flex flex-col max-w-[40rem] sm:max-w-[52rem] sm:p-8 sm:rounded-md sm:border sm:border-border m-auto -translate-y-8 px-4">
        <h1 className="text-3xl font-bold justify-center text-center">
          구독 서비스 상세 정보
        </h1>
        <div className="flex flex-col justify-center items-center my-8">
          <form className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 flex-col gap-2 sm:gap-4">
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>구독 서비스</span>
                <span className="text-lg font-semibold">넷플릭스</span>
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 금액</span>
                <span className="text-lg font-semibold">13,500원</span>
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 주기</span>
                <span className="text-lg font-semibold">매주 3일</span>
              </div>

              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 수단</span>
                <span className="text-lg font-semibold">네이버페이</span>
              </div>

              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>메모</span>
                <p>메모내용</p>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            key={itemId}
            href={PATH.itemEdit(itemId)}
            passHref
            aria-label="수정 페이지로 이동"
          >
            <Button
              type="submit"
              className="w-full py-2 mt-4 text-base text-white shadow primary"
            >
              수정하기
            </Button>
          </Link>
        </div>
      </CardTitle>
    </>
  )
}

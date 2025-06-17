'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'
import { Settings, Trash2 } from 'lucide-react'
import {
  paymentCycleLabels,
  paymentMethodLabels,
  serviceNameLabels,
} from '#types/subscription'
import { useRouter, useParams } from 'next/navigation'
import { useDeleteItems } from '#apis/subscriptionClient'
import { groupClassName, labelClassName } from '#style/style'
import { CardTitle } from '#components/_common/Card'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '#components/_common/AlertDialog'

interface ClientDetailViewProps {
  params: { id: string }
  initialData?: any
}

export default function ClientDetailView({
  params,
  initialData,
}: ClientDetailViewProps) {
  const router = useRouter()
  //const { id } = params
  //const params = useParams<{ id: string }>()

  // if (!params?.id || isNaN(Number(params.id))) {
  //   return <p className="text-center text-gray-500">잘못된 접근입니다.</p>
  // }

  const itemId = Number(params.id)
  const item = initialData // useGetDetailClient(itemId, { initialData: initialData })
  // const { isLoading, error } = useGetDetailClient(params.id)
  const { mutate: deleteSubscription } = useDeleteItems()
  // const { data: item } = useGetDetailClient(String(itemId), {
  //   enabled: !!itemId && typeof window !== 'undefined',
  // })

  if (!item) {
    return (
      <p className="text-center text-gray-500">
        구독 데이터를 불러오지 못했습니다.
      </p>
    )
  }

  const handleDelete = () => {
    deleteSubscription(
      { id: Number(itemId) },
      {
        onSuccess: () => {
          router.push(PATH.main)
        },
      },
    )
  }

  // if (isLoading) {
  //   return <p className="text-center text-gray-500">로딩 중..</p>
  // } else if (error) {
  //   console.error(error)
  //   return (
  //     <p className="text-center text-gray-500">
  //       구독 데이터를 불러오지 못했습니다. {String(error)}
  //     </p>
  //   )
  // } else if (!item) {
  //   return (
  //     <p className="text-center text-gray-500">
  //       구독 서비스가 존재하지 않습니다.
  //     </p>
  //   )
  // }

  return (
    <CardTitle className="mx-auto lg:m-8 p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem] mt-10">
      <div className="flex dark:text-black bg-white rounded-xl flex-col max-w-[30rem] sm:max-w-[42rem] p-8 sm:rounded-md sm:border sm:border-border m-auto -translate-y-8 px-10 pb-8">
        <h1 className="text-3xl font-bold justify-center text-center">
          구독 서비스 상세 정보
        </h1>
        <div className="w-full h-[1px] bg-border mt-5"></div>

        <div className="flex flex-col justify-center mt-8">
          <form className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 flex-col gap-2 sm:gap-4">
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>구독 서비스</span>
                <span className="font-light text-base">
                  {item.title?.trim()
                    ? item.title
                    : serviceNameLabels[item.subscription]}
                </span>
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 금액</span>
                <span className="font-light text-base">
                  {item.paymentAmount}
                </span>
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 주기</span>
                <span className="font-light text-base">
                  {' '}
                  매{paymentCycleLabels[item.paymentCycle]} {item.paymentDay}일
                </span>
              </div>

              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 수단</span>
                <span className="font-light text-base">
                  {paymentMethodLabels[item.paymentMethod] ??
                    item.paymentMethod}
                </span>
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>메모</span>
                <span className="font-light text-base max-w-40 text-right">
                  {item.memo}
                </span>
              </div>
            </div>
            <div className="flex justify-end pb-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="p-3 hover:bg-red-500 rounded-full"
                  >
                    <Trash2
                      className="w-6 h-6 text-gray-500 "
                      aria-label="삭제 아이콘"
                    />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent aria-describedby="delete-description">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      해당 항목을 삭제하시겠습니까?
                    </AlertDialogTitle>
                    <AlertDialogDescription id="delete-description">
                      해당 구독 서비스 및 고정 지출에 대한 모든 정보가
                      삭제됩니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <button type="submit" onClick={handleDelete}>
                        삭제
                      </button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Link
                href={PATH.itemEdit(itemId)}
                aria-label="수정 페이지로 이동"
                className="p-3 flex items-center justify-center rounded-full hover:bg-gray-200"
              >
                <Settings
                  className="w-6 h-6 text-gray-500"
                  aria-label="수정 아이콘"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </CardTitle>
  )
}

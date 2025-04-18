'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'
import { Settings, Trash2 } from 'lucide-react'
import { useItemStore } from '#stores/subscriptions/useItemStore'
import {
  paymentCycleLabels,
  paymentMethodLabels,
  serviceNameLabels,
  // subscriptionRequest,
} from '#types/subscription'
import { useRouter, useParams } from 'next/navigation'
import { useDeleteSubscription } from '#apis/subscriptionAPI'
import {
  //useSubscriptionsClient,
  useSubscriptionItem,
} from '#apis/subscriptionClient'

export default function SubscriptionDetailPage() {
  //   params,
  // }: {
  //   params: Promise<{ id: string }>
  // }) {

  const router = useRouter()
  const params = useParams<{ id: string }>()
  const itemId = params.id
  // const itemId = props.params.id
  //const item = useItemStore.getState().items.find((i) => i.useId === itemId)
  const { data: item, isLoading, error } = useSubscriptionItem(params.id)
  //const item = useItemStore.getState().getItemById(itemId)
  const deleteMutation = useDeleteSubscription()

  const handleDelete = () => {
    if (!item?.id) return
    deleteMutation.mutate(Number(item.id), {
      onSuccess: () => {
        useItemStore.getState().removeItem(item.useId)
        router.push('/')
      },
      onError: (err) => {
        console.error('삭제 실패:', err)
      },
    })
  }

  const groupClassName = 'flex items-start justify-around'
  const labelClassName =
    'block mb-1 sm:mb-0 tracking-wide text-lg font-medium text-nowrap'

  if (isLoading) {
    return <p className="text-center text-gray-500">로딩 중..</p>
  } else if (error) {
    console.error(error)
    return (
      <p className="text-center text-gray-500">
        구독 데이터를 불러오지 못했습니다. {String(error)}
      </p>
    )
  } else if (!item) {
    return (
      <p className="text-center text-gray-500">
        구독 서비스 상세 정보를 찾을 수 없습니다.
      </p>
    )
  }

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
                {/* <span className="text-lg">{item.title}</span> */}
                {item.title?.trim()
                  ? item.title
                  : (serviceNameLabels[item.subscription] ?? '알 수 없음')}
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 금액</span>
                <span className="text-lg">{item.paymentAmount}</span>
              </div>
              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 주기</span>
                <span className="text-lg">
                  {' '}
                  매{paymentCycleLabels[item.paymentCycle]} {item.paymentDay}일
                </span>
              </div>

              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>결제 수단</span>
                <span className="text-lg">
                  {paymentMethodLabels[item.paymentMethod] ??
                    item.paymentMethod ??
                    '미지정'}
                </span>
              </div>

              <div className={cn(groupClassName)}>
                <span className={cn(labelClassName)}>메모</span>
                <span className="text-lg">{item?.memo}</span>
              </div>
            </div>
            <div className="flex justify-end pb-1">
              <button onClick={handleDelete} className="mr-6">
                <Trash2
                  className="w-full h-full text-gray-500"
                  aria-label="삭제 아이콘"
                />
              </button>
              <Link
                href={PATH.itemEdit(Number(item.useId))}
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

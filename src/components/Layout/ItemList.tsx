'use client'

import {
  useSubscriptionsClient,
  usePatchPaymentStatus,
} from '#apis/subscriptionClient'
import ItemCard from './itemCard'

export default function ItemList() {
  const { data, isLoading, error } = useSubscriptionsClient()
  const patchStatus = usePatchPaymentStatus()
  const items = data?.contents ?? []

  if (isLoading) {
    return <p className="text-center text-gray-500">로딩 중...</p>
  }

  if (error) {
    console.error('조회 에러:', error)
    return (
      <p className="text-center text-gray-500">
        구독 데이터를 불러오지 못했습니다.
      </p>
    )
  }

  if (!items.length) {
    return (
      <p className="text-center text-gray-500">저장된 구독 항목이 없습니다.</p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )

  // return (
  //   <div className="grid grid-cols-1 gap-3">
  //     {items.map((item) => {
  //       const service = KNOWN_SERVICES.find((s) => s.id === item.subscription)
  //       const iconUrl = service?.iconUrl ?? ''

  //       const swipeHandlers = useSwipeable({
  //         onSwipedRight: () => {
  //           if (item.paymentStatus !== 'COMPLETED') {
  //             patchStatus.mutate({
  //               id: item.id,
  //               status: 'COMPLETED' as const,
  //             })
  //           }
  //         },
  //       })

  //       return (
  //         <div key={item.id} {...swipeHandlers}>
  //           <Link key={item.id} href={PATH.itemDetail(item.id)} passHref>
  //             <Card
  //               className={cn(
  //                 'flex justify-between items-center p-4 rounded-lg shadow-md dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700',
  //                 item.paymentStatus === 'PENDING' ? 'bg-red-100' : 'bg-white',
  //               )}
  //             >
  //               <div className="flex items-center gap-3">
  //                 {item.subscription === 'CUSTOM_INPUT' ? (
  //                   <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-black uppercase">
  //                     {item.title?.charAt(0) || ''}
  //                   </div>
  //                 ) : (
  //                   <div
  //                     className="w-8 h-8 rounded-full bg-gray-300"
  //                     style={{
  //                       backgroundImage: `url(${iconUrl})`,
  //                       backgroundSize: 'cover',
  //                       backgroundPosition: 'center',
  //                     }}
  //                   />
  //                 )}
  //                 <div>
  //                   <h3 className="font-medium">
  //                     {item.title?.trim()
  //                       ? item.title
  //                       : (serviceNameLabels[item.subscription] ??
  //                         '알 수 없음')}
  //                     <StatusBadge
  //                       status={item.paymentStatus}
  //                       paymentDay={item.paymentDay}
  //                     />
  //                   </h3>
  //                   <p className="text-xs dark:text-gray-500">
  //                     {item.paymentCycle
  //                       ? `매${
  //                           paymentCycleLabels[
  //                             item.paymentCycle as keyof typeof paymentCycleLabels
  //                           ]
  //                         } ${item.paymentDay}일 결제`
  //                       : '주기 미지정'}
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className="text-right">
  //                 <p className="text-sm font-semibold">
  //                   ₩{item.paymentAmount?.toLocaleString()}
  //                 </p>
  //               </div>
  //             </Card>
  //           </Link>
  //         </div>
  //       )
  //     })}
  //   </div>
  // )
}

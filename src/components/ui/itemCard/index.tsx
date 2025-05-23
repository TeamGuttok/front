'use client'

import { useSwipeable } from 'react-swipeable'
import Link from 'next/link'
import { Card } from '#components/_common/Card'
import { cn } from '#components/lib/utils'
import { PATH } from '#app/routes'
import {
  SubscriptionContents,
  paymentCycleLabels,
  serviceNameLabels,
} from '#types/subscription'
import { KNOWN_SERVICES } from '#constants/knownServices'
import { usePatchPaymentStatusClient } from '#apis/subscriptionClient'

type Props = {
  item: SubscriptionContents
}

export default function ItemCard({ item }: Props) {
  const service = KNOWN_SERVICES.find((s) => s.id === item.subscription)
  const iconUrl = service?.iconUrl ?? ''

  const patchStatus = usePatchPaymentStatusClient()

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (item.paymentStatus !== 'COMPLETED') {
        patchStatus.mutate({
          id: item.id,
          status: 'COMPLETED',
        })
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <Link href={PATH.itemDetail(item.id)} passHref>
      <Card
        {...swipeHandlers}
        className={cn(
          'flex justify-between items-center p-4 rounded-lg shadow-md dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700',
          'bg-white',
        )}
      >
        <div className="flex items-center gap-3">
          {item.subscription === 'CUSTOM_INPUT' ? (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-black uppercase">
              {item.title?.charAt(0) || ''}
            </div>
          ) : (
            <div
              className="w-8 h-8 rounded-full bg-gray-300"
              style={{
                backgroundImage: `url(${iconUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          <div>
            <h3 className="font-medium">
              {item.title?.trim()
                ? item.title
                : (serviceNameLabels[item.subscription] ?? '알 수 없음')}
            </h3>
            <p className="text-xs dark:text-gray-500">
              {item.paymentCycle
                ? `매${
                    paymentCycleLabels[
                      item.paymentCycle as keyof typeof paymentCycleLabels
                    ]
                  } ${item.paymentDay}일 결제`
                : '주기 미지정'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">
            ₩{item.paymentAmount?.toLocaleString()}
          </p>
        </div>
      </Card>
    </Link>
  )
}

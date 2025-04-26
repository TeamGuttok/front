'use client'

import type { StatusBadgeProps } from '#types/notification'

export default function StatusBadge({
  status,
  paymentDay,
  variant,
}: StatusBadgeProps) {
  if (variant === 'notification' && status === 'UNREAD') {
    return (
      <div
        className="absolute top-0 right-0 text-[0.6rem] sm:text-xs font-semibold text-yellow-100 dark:text-yellow-900 bg-amber-500
      py-1 px-2 ml-4 rounded-lg whitespace-normal text-center"
      >
        <p>읽지</p>
        <p>않음</p>
      </div>
    )
  }

  if (variant === 'subscription' && status === 'PENDING') {
    const today = new Date()
    const currentDay = today.getDate()
    const diff = paymentDay - currentDay

    if (diff <= 7) {
      return (
        <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-md ml-2">
          결제 예정
        </span>
      )
    }
  }

  return null
}

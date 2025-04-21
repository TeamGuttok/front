'use client'

import type { StatusBadgeProps } from '#types/notification'

export default function StatusBadge({
  status,
  paymentDay,
  variant,
}: StatusBadgeProps) {
  if (variant === 'notification' && status === 'UNREAD') {
    return (
      <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-md ml-2">
        읽지 않음
      </span>
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

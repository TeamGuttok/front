'use client'

type Props = {
  status: 'PENDING' | 'COMPLETED'
  paymentDay: number
}

export default function StatusBadge({ status, paymentDay }: Props) {
  const today = new Date()
  const currentDay = today.getDate()
  const diff = paymentDay - currentDay

  const showBadge = status === 'PENDING' && diff <= 7

  if (!showBadge) return null

  return (
    <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-md ml-2">
      결제 대기
    </span>
  )
}

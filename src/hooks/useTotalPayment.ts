'use client'

import { useMemo } from 'react'
import { useSubscriptionsClient } from '#apis/subscriptionClient'
import { parseISO } from 'date-fns'

export function useCurrentMonthPaymentTotal() {
  const { data } = useSubscriptionsClient()
  const items = data?.contents ?? []
  const now = new Date()

  const total = useMemo(() => {
    return items
      .filter((item) => {
        const regDate = parseISO(item.registerDate)
        const isMonthly = item.paymentCycle === 'MONTHLY'
        const isYearlyThisMonth =
          item.paymentCycle === 'YEARLY' &&
          regDate.getMonth() === now.getMonth()

        return isMonthly || isYearlyThisMonth
      })
      .reduce((sum, item) => sum + item.paymentAmount, 0)
  }, [items])

  return total
}

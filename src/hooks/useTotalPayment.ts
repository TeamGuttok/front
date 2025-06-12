'use client'

import { useMemo } from 'react'
import { parseISO } from 'date-fns'
import { useGetItemsClient } from '#apis/subscriptionClient'

export function useCurrentMonthPaymentTotal() {
  const { data } = useGetItemsClient()

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
      .reduce((sum, item) => sum + (Number(item.paymentAmount) || 0), 0)
  }, [items])

  return total
}

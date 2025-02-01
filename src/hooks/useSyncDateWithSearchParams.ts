import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useCalendarStore } from '#stores/useCalendarStore'

export const useSyncDateWithSearchParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentDate = useCalendarStore((state) => state.currentDate)
  const setCurrentDate = useCalendarStore((state) => state.setCurrentDate)
  const resetStore = useCalendarStore((state) => state.resetStore)

  // params -> store (on mount)
  useEffect(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      const parsedDate = new Date(dateParam)
      if (!isNaN(parsedDate.getTime())) {
        setCurrentDate(parsedDate)
      }
    }

    return () => {
      resetStore()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // store -> params (on state change)
  useEffect(() => {
    if (!currentDate) return

    const existingDateParam = searchParams.get('date')
    const currentDateStr = currentDate.toISOString().split('T')[0]

    if (existingDateParam !== currentDateStr) {
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.set('date', currentDateStr)
      router.replace(`?${newParams.toString()}`)
    }
  }, [currentDate, router, searchParams])
}

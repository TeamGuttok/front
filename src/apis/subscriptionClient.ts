'use client'

//import { BASE_URL } from '#constants/url'
import { getSubscriptions } from './subscriptionAPI'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

//구독 서비스 생성 (post)
export const useSubscriptionsClient = (lastId = 0, size = 20) => {
  return useQuery({
    queryKey: ['subscriptions', lastId],
    queryFn: () => getSubscriptions(lastId, size),
  })
}

// 구독 서비스 개별 조회 (/detail)
export function useSubscriptionItem(id: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['subscription', id],
    queryFn: async () => {
      const listData: any = queryClient.getQueryData(['subscriptions'])
      if (listData) {
        const found = listData.contents.find((i: any) => String(i.id) === id)
        if (found) return found
      }

      const data = await getSubscriptions()
      const item = data.contents.find((i) => String(i.id) === id)
      if (!item) throw new Error('아이템을 찾을 수 없습니다.')
      return item
    },
  })
}

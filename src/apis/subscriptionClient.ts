'use client'

import { BASE_URL } from '#constants/url'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getSubscriptions,
  updataSubscription,
  deleteSubscription,
} from '#apis/subscriptionAPI'
import { paymentStatus, SubscriptionContents } from '#types/subscription'
import { useIsLoggedInQuery } from '#hooks/useIsLoggedInQuery'

// 전체 서비스 조회 (/)
export const useSubscriptionsClient = (
  lastId = Number.MAX_SAFE_INTEGER,
  size = Number.MAX_SAFE_INTEGER,
) => {
  return useIsLoggedInQuery(['subscriptions', lastId], () =>
    getSubscriptions(lastId, size),
  )
}

// 구독 서비스 개별 조회 (/detail)
export function useSubscriptionItem(
  id: string,
  options?: { enabled?: boolean },
) {
  return useIsLoggedInQuery(
    ['subscription', id],
    () =>
      getSubscriptions().then(
        (data) => data.contents.find((i) => String(i.id) === id) ?? null,
      ),
    options,
  )
}

// 구독 서비스 수정 (patch)
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<SubscriptionContents>
    }) => updataSubscription(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
    },
  })
}

// 결제 서비스 삭제 (delete)
export function useDeleteSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSubscription(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
    },
  })
}

// 결제완료/대기 상태 변경 hook (수정 patch)
export function usePatchPaymentStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: number
      status: paymentStatus
    }) => {
      const res = await fetch(`${BASE_URL}/api/subscriptions/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: status }),
      })

      if (!res.ok) {
        throw new Error('결제 상태 변경 실패')
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
    },
  })
}

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
import { useUserId } from '#hooks/useUserId'
import { useAuthStore } from '#stores/auth/useAuthStore'

// 전체 서비스 조회 (/)
export const useSubscriptionsClient = (
  lastId = Number.MAX_SAFE_INTEGER,
  size = Number.MAX_SAFE_INTEGER,
) => {
  const userId = useUserId()
  const userEmail = useAuthStore((state) => state.user?.email)

  return useIsLoggedInQuery(
    ['subscriptions', userId, lastId],
    () => getSubscriptions({ lastId, size }),
    {
      enabled: !!userId,
    },
  )
}

// 구독 서비스 개별 조회 (/detail)
export function useSubscriptionItem(
  id: string,
  options?: { enabled?: boolean },
) {
  const userId = useUserId()

  return useIsLoggedInQuery(
    ['subscription', userId, id],
    async () => {
      const data = await getSubscriptions()
      return data.contents.find((i) => String(i.id) === id) ?? null
    },
    {
      enabled: !!userId && !!id && (options?.enabled ?? true),
    },
  )
}

// 구독 서비스 수정 (patch)
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<SubscriptionContents>
    }) => updataSubscription(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
    },
  })
}

// 결제 서비스 삭제 (delete)
export function useDeleteSubscription() {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSubscription(id),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId, id] })
    },
  })
}

// 결제완료/대기 상태 변경 hook (수정 patch)
export function usePatchPaymentStatus() {
  const queryClient = useQueryClient()
  const userId = useUserId()

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
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
      queryClient.invalidateQueries({ queryKey: ['subscription', userId, id] })
    },
  })
}

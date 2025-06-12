'use client'

import { BASE_URL } from '#constants/url'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getItems, deleteItems } from '#apis/subscriptionAPI'
import { paymentStatus, SubscriptionContents } from '#types/subscription'
import { useIsLoggedInQuery } from '#hooks/useIsLoggedInQuery'
import { useUserId } from '#hooks/useUserId'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { toast } from '#hooks/useToast'

// 전체 서비스 조회 (/)
export const useGetItemsClient = (
  lastId = Number.MAX_SAFE_INTEGER,
  size = Number.MAX_SAFE_INTEGER,
) => {
  const userId = useUserId()
  const userEmail = useAuthStore((state) => state.user?.email)

  return useIsLoggedInQuery(
    ['subscriptions', userId, userEmail],
    () => getItems({ lastId, size }),
    {
      enabled: !!userId && !!userEmail,
    },
  )
}

// 구독 서비스 개별 조회 (/detail)
export function useGetDetailClient(
  id: string,
  options?: { enabled?: boolean },
) {
  const userId = useUserId()

  return useIsLoggedInQuery(
    ['subscription', userId, id],
    async () => {
      const data = await getItems()
      return data.contents.find((i) => String(i.id) === id) ?? null
    },
    {
      enabled: !!userId && !!id && (options?.enabled ?? true),
    },
  )
}

// 구독 서비스 수정 PATCH
export const useUpdateItemsClient = () => {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation<
    SubscriptionContents,
    Error,
    { id: number; payload: Partial<SubscriptionContents> }
  >({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: Partial<SubscriptionContents>
    }) => {
      const res = await fetch(`${BASE_URL}/api/subscriptions/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '수정에 실패했습니다.')
      }
      return res.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
      toast({
        description: '구독 서비스가 성공적으로 수정되었습니다.',
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error('구독 서비스 수정 실패:', error)
      toast({
        description:
          error.message || '구독 서비스 수정 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 결제 서비스 삭제 (delete)
export function useDeleteItems() {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteItems(id),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId, id] })
    },
  })
}

// 결제완료/대기 상태 변경 hook (수정 patch)
export function usePatchPaymentStatusClient() {
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

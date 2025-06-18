'use client'

import { BASE_URL } from '#constants/url'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { paymentStatus, SubscriptionContents } from '#types/subscription'
import { useIsLoggedInQuery } from '#hooks/useIsLoggedInQuery'
import { useUserId } from '#hooks/useUserId'
import { toast } from '#hooks/useToast'
import type { SubscriptionRequest } from '#types/subscription'
import { fetchNotiRequest, PageRequest } from '#types/notification'

//메인 페이지(/): 구독 항목 전체 서비스 조회 GET
export function useGetItemsClient(pageRequest: PageRequest = fetchNotiRequest) {
  return useQuery({
    queryKey: ['subscriptions', 'client'],
    queryFn: async (): Promise<{ contents: SubscriptionContents[] }> => {
      const query = new URLSearchParams({
        lastId: String(pageRequest.lastId),
        size: String(pageRequest.size),
      })

      const res = await fetch(`${BASE_URL}/api/subscriptions/user?${query}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('구독 항목 불러오기 실패')
      }

      return res.json()
    },
  })
}

// 구독 서비스 개별 조회 (/detail)
export function useGetDetailClient(id: string) {
  return useQuery({
    queryKey: ['subscription', id],
    queryFn: async (): Promise<SubscriptionContents | null> => {
      const res = await fetch(`${BASE_URL}/api/subscriptions/user?size=${id}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()

      const contents = json.contents ?? json.data?.contents ?? []
      return contents.find((i: any) => String(i.id) === id) ?? null
    },
    enabled: !!id,
  })
}

// 구독 서비스 생성 POST
export function postItemClient() {
  return useMutation<SubscriptionRequest, Error, SubscriptionRequest>({
    mutationFn: async (payload: SubscriptionRequest) => {
      const res = await fetch(`${BASE_URL}/api/subscriptions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || '구독 생성 실패')
      }

      return result
    },
    onSuccess: () => {
      toast({
        description: '구독 서비스가 성공적으로 생성되었습니다.',
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error('구독 서비스 생성 실패:', error)
      toast({
        description:
          error.message || '구독 서비스 생성 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 구독 서비스 수정 PATCH
export function useUpdateItemsClient() {
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
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await fetch(`${BASE_URL}/api/subscriptions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '구독 삭제 실패')
      }
      return await res.json()
    },

    onSuccess: () => {
      toast({
        description: '구독 서비스가 성공적으로 삭제되었습니다.',
        variant: 'default',
      })
    },

    onError: (error) => {
      console.error('구독 서비스 삭제 실패:', error)
      toast({
        description:
          error.message || '구독 서비스 삭제 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 결제완료/대기 상태 변경 hook (수정 PATCH)
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

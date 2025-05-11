// knownServices 구독 서비스 리스트 / 구독 항목 생성, 삭제, 수정, 조회

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubscriptionRequest, SubscriptionContents } from '#types/subscription'
import { BASE_URL } from '#constants/url'
import { useUserId } from '#hooks/useUserId'
import { FETCH_ALL } from '#constants/pagination'

// 구독 서비스 리스트 검색
export async function searchService(name: string) {
  const params = new URLSearchParams({ name })
  const url = `${BASE_URL}/api/subscriptions?${params.toString()}`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('검색 요청 실패')
  }

  return res.json()
}

// 구독 서비스 생성 (post)
export const useCreateSubscription = () => {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation({
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
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
    },
  })
}

// 구독서비스 조회 api (get)
export async function getSubscriptions(
  pageRequest: { lastId: number; size: number } = FETCH_ALL,
) {
  const query = new URLSearchParams({
    lastId: String(pageRequest.lastId),
    size: String(pageRequest.size),
  })

  const res = await fetch(
    `${BASE_URL}/api/subscriptions/user?${query.toString()}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('구독 항목 불러오기 실패')
  }

  return res.json()
}

// 구독서비스 수정 api (patch)
export const updataSubscription = async (
  id: number,
  payload: Partial<SubscriptionContents>,
) => {
  const res = await fetch(`${BASE_URL}/api/subscriptions/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || '구독 수정 실패')
  }
  return result
}

// 구독 서비스 삭제 api (delete)
export const deleteSubscription = async (id: number) => {
  const res = await fetch(`${BASE_URL}/api/subscriptions/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || '구독 삭제 실패')
  }
  return result
}

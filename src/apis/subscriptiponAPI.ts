// knownServices 구독 서비스 리스트 / 구독 항목 생성, 삭제, 수정, 조회

// import { BASE_URL } from '#constants/url'
// import { useSearchStore } from '#stores/subscriptions/useSearchStore'
// import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
// import { SubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubscriptionRequest, SubscriptionContents } from '#types/subscription'

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

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

//구독 서비스 생성 (post)
export const useCreateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: SubscriptionRequest) => {
      const res = await fetch(`${BASE_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('구독 생성 실패')
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
    },
  })
}

// 구독서비스 조회 api (get)
export async function getSubscriptions(lastId = 0, size = 20) {
  const params = new URLSearchParams({
    lastId: String(lastId),
    size: String(size),
  })

  const res = await fetch(`${BASE_URL}/api/subscriptions/user?${params}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!res.ok) throw new Error('구독 항목 불러오기 실패')

  return res.json() // { contents, size, hasNext }
}

// 구독서비스 수정 api (patch)
export const patchSubscription = async (
  id: number,
  payload: SubscriptionContents,
) => {
  const res = await fetch(`/api/subscriptions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('구독 항목 수정 실패')
  }

  return res.json()
}

export const usePatchSubscription = () => {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: SubscriptionContents
    }) => {
      const res = await fetch(`${BASE_URL}/api/subscriptions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('구독 항목 수정 실패')
      }

      return res.json()
    },
  })
}

// 구독 서비스 삭제 api (delete)

export const deleteSubscription = async (id: number) => {
  const res = await fetch(`/api/subscriptions/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('구독 항목 삭제 실패')
  }

  return res.json()
}

export const useDeleteSubscription = () => {
  return useMutation({
    mutationFn: deleteSubscription,
  })
}

// export const useUpdateSubscription = () => {
//   const queryClient = useQueryClient()
//   const subscriptionStore = useSubscriptionStore()

//   return useMutation({
//     mutationFn: async (payload: SubscriptionRequest) => {
//       const res = await fetch(
//         `${BASE_URL}/api/subscriptions/${payload.id}`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(payload),
//         },
//       )

//       if (!res.ok) {
//         throw new Error('구독 수정 실패')
//       }

//       return res.json()
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
//     },
//   })
// }

// 마이페이지 조회
export async function getMypage() {
  const url = `${BASE_URL}/api/users`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('마이페이지 조회 실패')
  }
  return res.json()
}

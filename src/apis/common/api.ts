// import { BASE_URL } from '#constants/url'
import { useSearchStore } from '#stores/subscriptions/useSearchStore'
import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { SubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubscriptionRequest } from '#types/subscription'

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

//구독 서비스 생성 (create)
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
// export function useCreateSubscription() {
//   return useMutation({
//     mutationFn: async () => {
//       const { subscriptionData } = useSubscriptionStore.getState() as {
//         subscriptionData: SubscriptionStore
//       }

//       const { paymentStatus, ...rest } = subscriptionData

//       const finalData = {
//         ...rest,
//         title:
//           subscriptionData.subscription === 'CUSTOM_INPUT'
//             ? subscriptionData.title
//             : '',
//       }

//       console.log('[POST] /api/subscriptions payload:', finalData)

//       const res = await fetch(`${BASE_URL}/api/subscriptions`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(finalData),
//       })

//       if (!res.ok) {
//         throw new Error('구독 서비스 생성 실패')
//       }

//       return res.json()
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

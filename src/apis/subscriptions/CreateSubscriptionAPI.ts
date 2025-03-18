import { SubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from '#constants/url'

const useCreateSubscription = () => {
  return useMutation<{ status: string; data: any }, Error, SubscriptionStore>({
    mutationFn: async (data: SubscriptionStore) => {
      const payload = {
        title: data.title,
        subscription: data.subscription,
        paymentAmount: data.paymentAmount,
        paymentMethod: data.paymentMethod,
        paymentCycle: data.paymentCycle,
        paymentDay: data.paymentDay,
        memo: data.memo,
      }

      const response = await fetch(`${BASE_URL}/api/subscriptions`, {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('구독 항목 생성에 실패했습니다.')
      }

      const responseData = await response.json()

      if (responseData.status !== '100 CONTINUE') {
        throw new Error('구독 항목 생성 실패')
      }

      return responseData
    },
    onSuccess: (data) => {
      console.log('구독 항목 생성 성공:', data)
    },
    onError: (error) => {
      console.error('구독 항목 생성 실패:', error)
    },
  })
}

export default useCreateSubscription

// export type CreateSubscriptionResponse = {
//   message: string
//   data: unknown
//   status: string
// }

// const paymentCycleMapping: Record<string, string> = {
//   주: 'WEEKLY',
//   월: 'MONTHLY',
//   년: 'YEARLY',
// }

// const paymentMethodMapping: Record<string, string> = {
//   카드: 'CARD',
//   '계좌 이체': 'BANK_TRANSFER',
//   네이버페이: 'NAVER_PAY',
//   카카오페이: 'KAKAOPAY',
//   '휴대폰 결제': 'MOBILE_PAYMENT',
//   기타: 'OTHER',
// }

// export async function CreateSubscriptionAPI(
//   data: SubscriptionStore,
// ): Promise<CreateSubscriptionResponse> {
//   const payload = {
//     title: data.title,
//     subscription: data.subscription || 'CUSTOM_INPUT',
//     paymentAmount: data.paymentAmount,
//     paymentMethod: data.paymentMethod
//       ? paymentMethodMapping[data.paymentMethod] || data.paymentMethod
//       : undefined,
//     paymentCycle: paymentCycleMapping[data.paymentCycle] || data.paymentCycle,
//     paymentDay: data.paymentDay,
//     memo: data.memo,
//   }
// const fetcher = new Fetcher()
// return fetcher.post<CreateSubscriptionResponse>('/subscriptions', payload)

// import Fetcher from '#apis/fetcher'
// import { SubscriptionStore } from '#stores/useSubscriptionStore'

// const fetcher = new Fetcher()

// export async function CreateSubscriptionAPI(
//   data: SubscriptionStore,
// ): Promise<void> {
//   return fetcher.post<void>('/subscriptions', data)
// }

// import { SubscriptionStore } from '#stores/useSubscriptionStore'

// export async function CreateSubscriptionAPI(
//   data: SubscriptionStore,
// ): Promise<void> {
//   const response = await fetch('/api/subscriptions', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   })

//   if (!response.ok) {
//     throw new Error('구독 서비스 저장에 실패했습니다.')
//   }

//   return response.json()
// }

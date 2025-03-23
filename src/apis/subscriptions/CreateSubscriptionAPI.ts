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
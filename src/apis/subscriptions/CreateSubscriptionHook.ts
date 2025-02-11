import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { CreateSubscriptionAPI } from './CreateSubscriptionAPI'
import { SubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { CreateSubscriptionResponse } from './CreateSubscriptionAPI'

export function useCreateSubscription() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation<CreateSubscriptionResponse, Error, SubscriptionStore>({
    mutationFn: CreateSubscriptionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      router.push('/')
    },
    onError: (error) => {
      console.error(error.message || '저장 중 오류가 발생했습니다.')
    },
  })
}

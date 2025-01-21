import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { saveItemApi } from './saveItemApi';
import { SubscriptionType } from "#stores/useSubscriptionStore";

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, SubscriptionType>({
    mutationFn: saveItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      router.push('/');
    },
    onError: (error) => {
      console.error(error.message || '저장 중 오류가 발생했습니다.');
    },
  });
}

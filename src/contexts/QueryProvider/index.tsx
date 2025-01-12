'use client'

import type { ReactNode } from 'react'
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { toast } from '#hooks/useToast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 0,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      toast({
        title: error.message || '요청에 실패햐였습니다.', // Todo: 에러 코드 소통 필요
        variant: 'destructive',
      })
    },
  }),
})

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

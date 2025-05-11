'use client'

import type { ReactNode } from 'react'
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { toast } from '#hooks/useToast'
import { useMyProfileQuery } from '#apis/userClient'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 0,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, context: { successMessage?: string }) => {
      const message = context?.successMessage
      if (message) {
        toast({
          title: message,
          variant: 'default',
        })
      }
    },
    onError: (error) => {
      toast({
        title: error.message || '요청에 실패하였습니다.',
        variant: 'destructive',
      })
    },
  }),
})

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WrappedWithUserProfile>{children}</WrappedWithUserProfile>
    </QueryClientProvider>
  )
}

function WrappedWithUserProfile({ children }: { children: ReactNode }) {
  useMyProfileQuery()
  return <>{children}</>
}

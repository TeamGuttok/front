import { useAuthStore } from '#stores/auth/useAuthStore'
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { useMemo } from 'react'

export function useIsLoggedInQuery<
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = [],
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TData, TError> {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const mergedOptions = useMemo(
    () => ({
      ...options,
      enabled: isLoggedIn && (options?.enabled ?? true),
    }),
    [isLoggedIn, options],
  )

  return useQuery({
    queryKey,
    queryFn,
    ...mergedOptions,
  })
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from './userAPI'

export function useUserNickname() {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfo,
    select: (data) => data.nickName,
  })
}

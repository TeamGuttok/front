'use client'

import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query'
import {
  getUserInfo,
  patchUserNickName,
  patchUserPassword,
  deleteUser,
} from './userAPI'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'
import { userInfo } from '#types/user'

// 마이페이지 조회 get
export const useMyProfileQuery = (
  options?: Partial<UseQueryOptions<userInfo>>,
) => {
  const { setUser } = useAuthStore()

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: async () => {
      const data = await getUserInfo()
      setUser({
        id: data.id,
        email: data.email,
        nickName: data.nickName,
        alarm: data.alarm,
      })
      return data
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    ...options,
  })
}
// 닉네임 변경 patch
export const usePatchNickNameMutation = () => {
  const { setUser, user } = useAuthStore()

  return useMutation({
    mutationFn: patchUserNickName,
    onSuccess: (response, nickName) => {
      const updatedNickName = response.data?.nickName ?? nickName
      setUser({ nickName: updatedNickName })
    },
    onError: (error) => {
      console.error('닉네임 변경 실패:', error)
    },
  })
}

// 비밀번호 변경 patch
export const usePatchPasswordMutation = () => {
  return useMutation({
    mutationFn: patchUserPassword,
  })
}

// 탈퇴 delete
export const useDeleteUser = () => {
  const { logout } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (response) => {
      logout()
      router.push(PATH.main)
    },
  })
}

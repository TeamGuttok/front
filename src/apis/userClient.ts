'use client'

import { useMutation, UseQueryOptions } from '@tanstack/react-query'
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
import { toast } from '#hooks/useToast'
import { useIsLoggedInQuery } from '#hooks/useIsLoggedInQuery'
import { useUserId } from '#hooks/useUserId'

// 마이페이지 조회 get
export const useMyProfileQuery = (
  options?: Partial<UseQueryOptions<userInfo>>,
) => {
  const { setUser } = useAuthStore()
  const userId = useUserId()

  return useIsLoggedInQuery(
    ['myProfile', userId],
    async () => {
      const data = await getUserInfo()
      setUser({
        id: data.id,
        email: data.email,
        nickName: data.nickName,
        alarm: data.alarm,
      })
      return data
    },
    {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      ...options,
    },
  )
}

// 닉네임 변경 patch
export const usePatchNickNameMutation = () => {
  const { setUser } = useAuthStore()

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
    onSuccess: (_data, _variables, context) => {
      logout()
      router.push(PATH.main)

      if (context && typeof context === 'object') {
        const message = (context as any).successMessage
        if (message) {
          toast({ title: message })
        }
      }
    },
  })
}

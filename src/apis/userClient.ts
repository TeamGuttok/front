'use client'

import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'
import { toast } from '#hooks/useToast'
import { BASE_URL } from '#constants/url'

// // 마이페이지 조회 get
// export const useGetUserInfoClient = () => {
//   const { setUser } = useAuthStore()

//   const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
//     mutationFn: getUserInfo,
//     onSuccess: (data: userInfo) => {
//       setUser({
//         id: data.id,
//         email: data.email,
//         nickName: data.nickName,
//         alarm: data.alarm,
//       })
//     },
//   })

//   return {
//     getUserInfoClient: mutate,
//     data,
//     isLoading: isPending,
//     isSuccess,
//     isError,
//     error,
//   }
// }

// 닉네임 변경 PATCH
export function usePatchNicknameClient() {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: async ({ nickName }: { nickName: string }) => {
      const res = await fetch(`${BASE_URL}/api/users/nickname`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickName }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '닉네임 변경에 실패했습니다.')
      }

      return await res.json()
    },

    onSuccess: (response, variables) => {
      const updatedNickName = response?.data?.nickName ?? variables.nickName
      setUser({ nickName: updatedNickName })

      toast({
        description: '성공적으로 닉네임이 변경되었습니다.',
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error('닉네임 변경 실패:', error)
      toast({
        description: error.message || '닉네임 변경 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 비밀번호 변경 PATCH
export function usePatchPasswordClient() {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const res = await fetch(`${BASE_URL}/api/users/password`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '비밀번호 변경에 실패했습니다.')
      }

      return await res.json()
    },

    onSuccess: (_response, variables) => {
      setUser({ password: variables.password })

      toast({
        description: '성공적으로 비밀번호가 변경되었습니다.',
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error('닉네임 변경 실패:', error)
      toast({
        description: error.message || '닉네임 변경 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 회원 탈퇴 DELETE
export function useDeleteUserClient() {
  const { logout, reset } = useAuthStore()
  const router = useRouter()

  return useMutation<void, Error, void>({
    mutationFn: async (): Promise<void> => {
      const res = await fetch(`${BASE_URL}/api/users`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '회원 탈퇴에 실패했습니다.')
      }

      await res.json()
    },

    onSuccess: () => {
      logout()
      reset()

      toast({
        description: '성공적으로 탈퇴 되었습니다.',
        variant: 'default',
      })
      router.push(PATH.main)
    },

    onError: (error) => {
      console.error('로그아웃 실패:', error)

      toast({
        description: error.message || '탈퇴 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

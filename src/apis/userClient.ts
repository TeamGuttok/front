'use client'

import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'
import { toast } from '#hooks/useToast'
import { BASE_URL } from '#constants/url'
import type { userInfo } from '#types/user'

// 마이페이지 조회 GET
export function useGetUserInfoClient() {
  const { setUser } = useAuthStore()

  const mutation = useMutation({
    mutationFn: async (): Promise<userInfo> => {
      const res = await fetch(`${BASE_URL}/api/users`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok && res.status === 401) {
        throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
      }

      if (!res.ok) {
        throw new Error('유저 정보 불러오기 실패')
      }

      const json = await res.json()
      return json.data as userInfo
    },
    onSuccess: (data) => {
      setUser({
        id: data.id,
        email: data.email,
        nickName: data.nickName,
        alarm: data.alarm,
      })
    },
    onError: (error) => {
      console.error('유저 정보 조회 실패:', error)
      toast({
        description: error.message || '유저 정보 조회 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })

  return {
    getUserInfoClient: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}

// 닉네임 변경 PATCH
export function usePatchNicknameClient() {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: async ({ nickName }: { nickName: string }) => {
      const res = await fetch(`${BASE_URL}/api/users/nickname`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ nickName }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '닉네임 변경에 실패했습니다.')
      }
      const json = await res.json()
      console.log('닉네임 변경 응답:', json)
      return { nickName }
    },

    onSuccess: (response) => {
      //const updatedNickName = response?.data?.nickName ?? variables.nickName
      setUser({ nickName: response.nickName })

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

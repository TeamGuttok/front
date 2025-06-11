'use client'

import { useAuthStore } from '#stores/auth/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from '#constants/url'
import type { userInfo, LoginInput, codeInfo } from '#types/user'
import { queryClient } from '#contexts/QueryProvider'
import { useRouter } from 'next/navigation'
import { toast } from '#hooks/useToast'
import { PATH } from '#app/routes'

// 회원가입 POST
export function useRegisterClient() {
  const { login, isLoggedIn } = useAuthStore()
  const router = useRouter()

  return useMutation<userInfo, Error, userInfo>({
    mutationFn: async ({ email, password, nickName, alarm, policyConsent }) => {
      const res = await fetch(`${BASE_URL}/api/users/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          nickName,
          alarm,
          policyConsent,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '회원가입에 실패했습니다.')
      }

      return await res.json()
    },
    onSuccess: (data) => {
      queryClient.clear()
      login({
        id: data.id,
        email: data.email,
        nickName: data.nickName,
        alarm: data.alarm,
      })
      isLoggedIn

      toast({
        description: '성공적으로 회원가입 되었습니다.',
        variant: 'default',
      })

      router.push(PATH.main)
    },

    onError: (error) => {
      console.error('회원가입 실패', error)
      toast({
        description: error.message || '회원가입 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 로그인 POST
export function useLoginClient() {
  const { login } = useAuthStore()
  const router = useRouter()

  return useMutation<userInfo, Error, LoginInput>({
    mutationFn: async ({ email, password }) => {
      const res = await fetch(`${BASE_URL}/api/users/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '로그인 요청에 실패했습니다.')
      }

      return await res.json()
    },
    onSuccess: (data) => {
      queryClient.clear()
      login({
        id: data.id,
        email: data.email,
        nickName: data.nickName,
        alarm: data.alarm,
      })

      toast({
        description: '성공적으로 로그인 되었습니다.',
        variant: 'default',
      })

      router.push(PATH.main)
    },
    onError: (error) => {
      console.error('로그인 실패:', error)
      toast({
        description: error.message || '로그인 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 로그아웃 POST
// [ ] useHandleLogout 삭제
export function useLogoutClient() {
  const { logout: clearSession } = useAuthStore()
  const router = useRouter()

  return useMutation<void, Error, void>({
    mutationFn: async (): Promise<void> => {
      const res = await fetch(`${BASE_URL}/api/users/signout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '로그아웃에 실패했습니다.')
      }

      await res.json()
    },

    onSuccess: () => {
      clearSession()
      queryClient.clear()

      toast({
        description: '성공적으로 로그아웃 되었습니다.',
        variant: 'default',
      })
      router.push(PATH.main)
    },

    onError: (error) => {
      console.error('로그아웃 실패:', error)

      toast({
        description: error.message || '로그아웃 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 인증번호 발송 POST
export function useSendCodeClient() {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(`${BASE_URL}/api/mail/certification`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(
          errorData.message || '인증번호 메일 발송에 실패했습니다.',
        )
      }
      return res.json()
    },

    onSuccess: () => {
      toast({
        description: '인증번호 메일이 발송되었습니다.',
        variant: 'default',
      })
    },
    onError: (error) => {
      console.error('인증번호 메일 발송 실패:', error)
      toast({
        description:
          error.message || '인증번호 메일 발송 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 회원가입 인증번호 검증 POST
export function useVerifyOTPClient() {
  const { isEmailVerified } = useAuthStore()

  return useMutation<userInfo, Error, codeInfo>({
    mutationFn: async ({ email, certificationNumber }) => {
      const res = await fetch(`${BASE_URL}/api/users/email-verification`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, certificationNumber }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '회원가입에 실패했습니다.')
      }

      return await res.json()
    },
    onSuccess: () => {
      isEmailVerified

      toast({
        description: '회원가입의 이메일 인증이 완료되었습니다.',
        variant: 'default',
      })
    },

    onError: (error) => {
      console.error('회원가입 인증번호 검증 실패:', error)

      toast({
        description:
          error.message || '회원가입 인증번호 검증 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 비밀번호 찾기 인증번호 검증 POST
export function usePasswordOTPClient() {
  return useMutation<userInfo, Error, codeInfo>({
    mutationFn: async ({ email, certificationNumber }) => {
      const res = await fetch(`${BASE_URL}/api/users/certification-number`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, certificationNumber }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '인증번호 검증에 실패했습니다.')
      }

      return await res.json()
    },

    onSuccess: () => {
      toast({
        description: '비밀번호 찾기를 위한 이메일 인증이 완료되었습니다.',
        variant: 'default',
      })
    },

    onError: (error) => {
      console.error('비밀번호 찾기를 위한 인증번호 검증 실패', error)

      toast({
        description:
          error.message ||
          '비밀번호 찾기를 위한 이메일 인증 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

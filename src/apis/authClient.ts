'use client'

import { useAuthStore } from '#stores/auth/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from '#constants/url'
import { verifyRegisterCode, verifyPasswordCode } from './authAPI'
import type { userInfo, LoginInput } from '#types/user'

// 회원가입 post
export const useRegister = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      nickName,
      alarm,
    }: {
      email: string
      password: string
      nickName: string
      alarm: boolean
    }) => {
      const res = await fetch(`${BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, nickName, alarm }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '회원가입에 실패했습니다.')
      }

      return await res.json()
    },
  })
}

// 로그인 post
export function useLoginClient() {
  const { login } = useAuthStore()
  return useMutation<userInfo, Error, LoginInput>({
    mutationFn: async ({ email, password }) => {
      const res = await fetch(`${BASE_URL}/api/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '로그인 요청 실패')
      }

      const data = await res.json()

      if (data.status !== 'OK') {
        throw new Error('로그인 실패. 다시 시도해주세요.')
      }

      return data.data as userInfo
    },
    onSuccess: (data) => {
      login({
        id: data.id,
        email: data.email,
        nickName: data.nickName,
        alarm: data.alarm,
      })
    },
  })
}

// 로그아웃 post
export const logout = async (): Promise<void> => {
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
    throw new Error(errorData.message || '로그아웃 실패')
  }
}

// 로그아웃 훅
export const useLogoutClient = () => {
  const { logout: clearSession } = useAuthStore()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession()
      useAuthStore.persist.clearStorage()
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error)
    },
  })
}

// 인증번호 발송 post
export const useSendCertificationCode = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(`${BASE_URL}/api/mail/certification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        throw new Error(`${res.status}` || '인증번호 요청 실패')
      }
      return res.json()
    },
  })
}

// 회원가입 인증번호 검증 post
export function useVerifyOTP() {
  return useMutation({
    mutationFn: ({
      email,
      certificationNumber,
    }: {
      email: string
      certificationNumber: string
    }) => verifyRegisterCode({ email, certificationNumber }),
  })
}

// 비밀번호 찾기 인증번호 검증 post
export function usePasswordOTP() {
  return useMutation({
    mutationFn: ({
      email,
      certificationNumber,
    }: {
      email: string
      certificationNumber: string
    }) => verifyPasswordCode({ email, certificationNumber }),
  })
}

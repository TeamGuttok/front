'use client'

import { useAuthStore } from '#stores/auth/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from '#constants/url'
import {
  sendCertificationCode,
  register,
  verifyCertificationCode,
} from './authAPI'
import type { userInfo, LoginInput } from '#types/user'

//회원가입 post
export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('회원가입 성공:', data)
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error('회원가입 실패:', error.message)
      }
    },
  })
}

// 로그인 post
export function useLoginClient() {
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
      console.log('로그아웃 성공')
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error)
    },
  })
}

// 인증번호 발송 post
export const useSendCertificationCode = () => {
  return useMutation({
    mutationFn: (email: string) => sendCertificationCode(email),
    onSuccess: (res) => {
      console.log('발송 성공:', res.message)
    },
    onError: (err) => {
      console.error('발송 실패:', err)
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
    }) => verifyCertificationCode({ email, certificationNumber }),
    onSuccess: (data) => {
      console.log('OTP 인증 성공', data)
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error('OTP 인증 실패', error.message)
      }
    },
  })
}

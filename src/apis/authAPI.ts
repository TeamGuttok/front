// 회원가입 / 로그인 / 로그아웃 / 회원가입 이메일 인증번호 발송 / 회원가입 이메일 인증번호 검증 / 비밀번호 찾기 인증번호 검증
'use server'

import { BASE_URL } from '#constants/url'
import type { userInfo } from '#types/user'
import { cookies } from 'next/headers'

// 로그인 post
export async function Login({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<userInfo> {
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
}

// 회원가입 인증번호 검증 post
export async function verifyOTP({
  email,
  certificationNumber,
}: {
  email: string
  certificationNumber: string
}) {
  const res = await fetch(`${BASE_URL}/api/users/email-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email,
      certificationNumber,
    }),
  })

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  return res.json()
}

// 비밀번호 찾기 인증번호 검증 post
export async function verifyPasswordOTP({
  email,
  certificationNumber,
}: {
  email: string
  certificationNumber: string
}) {
  const res = await fetch(`${BASE_URL}/api/users/certification-number`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, certificationNumber }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || '비밀번호 찾기 인증 실패')
  }

  return res.json()
}

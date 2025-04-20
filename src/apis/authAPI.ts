// 로그인 / 로그아웃 / 회원가입 이메일 인증번호 발송 / 회원가입 이메일 인증번호 검증 / 비밀번호 찾기 인증번호 검증 / 세션 체크

'use server'

import { BASE_URL } from '#constants/url'
import type { userInfo } from '#types/subscription'

// 로그인 post
export async function useLogin({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<userInfo> {
  const response = await fetch(`${BASE_URL}/api/users/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '로그인 요청 실패')
  }

  const data = await response.json()

  if (data.status !== 'OK') {
    throw new Error('로그인 실패. 다시 시도해주세요.')
  }

  return data.data as userInfo
}

// 로그인 / 로그아웃 / 회원가입 이메일 인증번호 발송 / 회원가입 이메일 인증번호 검증 / 비밀번호 찾기 인증번호 검증 / 세션 체크

'use server'

import { redirect } from 'next/navigation'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { BASE_URL } from '#constants/url'
import type { userInfo } from '#types/subscription'

interface State {
  error?: Record<string, string[]>
  formData?: FormData
}

// 로그인 post
export async function loginUser({
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

// 로그아웃
export async function logout(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const storeUser = useAuthStore.getState().user
  const email = (storeUser && storeUser.email) || formData.get('email')
  const nickName = (storeUser && storeUser.nickName) || ''

  console.log('logoutAction 입력값:', { email, nickName })

  try {
    const response = await fetch(`${BASE_URL}/api/users/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({ email, nickName }),
    })
    redirect('/')
  } catch (error: unknown) {
    return {
      error: {
        general: [
          error instanceof Error ? error.message : '로그아웃에 실패했습니다.',
        ],
      },
      formData,
    }
  }
}

// 세션 체크
export async function checkSession() {
  const response = await fetch(`${BASE_URL}/api/users/check-session`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('세션 확인 실패')
  }

  return response.json()
}

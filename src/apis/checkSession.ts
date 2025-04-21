'use server'

import { BASE_URL } from '#constants/url'
import { cookies } from 'next/headers'

export interface SessionResponse {
  message: string
  data: Record<string, any>
  status: string
}

export const checkSession = async (): Promise<SessionResponse> => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('SESSION')

  const res = await fetch(`${BASE_URL}/api/users/check-session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: sessionCookie ? `SESSION=${sessionCookie.value}` : '',
    },
    credentials: 'include',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('세션 확인 실패')
  }

  const result = await res.json()

  if (result.status !== '100 CONTINUE') {
    throw new Error(result.message || '세션이 유효하지 않습니다.')
  }

  return result as SessionResponse
}

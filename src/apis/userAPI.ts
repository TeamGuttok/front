'use server'

// 마이페이지 조회

import { BASE_URL } from '#constants/url'
import type { userInfo } from '#types/user'
import { cookies } from 'next/headers'

// 마이페이지 조회 get
export const getUserInfo = async (): Promise<userInfo> => {
  const session = (await cookies()).get('SESSION')

  if (!session) throw new Error('세션 없음')
  console.log('fetching user info from', `${BASE_URL}/api/users`)

  const res = await fetch(`${BASE_URL}/api/users`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie: `SESSION=${session.value}`,
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
}

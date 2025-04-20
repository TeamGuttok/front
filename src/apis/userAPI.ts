// 회원가입 / 비밀번호 변경 / 닉네일 변경 / 알림 상태 변경 / 마이페이지 조회 / 회원 탈퇴

import { BASE_URL } from '#constants/url'
import type { userInfo } from '#types/subscription'

// 회원가입 post
export async function register({
  email,
  password,
  nickName,
  alarm = true,
}: Omit<userInfo, 'nickName'> & { password: string; nickName: string }) {
  const response = await fetch(`${BASE_URL}/api/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password, nickName, alarm }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '회원가입 요청 실패')
  }

  const data = await response.json()

  if (data.status !== '100 CONTINUE') {
    throw new Error('회원가입 실패. 다시 시도해주세요.')
  }

  return data
}

// 마이페이지 조회 get
export const getUserInfo = async (): Promise<userInfo> => {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('유저 정보 불러오기 실패')
  }

  const json = await res.json()
  return json.data as userInfo
}

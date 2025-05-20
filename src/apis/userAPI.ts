// 회원가입 / 비밀번호 변경 / 닉네일 변경 / 알림 상태 변경 / 마이페이지 조회 / 회원 탈퇴

import { BASE_URL } from '#constants/url'
import type { userInfo } from '#types/user'

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

// 닉네임 변경 patch
export const patchUserNickName = async (nickName: string) => {
  const response = await fetch(`${BASE_URL}/api/users/nickname`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickName }),
  })

  const data = await response.json()

  if (!response.ok || data.status !== '100 CONTINUE') {
    throw new Error(data.message || '닉네임 변경 실패')
  }

  return data
}

// 비밀번호 변경 patch
export const patchUserPassword = async (
  password: string,
): Promise<{
  message: string
  data: null
  status: string
}> => {
  const response = await fetch(`${BASE_URL}/api/users/password`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })

  const data = await response.json()

  if (!response.ok || data.status !== '100 CONTINUE') {
    throw new Error(data.message || '비밀번호 변경 실패')
  }

  return data
}

// 탈퇴 delete
export const deleteUser = async (): Promise<{
  message: string
  data: null
  status: string
}> => {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'DELETE',
    headers: { Accept: '*/*' },
    credentials: 'include',
  })

  if (!response.ok) {
    let errorData: { message?: string } = {}
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: '응답 본문 없음 (500 오류)' }
    }
    console.error('회원 탈퇴 실패 응답:', errorData)
    throw new Error(errorData.message || '회원 탈퇴 실패')
  }

  return response.json()
}

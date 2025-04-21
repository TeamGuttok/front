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

// 닉네임 변경 patch
export const patchUserNickName = async (nickName: string) => {
  const response = await fetch(`${BASE_URL}/api/users/nickname`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ nickName }),
  })

  const data = await response.json()

  if (!response.ok || data.status !== '100 CONTINUE') {
    throw new Error(data.message || '닉네임 변경 실패')
  }

  return data
}

// 비밀번호 변경 patch

export const patchUserPassword = async (password: string): Promise<{
  message: string
  data: null
  status: string
}> => {
  const response = await fetch(`${BASE_URL}/api/users/password`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password }),
  })

  const data = await response.json()

  if (!response.ok || data.status !== '100 CONTINUE') {
    throw new Error(data.message || '비밀번호 변경 실패')
  }

  return data
}

// 탈퇴 API
// const { mutate: deleteAccount, isPending: isDeletingAccount } = useMutation({
//   mutationFn: async () => {
//     const response = await fetch(`${BASE_URL}/api/users`, {
//       method: 'DELETE',
//       credentials: 'include',
//       headers: { Accept: '*/*' },
//     })

//     if (!response.ok) {
//       throw new Error('회원 탈퇴 실패')
//     }

//     const data = await response.json()
//     if (data.status !== '100 CONTINUE') {
//       throw new Error('회원 탈퇴 중 오류가 발생했습니다.')
//     }

//     return data
//   },
//   onSuccess: () => {
//     logout()
//     setShowDeleteDialog(false)
//   },
//   onError: (error) => {
//     console.error('회원 탈퇴 실패:', error)
//   },
// })

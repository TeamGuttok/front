'use server'

import { cookies } from 'next/headers'
import { BASE_URL } from '#constants/url'

// 닉네임 변경 PATCH
export async function patchNickname(formData: FormData) {
  const nickname = formData.get('nickname') as string
  const cookieHeader = cookies().toString()

  const res = await fetch(`$${BASE_URL}/api/users/nickname`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ nickname }),
  })

  if (!res.ok) throw new Error('닉네임 변경 실패')
}

// 비밀번호 변경 PATCH
export async function patchPassword(formData: FormData) {
  const password = formData.get('password') as string
  const cookieHeader = cookies().toString()

  const res = await fetch(`${BASE_URL}/api/users/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ password }),
  })

  if (!res.ok) throw new Error('닉네임 변경 실패')
}

// 탈퇴 DELETE
export async function deleteUser(formData: FormData) {
  const cookieHeader = cookies().toString()
  const reason = formData.get('reason')

  const res = await fetch(`${BASE_URL}/api/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ reason }),
  })

  if (!res.ok) {
    const { message } = await res
      .json()
      .catch(() => ({ message: '회원 탈퇴 실패' }))
    throw new Error(message)
  }

  return { success: true }
}

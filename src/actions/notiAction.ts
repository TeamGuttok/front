'use server'

import { cookies } from 'next/headers'
import { BASE_URL } from '#constants/url'

// 알림 수신 여부 변경 PATCH
export async function patchAlarm() {
  const cookieHeader = cookies().toString()

  const res = await fetch(`${BASE_URL}/api/users/alarm`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || '알림 수신 여부 변경 실패')
  }

  return await res.json()
}

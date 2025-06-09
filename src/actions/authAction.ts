'use server'

import { cookies } from 'next/headers'
import { BASE_URL } from '#constants/url'

// 로그인 POST
export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const cookieHeader = cookies().toString()

  const res = await fetch(`${BASE_URL}/api/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || '로그인에 실패했습니다.')
  }

  return await res.json()
}

// 로그아웃 POST
export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('SESSION')
  const cookieHeader = cookies().toString()
  console.log(BASE_URL)

  const res = await fetch(`${BASE_URL}/api/users/signout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    credentials: 'include',
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || '로그아웃 실패')
  }
}

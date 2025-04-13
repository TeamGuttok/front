'use client'

import { BASE_URL } from '#constants/url'
import { useAuthStore } from '#stores/auth/useAuthStore'

export async function logoutClient() {
  const { user, logout } = useAuthStore.getState()

  try {
    const response = await fetch(`${BASE_URL}/api/users/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({
        email: user?.email,
        nickName: user?.nickName,
      }),
    })

    if (!response.ok) {
      throw new Error('로그아웃 실패')
    }

    logout() // 상태 초기화
    window.location.href = '/'
  } catch (error) {
    console.error('클라이언트 로그아웃 실패:', error)
  }
}

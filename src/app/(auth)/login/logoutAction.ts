'use server'

import { redirect } from 'next/navigation'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { BASE_URL } from '#constants/url'

interface State {
  error?: Record<string, string[]>
  formData?: FormData
}

export async function logoutAction(
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

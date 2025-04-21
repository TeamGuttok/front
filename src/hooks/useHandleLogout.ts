'use client'

import { useLogoutClient } from '#apis/authClient'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '#stores/auth/useAuthStore'

export const useHandleLogout = () => {
  const { mutate: requestLogout } = useLogoutClient()
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    requestLogout(undefined, {
      onSuccess: () => {
        logout()
        router.push('/')
      },
      onError: (error) => {
        console.error('로그아웃 실패:', error)
      },
    })
  }

  return handleLogout
}

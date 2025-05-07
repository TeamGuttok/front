'use client'

import { useLogoutClient } from '#apis/authClient'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { PATH } from '#app/routes'
import { toast } from '#hooks/useToast'

export const useHandleLogout = () => {
  const { mutate: requestLogout } = useLogoutClient()
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    requestLogout(undefined, {
      onSuccess: () => {
        logout()
        toast({
          description: '성공적으로 로그아웃되었습니다.',
          variant: 'default',
        })
        router.push(PATH.main)
      },
      onError: (error) => {
        console.error('로그아웃 실패:', error)
        toast({
          description: '로그아웃 중 오류가 발생했습니다.',
          variant: 'destructive',
        })
      },
    })
  }

  return handleLogout
}

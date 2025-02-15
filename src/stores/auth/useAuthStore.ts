import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface User {
  email: string
  nickName: string
  session: string
}

interface AuthState {
  isLoggedIn: boolean | null
  checkSession: () => void
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((set) => ({
    isLoggedIn: null,
    user: null,

    // 회원가입 or 로그인 후 유저 정보 저장
    setUser: (user) => set({ user, isLoggedIn: true }),

    // 로그아웃 기능
    logout: () => {
      document.cookie =
        'sessionToken=; expires=Thu, 01 Jan 2026 00:00:00 UTC; path=/;'
      set({ user: null, isLoggedIn: false })
    },

    // 세션 쿠키 확인 후 로그인 상태 결정
    checkSession: () => {
      const cookies = document.cookie.split('; ').reduce(
        (acc, cookie) => {
          const [name, value] = cookie.split('=')
          acc[name] = value
          return acc
        },
        {} as Record<string, string>,
      )

      const hasSession = !!cookies['sessionToken']

      set({ isLoggedIn: hasSession })

      // 세션이 있으면 서버에서 유저 정보 가져오기 (선택사항)
      if (hasSession) {
        fetch('/api/users/me')
          .then((res) => res.json())
          .then((data) => set({ user: data }))
          .catch(() => set({ isLoggedIn: false, user: null }))
      }
    },
  })),
)

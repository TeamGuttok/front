import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface User {
  email: string
  nickName: string
}

interface AuthState {
  isLoggedIn: boolean | null
  user: User | null
  setUser: (user: Partial<User>) => void
  logout: () => void
  checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((set) => ({
    isLoggedIn: null,
    user: { email: '', nickName: '' },
    setUser: (user) =>
      set((state) => ({
        user: {
          email: user.email ?? state.user?.email ?? '',
          nickName: user.nickName ?? state.user?.nickName ?? '',
        },
        isLoggedIn: true,
      })),
    logout: () => set({ user: { email: '', nickName: '' }, isLoggedIn: false }),

    checkSession: async () => {
      try {
        const response = await fetch('/api/users/check-session', {
          method: 'GET',
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('세션 확인 실패')
        }

        const data = await response.json()
        if (data.status === '100 CONTINUE' && data.data) {
          set({ user: data.data, isLoggedIn: true })
        } else {
          set({ user: null, isLoggedIn: false })
        }
      } catch (error) {
        console.error('세션 확인 중 오류:', error)
        set({ isLoggedIn: false, user: null })
      }
    },
  })),
)

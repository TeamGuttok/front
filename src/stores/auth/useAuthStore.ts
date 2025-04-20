import { create } from 'zustand'
import {
  subscribeWithSelector,
  persist,
  createJSONStorage,
} from 'zustand/middleware'
import type { userInfo } from '#types/subscription'

interface AuthState {
  isLoggedIn: boolean
  isEmailVerified: boolean
  user: userInfo | null
  logout: () => void
  setUser: (user: Partial<userInfo>) => void
  verifyEmail: () => void
  login: (user: Partial<userInfo>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    subscribeWithSelector((set) => ({
      isLoggedIn: false,
      verifyEmail: () => set({ isEmailVerified: true }),
      isEmailVerified: false,
      resetEmailVerification: () => set({ isEmailVerified: false }),
      user: { email: '', nickName: '', alarm: true },

      logout: () =>
        set({
          user: { email: '', nickName: '', alarm: true },
          isLoggedIn: false,
          isEmailVerified: false,
        }),
      setUser: (user: Partial<userInfo>) =>
        set((state) => ({
          user: {
            email: user.email ?? state.user?.email ?? '',
            nickName: user.nickName ?? state.user?.nickName ?? '',
            alarm: user.alarm ?? state.user?.alarm ?? true,
          },
        })),

      login: (user: Partial<userInfo>) =>
        set(() => ({
          user: {
            email: user.email ?? '',
            nickName: user.nickName ?? '',
            alarm: user.alarm ?? true,
          },
          isLoggedIn: true,
        })),
    })),
    {
      name: 'auth-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isEmailVerified: state.isEmailVerified,
      }),
    },
  ),
)

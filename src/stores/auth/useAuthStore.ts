import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { userInfo } from '#types/user'
import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'

interface AuthState {
  isLoggedIn: boolean
  isEmailVerified: boolean
  user: userInfo | null
  login: (user: Partial<userInfo>) => void
  logout: () => void
  reset: () => void // 세션 만료
  setUser: (user: Partial<userInfo>) => void
  verifyEmail: () => void
  resetEmailVerification: () => void
}

const buildUserState = (user?: Partial<userInfo>): userInfo => ({
  id: user?.id ?? 0,
  email: user?.email ?? '',
  nickName: user?.nickName ?? '',
  alarm: user?.alarm ?? true,
})

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((set) => ({
    user: buildUserState(),
    isLoggedIn: false,
    isEmailVerified: false,
    resetEmailVerification: () => set({ isEmailVerified: false }),
    verifyEmail: () => set({ isEmailVerified: true }),
    login: (user) => {
      set({
        user: buildUserState(user),
        isLoggedIn: true,
      })
    },

    logout: () => {
      useAuthStore.getState().reset()
      useSubscriptionStore.getState().resetSubscriptionData()
    },

    setUser: (user) =>
      set((state) => ({
        user: {
          id: user.id ?? state.user?.id ?? 0,
          email: user.email ?? state.user?.email ?? '',
          nickName: user.nickName ?? state.user?.nickName ?? '',
          alarm: user.alarm ?? state.user?.alarm ?? true,
        },
      })),

    reset: () => {
      useSubscriptionStore.getState().resetSubscriptionData()
      set({
        user: buildUserState(),
        isLoggedIn: false,
      })
    },
  })),
)

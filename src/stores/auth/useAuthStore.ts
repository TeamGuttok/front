import { create } from 'zustand'
import {
  subscribeWithSelector,
  persist,
  createJSONStorage,
} from 'zustand/middleware'
import type { userInfo } from '#types/user'

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
  email: user?.email ?? '',
  nickName: user?.nickName ?? '',
  alarm: user?.alarm ?? true,
})

export const useAuthStore = create<AuthState>()(
  persist(
    subscribeWithSelector((set) => ({
      user: buildUserState(),
      isLoggedIn: false,
      isEmailVerified: false,
      resetEmailVerification: () => set({ isEmailVerified: false }),
      verifyEmail: () => set({ isEmailVerified: true }),

      login: (user) =>
        set({
          user: buildUserState(user),
          isLoggedIn: true,
        }),

      logout: () => {
        useAuthStore.getState().reset()
        useAuthStore.persist.clearStorage()
      },

      setUser: (user) =>
        set((state) => ({
          user: {
            email: user.email ?? state.user?.email ?? '',
            nickName: user.nickName ?? state.user?.nickName ?? '',
            alarm: user.alarm ?? state.user?.alarm ?? true,
          },
        })),

      reset: () => {
        set({
          user: buildUserState(),
          isLoggedIn: false,
          isEmailVerified: false,
        })
      },
    })),
    {
      name: 'client-auth-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
)

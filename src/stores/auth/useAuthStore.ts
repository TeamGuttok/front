import { create } from 'zustand'
import {
  subscribeWithSelector,
  persist,
  createJSONStorage,
} from 'zustand/middleware'
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
  persist(
    subscribeWithSelector((set) => ({
      user: buildUserState(),
      isLoggedIn: false,
      isEmailVerified: false,
      resetEmailVerification: () => set({ isEmailVerified: false }),
      verifyEmail: () => set({ isEmailVerified: true }),
      login: (user) => {
        const userId = String(user.id)
        useSubscriptionStore.getState().getSubscriptionDataForUser(userId)

        // useSubscriptionStore.getState().resetSubscriptionData()
        set({
          user: buildUserState(user),
          isLoggedIn: true,
        })
      },

      logout: () => {
        const userId = String(useAuthStore.getState().user?.id ?? '')
        useSubscriptionStore.getState().saveSubscriptionDataForUser(userId)
        useAuthStore.getState().reset()
        useAuthStore.persist.clearStorage()
        useSubscriptionStore.getState().resetSubscriptionData()

        // import('#stores/subscriptions/useSubscriptionStore').then(
        //   ({ useSubscriptionStore }) => {
        //     useSubscriptionStore.getState().resetSubscriptionData()
        //   },
        // )
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

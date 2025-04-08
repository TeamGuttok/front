import { create } from 'zustand'
import {
  subscribeWithSelector,
  persist,
  createJSONStorage,
} from 'zustand/middleware'

interface User {
  email: string
  nickName: string
  alarm: boolean
}

interface AuthState {
  isLoggedIn: boolean
  isEmailVerified: boolean
  user: User | null
  logout: () => void
  setUser: (user: Partial<User>) => void
  verifyEmail: () => void
  login: (user: Partial<User>) => void
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
          isEmailVerified: true,
        }),
      setUser: (user: Partial<User>) =>
        set((state) => ({
          user: {
            email: user.email ?? state.user?.email ?? '',
            nickName: user.nickName ?? state.user?.nickName ?? '',
            alarm: user.alarm ?? state.user?.alarm ?? true,
          },
        })),
      
      login: (user: Partial<User>) =>
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

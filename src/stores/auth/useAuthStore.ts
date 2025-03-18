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
  user: User | null
  logout: () => void
  //setUser: (user: Partial<User> | ((user: User) => Partial<User>)) => void
  setUser: (user: Partial<User>) => void
  verifyEmail: () => void
  isEmailVerified: boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    subscribeWithSelector((set) => ({
      // isLoggedIn: false
      isLoggedIn: true, 
      isEmailVerified: false,
      verifyEmail: () => set({ isEmailVerified: true }),
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

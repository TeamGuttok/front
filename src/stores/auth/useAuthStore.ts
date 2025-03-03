import { create } from 'zustand'
import { subscribeWithSelector, persist, createJSONStorage } from 'zustand/middleware'

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
}

export const useAuthStore = create<AuthState>()(
  persist(
    subscribeWithSelector((set) => ({
      isLoggedIn: false,
      user: { email: '', nickName: '', alarm: true },
      logout: () =>
        set({ user: { email: '', nickName: '', alarm: true }, isLoggedIn: false }),
      setUser: (user: Partial<User>) =>
        set((state) => {
          const newUser: User = {
            email: user.email ?? state.user?.email ?? '',
            nickName: user.nickName ?? state.user?.nickName ?? '',
            alarm: user.alarm ?? state.user?.alarm ?? true,
          }
          return {
            user: newUser,
            isLoggedIn: Boolean(newUser.email && newUser.nickName),
          }
        }),
    })),
    {
      name: 'auth-session', // sessionStorage에 저장될 key 이름
      storage: createJSONStorage(() => sessionStorage), // 세션스토리지를 사용
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

//   subscribeWithSelector((set) => ({
//     isLoggedIn: false,
//     user: { email: '', nickName: '', session: '', alarm: true },

//     logout: () =>
//       set({ user: { email: '', nickName: '', alarm: true }, isLoggedIn: false }),

//     setUser: (user: Partial<User>) =>
//   set((state) => {
//     const newUser: User = {
//       email: user.email ?? state.user?.email ?? '',
//       nickName: user.nickName ?? state.user?.nickName ?? '',
//       alarm: user.alarm ?? state.user?.alarm ?? true,
//     }
//     return {
//       user: newUser,
//       isLoggedIn: Boolean(newUser.email && newUser.nickName),
//     }
//   }),
//   }))
// );


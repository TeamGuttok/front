import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface AuthState {
  isLoggedIn: boolean | null
  checkSession: () => void
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((set) => ({
    isLoggedIn: null,
    checkSession: () => {
      const cookies = document.cookie.split('; ').reduce(
        (acc, cookie) => {
          const [name, value] = cookie.split('=')
          acc[name] = value
          return acc
        },
        {} as Record<string, string>,
      )

      set({ isLoggedIn: !!cookies['sessionToken'] })
    },
  })),
)

import { useAuthStore } from '#stores/auth/useAuthStore'

export const useUserId = () => {
  return useAuthStore((state) => state.user?.id)
}

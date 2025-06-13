import { useAuthStore } from '#stores/auth/useAuthStore'

export function getGreeting() {
  const nickName = useAuthStore((state) => state.user?.nickName)
  const hour = new Date().getHours()

  const base =
    hour >= 5 && hour < 12
      ? '좋은 아침입니다,'
      : hour >= 12 && hour < 18
        ? '좋은 점심입니다,'
        : '좋은 저녁입니다,'

  return `${base} ${nickName || '회원'}님`
}

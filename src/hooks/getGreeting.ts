export function getGreeting(nickName: string | undefined, isLoading: boolean) {
  const hour = new Date().getHours()

  const base =
    hour >= 5 && hour < 12
      ? '좋은 아침입니다,'
      : hour >= 12 && hour < 18
        ? '좋은 점심입니다,'
        : '좋은 저녁입니다,'

  const nameText = isLoading ? '...' : `${nickName}님.`

  return `${base} ${nameText}`
}

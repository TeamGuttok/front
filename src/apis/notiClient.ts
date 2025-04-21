// 알림 상태 (사용/미사용) 변경, 알림 리스트 조회, 알림 읽음 처리, 알림 삭제,

'use client'

import { useMutation } from '@tanstack/react-query'
import { patchUserAlarm } from './notiAPI'
import { useAuthStore } from '#stores/auth/useAuthStore'

export const useToggleAlarmMutation = () => {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: patchUserAlarm,
    onSuccess: (response) => {
      console.log('성공:', response)
      console.log('🔍 response.data:', response.data)
      const updatedAlarm = response.data.alarm

      const alarm = response?.data?.alarm

      if (
        !response ||
        !response.data ||
        typeof response.data.alarm !== 'boolean'
      ) {
        console.warn('응답에 alarm 값이 없거나 잘못됨:', response)
        return
      }

      setUser({ alarm: updatedAlarm })
    },
    onError: async (error) => {
      console.error('알림 설정 변경 실패:', error)

      if (error instanceof Error) {
        console.log('error.message:', error.message)
      }

      if ('response' in error) {
        try {
          const res = await (error as any).response.json()
          console.log('서버 에러 응답 본문:', res)
        } catch {
          console.warn('응답 바디를 JSON으로 파싱할 수 없음')
        }
      }

      console.log('전체 에러 객체:', JSON.stringify(error, null, 2))
    },
  })
}

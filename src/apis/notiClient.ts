// 알림 상태 (사용/미사용) 변경, 알림 리스트 조회, 알림 읽음 처리, 알림 삭제,

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  patchUserAlarm,
  fetchNotifications,
  markNotificationsAsRead,
  deleteNotifications,
} from './notiAPI'
import { useAuthStore } from '#stores/auth/useAuthStore'
import type { PageRequest } from '#types/notification'

// 알림 상태 변경 patch
export const useToggleAlarmMutation = () => {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: patchUserAlarm,
    onSuccess: (response) => {
      console.log('성공:', response)
      console.log('response.data:', response.data)
      const updatedAlarm = response.data.alarm

      if (
        // !response ||
        // !response.data ||
        typeof response.data.alarm !== 'boolean'
      ) {
        console.warn('응답에 alarm 값이 없거나 잘못됨:', response)
        return
      }

      setUser({ alarm: updatedAlarm })
      const user = useAuthStore.getState().user
      console.log(user)
    },
    onError: async (error) => {
      console.error('알림 설정 변경 실패:', error)
      const user = useAuthStore.getState().user
      console.log(user)

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

// 알림 리스트 조회 get
export const useNotifications = (pageRequest: PageRequest) => {
  return useQuery({
    queryKey: [
      'notifications',
      'reminders',
      pageRequest.lastId,
      pageRequest.size,
    ],
    queryFn: async () => {
      const allNotifications = await fetchNotifications(pageRequest)
      const filteredContents = allNotifications.contents.filter(
        (noti) => noti.category === 'REMINDER',
      )
      console.log(allNotifications)
      return {
        ...allNotifications,
        contents: filteredContents,
        size: filteredContents.length,
        hasNext: false,
      }
    },
    staleTime: 1000 * 60 * 3,
    placeholderData: undefined,
    retry: 1,
  })
}

// 알림 읽음 처리 put
export const useMarkAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: (_data, ids) => {
      console.log(ids)
      queryClient.setQueryData(
        ['notifications', 'reminders', 10000, 10000],
        (oldData: any) => {
          if (!oldData) return oldData

          const updated = oldData.contents.map((noti: any) =>
            ids.includes(noti.id) ? { ...noti, status: 'READ' } : noti,
          )

          return { ...oldData, contents: updated }
        },
      )
    },
  })
}

// 알림 삭제 delete
export const useDeleteNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

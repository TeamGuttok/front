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
  const { user, setUser } = useAuthStore()

  return useMutation({
    mutationFn: patchUserAlarm,
    onSuccess: (response) => {
      const updatedAlarm = response.data.alarm
      const { user } = useAuthStore.getState()

      if (!user) return

      setUser({ alarm: updatedAlarm })

      useAuthStore.getState().setUser({
        email: user.email,
        nickName: user.nickName,
        alarm: !user.alarm, // toggle
      })
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

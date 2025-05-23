// 알림 상태 (사용/미사용) 변경, 알림 리스트 조회, 알림 읽음 처리, 알림 삭제,

'use client'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { patchAlarm, getNotis, putNotis, deleteNotis } from '#apis/notiAPI'
import { useAuthStore } from '#stores/auth/useAuthStore'
import type { PageRequest } from '#types/notification'
import { useIsLoggedInQuery } from '#hooks/useIsLoggedInQuery'
import { useUserId } from '#hooks/useUserId'
import { FETCH_ALL } from '#constants/pagination'

// 알림 상태 변경 patch
export const usepatchAlarmClient = () => {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: patchAlarm,
    onSuccess: (response) => {
      const updatedAlarm = response.data.alarm
      const { user } = useAuthStore.getState()

      if (!user) return

      setUser({ alarm: updatedAlarm })

      useAuthStore.getState().setUser({
        email: user.email,
        nickName: user.nickName,
        alarm: !user.alarm,
      })
    },
  })
}

// 알림 조회 get
export const useNotisClient = (pageRequest: PageRequest) => {
  console.log('queryKey', [
    'notifications',
    'reminders',
    pageRequest.lastId,
    pageRequest.size,
  ])
  return useQuery({
    queryKey: ['notifications', pageRequest],
    queryFn: () => getNotis(pageRequest),
    staleTime: Infinity,
  })
}

// 알림 리스트 조회 get
export const useNotifications = (pageRequest: PageRequest = FETCH_ALL) => {
  const userId = useUserId()

  return useIsLoggedInQuery(
    ['notifications', userId, pageRequest.lastId, pageRequest.size],
    async () => {
      const allNotifications = await getNotis(pageRequest)
      const filteredContents = allNotifications.contents

      return {
        ...allNotifications,
        contents: filteredContents,
        size: filteredContents.length,
        hasNext: false,
      }
    },
  )
}

// 알림 읽음 처리 put
export const usePutNotisClient = () => {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation({
    mutationFn: putNotis,
    onSuccess: (_data, ids) => {
      queryClient.setQueryData(
        ['notifications', userId, FETCH_ALL.lastId, FETCH_ALL.size],
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
export const useDeleteNotis = () => {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation({
    mutationFn: deleteNotis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] })
    },
  })
}

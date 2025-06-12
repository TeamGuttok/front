// 알림 상태 (사용/미사용) 변경, 알림 리스트 조회, 알림 읽음 처리, 알림 삭제,

'use client'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { getNotis, putNotis, deleteNotis } from '#apis/notiAPI'
import { useAuthStore } from '#stores/auth/useAuthStore'
import type { PageRequest } from '#types/notification'
import { useIsLoggedInQuery } from '#hooks/useIsLoggedInQuery'
import { useUserId } from '#hooks/useUserId'
import { FETCH_ALL } from '#constants/pagination'
import { BASE_URL } from '#constants/url'
import { toast } from '#hooks/useToast'

// 알림 상태 변경 PATCH
export const usePatchAlarmClient = () => {
  const { setUser } = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/api/users/alarm`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '알림 설정 변경을을 실패했습니다.')
      }
      const json = await res.json()
      console.log('서버 응답:', json)
      return json
    },

    onSuccess: () => {
      setUser((prev) => {
        const nextAlarm = !prev.alarm
        toast({
          description: nextAlarm
            ? '이메일 알림 수신을 받습니다.'
            : '이메일 알림 수신을 받지 않습니다',
          variant: 'default',
        })
        return {
          ...prev,
          alarm: nextAlarm,
        }
      })
    },

    onError: (error) => {
      console.error('알림 설정 변경 실패', error)
      toast({
        description: error.message || '알림 설정 변경 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    },
  })
}

// 알림 조회 get
export const useNotisClient = (pageRequest: PageRequest) => {
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

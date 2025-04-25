// 알림 리스트 조회, 알림 읽음 처리, 알림 삭제

import { BASE_URL } from '#constants/url'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { PageRequest, NotificationResponse } from '#types/notification'
import { FETCH_ALL } from '#constants/pagination'

// 알림 목록 가져오기 get
export const fetchNotifications = async (
  pageRequest: PageRequest,
): Promise<NotificationResponse> => {
  const query = new URLSearchParams()

  if (pageRequest.lastId && pageRequest.lastId > 0) {
    query.set('lastId', String(pageRequest.lastId))
  }

  query.set('size', String(pageRequest.size))

  const res = await fetch(`${BASE_URL}/api/notifications?${query.toString()}`, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || '알림 목록 조회 실패')
  }

  return res.json()
}

export const useNotifications = (pageRequest: PageRequest) => {
  console.log('📦 queryKey', [
    'notifications',
    'reminders',
    pageRequest.lastId,
    pageRequest.size,
  ])
  return useQuery({
    queryKey: ['notifications', pageRequest],
    queryFn: () => fetchNotifications(pageRequest),
    staleTime: Infinity,
  })
}

// 알림 상태 (사용/미사용) 변경 patch

export const patchUserAlarm = async () => {
  const res = await fetch(`${BASE_URL}/api/users/alarm`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  const result = await res.json()

  console.log('PATCH 응답:', result)

  if (!res.ok) {
    throw new Error(result.message || '알림 설정 변경 실패')
  }

  return result
}

// 알림 읽음 처리 put
export const markNotificationsAsRead = async (ids: number[]) => {
  const res = await fetch(`${BASE_URL}/api/notifications`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ ids }),
  })

  if (!res.ok) throw new Error('알림 읽음 처리 실패')

  return res.json()
}

// 알림 삭제 delete
const deleteNotifications = async (ids: number[]) => {
  const res = await fetch('/api/notifications', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ ids }),
  })

  if (!res.ok) throw new Error('알림 삭제 실패')

  return res.json()
}

export const useDeleteNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

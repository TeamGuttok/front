// 알림 리스트 조회, 알림 읽음 처리, 알림 삭제

import { BASE_URL } from '#constants/url'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

type NotificationStatus = 'READ' | 'UNREAD'
type NotificationCategory = 'APPLICATION' | 'SYSTEM'

export interface Notification {
  id: number
  category: NotificationCategory
  message: string
  status: NotificationStatus
  registerDate: string
  updateDate: string
}

interface PageRequest {
  lastId: number
  size: number
}

interface NotificationResponse {
  contents: Notification[]
  size: number
  hasNext: boolean
  status: string
  message?: string
}

// 알림 목록 가져오기 get
export const fetchNotifications = async (
  pageRequest: PageRequest,
): Promise<NotificationResponse> => {
  const query = new URLSearchParams({
    'pageRequest.lastId': String(pageRequest.lastId),
    'pageRequest.size': String(pageRequest.size),
  })

  const res = await fetch(`${BASE_URL}/api/notifications?${query.toString()}`)

  if (!res.ok) {
    throw new Error('알림 목록 요청 실패')
  }

  return res.json()
}

export const useNotifications = (pageRequest: PageRequest) => {
  return useQuery({
    queryKey: ['notifications', pageRequest],
    queryFn: () => fetchNotifications(pageRequest),
    staleTime: Infinity,
  })
}

// 알림 상태 (사용/미사용) 변경 patch

export const patchUserAlarm = async () => {
  const response = await fetch(`${BASE_URL}/api/users/alarm`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({}),
  })

  const result = await response.json()

  console.log('📦 PATCH 응답:', result)

  if (!response.ok) {
    throw new Error(result.message || '알림 설정 변경 실패')
  }

  return result
}

// export const patchUserAlarm = async (): Promise<{
//   message: string
//   data: {
//     alarm: boolean
//   }
//   status: string
// }> => {
//   const response = await fetch(`${BASE_URL}/api/users/alarm`, {
//     method: 'PATCH',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//   })

//   if (!response.ok) {
//     throw new Error('알림 설정 변경 실패')
//   }

//   return response.json()
// }

// 알림 읽음 처리 put
const markNotificationsAsRead = async (ids: number[]) => {
  const res = await fetch('/api/notifications', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })

  if (!res.ok) throw new Error('알림 읽음 처리 실패')

  return res.json()
}

export const useMarkAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

// 삭제 delete
const deleteNotifications = async (ids: number[]) => {
  const res = await fetch('/api/notifications', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
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

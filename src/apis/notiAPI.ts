// 알림 리스트 조회, 알림 읽음 처리, 알림 삭제

import { BASE_URL } from '#constants/url'
import type { PageRequest, NotificationResponse } from '#types/notification'

// 알림 조회 get
export const getNotis = async (
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

// 알림 상태 (사용/미사용) 변경 patch
// export const patchAlarm = async () => {
//   const res = await fetch(`${BASE_URL}/api/users/alarm`, {
//     method: 'PATCH',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//   })

//   const result = await res.json()

//   if (!res.ok) {
//     throw new Error(result.message || '알림 설정 변경 실패')
//   }

//   return result
// }

// 알림 읽음 처리 put
export const putNotis = async (ids: number[]) => {
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
export const deleteNotis = async (ids: number[] | number) => {
  const idsArray = Array.isArray(ids) ? ids : [ids]
  const res = await fetch(`${BASE_URL}/api/notifications`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ ids: idsArray }),
  })

  if (!res.ok) throw new Error('알림 삭제 실패')

  return res.json()
}

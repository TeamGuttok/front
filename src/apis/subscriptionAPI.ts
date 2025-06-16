'use server'
// 구독 목록 조회 / knownServices 구독 서비스 리스트

import type {
  SubscriptionRequest,
  SubscriptionContents,
} from '#types/subscription'
import { BASE_URL } from '#constants/url'
import { cookies } from 'next/headers'
import { PageRequest, fetchNotiRequest } from '#types/notification'

// 구독 서비스 리스트 검색
export async function searchService(name: string) {
  const params = new URLSearchParams({ name })
  const url = `${BASE_URL}/api/subscriptions?${params.toString()}`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('검색 요청 실패')
  }

  return res.json()
}

// 구독서비스 조회 GET (/)
export async function getItems(pageRequest: PageRequest = fetchNotiRequest) {
  const query = new URLSearchParams({
    lastId: String(pageRequest.lastId),
    size: String(pageRequest.size),
  })

  const session = (await cookies()).get('SESSION')

  if (!session) throw new Error('세션 없음')
  console.log(session.value, 'fetching user info from')

  const res = await fetch(
    `${BASE_URL}/api/subscriptions/user?${query.toString()}`,
    {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: `SESSION=${session.value}`,
      },
    },
  )

  if (!res.ok && res.status === 401) {
    throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
  }

  if (!res.ok) {
    throw new Error('구독 항목 불러오기 실패')
  }

  return res.json()
}

// 구독 서비스 개별 조회 GET (/detail)
export async function getItemById(id: string): Promise<SubscriptionContents> {
  const cookieStore = await cookies()
  const session = cookieStore.get('SESSION')

  if (!session) throw new Error('세션 없음')

  const query = new URLSearchParams({
    lastId: String(Number.MAX_SAFE_INTEGER),
    size: String(Number.MAX_SAFE_INTEGER),
  })

  const res = await fetch(
    `${BASE_URL}/api/subscription/user?${query.toString()}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `SESSION=${session.value}`,
      },
    },
  )

  if (!res.ok && res.status === 401) {
    throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
  }

  if (!res.ok) {
    const errorText = await res.text()
    console.error('구독 항목 fetch 실패 내용:', errorText)
    throw new Error('구독 항목 불러오기 실패')
  }

  const json = await res.json()

  const matched = json.contents.find((item: any) => String(item.id) === id)
  if (!matched)
    throw new Error(`ID ${id}에 해당하는 구독 항목을 찾을 수 없습니다.`)

  return matched
}

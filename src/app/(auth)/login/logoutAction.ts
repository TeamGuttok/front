'use server'

import { redirect } from 'next/navigation'
import Fetcher from '#apis/common/fetcher'

export async function logoutAction(): Promise<void> {
  const fetcher = new Fetcher()
  try {
    await fetcher.post('/api/users/signout', { skipSessionCheck: false })
  } catch (error: unknown) {
    console.error('로그아웃 실패:', error)
  }
  redirect('/')
}

'use client'

import { useEffect } from 'react'
import { useAuthStore } from '../stores/auth/useAuthStore'
import UnauthenticatedPage from '../components/Layout/Main/UnauthenticatedPage'
import AuthenticatedPage from '../components/Layout/Main/AuthenticatedPage'
import { Skeleton } from '../components/_common/Skeleton'

export default function Home() {
  const { isLoggedIn, setUser } = useAuthStore()

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => {
      console.log('useAuthStore 상태 변경:', state)
    })

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUser(user)
      } catch (error) {
        console.error('사용자 정보를 불러오지 못했습니다.', error)
      }
    }

    return () => {
      unsubscribe()
    }
  }, [setUser])

  if (isLoggedIn === null) {
    return (
      <main className="p-6 space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </main>
    )
  }

  return (
    <main>
      {isLoggedIn ? (
        <AuthenticatedPage />
      ) : (
        <UnauthenticatedPage pathname="/" />
      )}
    </main>
  )
}

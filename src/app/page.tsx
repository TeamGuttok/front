'use client'

import { useEffect } from 'react'
import { useAuthStore } from '../stores/auth/useAuthStore'
import UnauthenticatedPage from '../components/Layout/Main/UnauthenticatedPage'
import AuthenticatedPage from '../components/Layout/Main/AuthenticatedPage'
import { Skeleton } from '../components/_common/Skeleton'

export default function Home() {
  // 로그인 세션 여부에 따라 다른 레이아웃 반환
  // 로컬에서 AuthenticatedPage 반환 테스트할 때에는 개발자 도구 콘솔에서 쿠키 추가
  // document.cookie = "sessionToken=mock-token; path=/; domain=localhost; expires=Fri, 31 Dec 2025 23:59:59 GMT";

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const checkSession = useAuthStore((state) => state.checkSession)

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe(
      (state) => state.isLoggedIn,
      (isLoggedIn) => {
        console.log('로그인 성공', isLoggedIn)
        // 로그인 후 추가 데이터 호출 api 추가
      },
    )

    checkSession()

    return () => unsubscribe()
  }, [])

  if (isLoggedIn === null)
    return (
      <main className="p-6 space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </main>
    )

  return (
    <main>
      {isLoggedIn ? (
        <UnauthenticatedPage pathname="/" />
      ) : (
        <AuthenticatedPage />
      )}
    </main>
  )
}

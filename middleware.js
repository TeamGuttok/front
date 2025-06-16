import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/mypage/:path*', '/notification', '/item/:path*'],
}
export function middleware(request) {
  const session = request.cookies.get('SESSION')

  console.log('쿠키에서 가져온 세션', session)

  if (!session && request.nextUrl.pathname !== '/login') {
    console.log('로그인 페이지로 리디렉션 시킴')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

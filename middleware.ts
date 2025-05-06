import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/mypage',
    '/mypage/:path*',
    '/notification',
    '/item/:path*',
    '/protected/:path',
  ],
}
export function middleware(request: NextRequest) {
  console.log('미들웨어 실행중', request.nextUrl.pathname)

  const session = request.cookies.get('SESSION')

  if (!session && request.nextUrl.pathname !== '/login') {
    console.log('미들웨어실행중')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

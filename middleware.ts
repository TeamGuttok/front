import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/mypage', '/mypage/:path*', '/notification', '/item/:path*'],
}
export function middleware(request: NextRequest) {
  const session = request.cookies.get('SESSION')
  const pathname = request.nextUrl.pathname

  const isApi = pathname.startsWith('/api')

  if (!session) {
    if (isApi) {
      return Response.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 },
      )
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|images/favicon|login|register|forgotPassword).*)',
//   ],

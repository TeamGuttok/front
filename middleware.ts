import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/', '/login', '/register', '/forgot/password, /fo']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static')
  ) {
    return NextResponse.next()
  }

  // Dynamic Route 예외처리
  const isItemDetailOrEdit = /^\/item\/\d+\/(detail|edit)$/.test(pathname)
  if (isItemDetailOrEdit) {
    const authCookie = request.cookies.get('auth')
    if (!authCookie) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  const authCookie = request.cookies.get('auth')
  if (!authCookie) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|register|forgot/password).*)',
  ],
}

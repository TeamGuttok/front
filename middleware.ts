import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/', '/login', '/register', '/forgotPassword']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images/favicon') ||
    pathname.startsWith('/favicon.png')
  ) {
    return NextResponse.next()
  }

  const isLoggedIn = request.cookies.has('SESSION') // 또는 'auth'
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Dynamic Route 예외처리
//   const isItemDetailOrEdit = /^\/item\/\d+\/(detail|edit)$/.test(pathname)
//   if (isItemDetailOrEdit) {
//     const authCookie = request.cookies.get('SESSION')
//     if (!authCookie) {
//       const loginUrl = new URL('/login', request.url)
//       return NextResponse.redirect(loginUrl)
//     }
//     return NextResponse.next()
//   }

//   const authCookie = request.cookies.get('SESSION')
//   if (!authCookie) {
//     const loginUrl = new URL('/login', request.url)
//     return NextResponse.redirect(loginUrl)
//   }

//   return NextResponse.next()
// }

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}

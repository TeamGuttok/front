import type { Metadata } from 'next'
import QueryProvider from '#contexts/QueryProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - 구똑',
    default: '구똑',
  },
  description: '고정지출 관리 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  )
}

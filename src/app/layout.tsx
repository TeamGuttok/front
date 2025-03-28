import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import QueryProvider from '#contexts/QueryProvider'
import ThemeProvider from '#contexts/ThemeProvider'
import Layout from '#components/Layout'
import { Toaster } from '#components/_common/Toast/toaster'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <ReactQueryDevtools />
          <ThemeProvider>
            <Layout>
              <main className="relative flex flex-col w-full sm:w-[calc(100%-224px)] sm:float-right h-[calc(100vh-72px)] sm:h-[100vh] overflow-y-auto">
                {children}
              </main>
            </Layout>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

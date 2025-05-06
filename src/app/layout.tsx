import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import QueryProvider from '#contexts/QueryProvider'
import ThemeProvider from '#contexts/ThemeProvider'
import Layout from '#components/Layout'
import { Toaster } from '#components/_common/Toast/toaster'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const metadata: Metadata = {
  title: '구똑',
  description: '구똑: 구독을 똑똑하게',
  icons: {
    icon: [
      {
        href: '/images/favicon/light_favicon.png',
        url: '/images/favicon/light_favicon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        href: '/images/favicon/dark_favicon.png',
        url: '/images/favicon/dark_favicon.png',
        media: '(prefers-color-scheme: black)',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>
          <QueryProvider>
            <ReactQueryDevtools />
            <Layout>
              {/* TODO */}
              {/* [ ] 스타일정리... */}
              <main className="relative flex flex-col w-full sm:w-[calc(100%-224px)] sm:float-right h-[calc(100vh-72px)] sm:h-[100vh] overflow-y-auto">
                {children}
              </main>
            </Layout>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

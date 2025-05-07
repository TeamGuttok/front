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
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/images/favicon/light_favicon.png',
    apple: '/images/favicon/light_favicon.png',
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
            <Layout>{children}</Layout>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

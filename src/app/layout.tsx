import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import QueryProvider from '#contexts/QueryProvider'
import ThemeProvider from '#contexts/ThemeProvider'
import Layout from '#components/Layout'
import { Toaster } from '#components/_common/Toast/toaster'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '구똑',
    template: '%s | 구똑',
  },
  description: '구똑: 구독을 똑똑하게',
  keywords: [
    '구똑',
    '구독',
    '구독관리',
    '구독 관리',
    '구독 관리 서비스',
    '구독을 똑똑하게',
    '구독 관리 앱',
    '구독관리',
    '고정 지출 관리',
    '고정지출',
    '고정 지출',
    '정기결제',
    '정기 결제',
    '가계부',
    '구독 서비스',
    'guttok',
    'Guttok',
    'Subscription',
    'Subscription Manager',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://guttok.site',
  },

  openGraph: {
    title: '구똑 | 구독을 똑똑하게',
    description:
      '고정 지출을 한눈에 관리하고, 알림을 받을 수 있는 스마트한 구독 관리 앱, 구똑.',
    url: 'https://guttok.site',
    siteName: '구똑',
    images: [
      {
        url: '/images/favicon/light_favicon.png',
        width: 1200,
        height: 630,
        alt: '구독을 똑똑하게, 구똑',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },

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
            <Layout>{children}</Layout>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

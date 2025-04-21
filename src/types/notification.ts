import type { SubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'

// 알림 상태
export type NotificationStatus = 'READ' | 'UNREAD'

export type StatusBadgeProps =
  | {
      variant: 'subscription'
      status: 'PENDING' | 'COMPLETED'
      paymentDay: number
    }
  | {
      variant: 'notification'
      status: NotificationStatus
      paymentDay?: never
    }

// 알림 카테고리
export type NotificationCategory = 'APPLICATION' | 'SYSTEM'

// 단일 알림 객체
export interface Notification {
  id: number
  category: NotificationCategory
  message: string
  status: NotificationStatus
  registerDate: string
  updateDate: string

  // 클라이언트 상태 전용 속성 (zustand에서 사용)
  isRead?: boolean
}

// 알림 페이징 요청
export interface PageRequest {
  lastId: number
  size: number
}

// 알림 페이징 응답
export interface NotificationResponse {
  contents: Notification[]
  size: number
  hasNext: boolean
  status: string
  message?: string
}

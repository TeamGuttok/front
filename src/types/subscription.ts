import { KNOWN_SERVICES } from '#constants/knownServices'

export type ServiceId = (typeof KNOWN_SERVICES)[number]['id'] | 'CUSTOM_INPUT'

export type PaymentMethod =
  | 'CARD'
  | 'BANK_TRANSFER'
  | 'MOBILE_PAYMENT'
  | 'NAVER_PAY'
  | 'KAKAO_PAY'
  | 'OTHER'

export interface SubscriptionContents {
  id: number
  title: string
  subscription: ServiceId
  paymentAmount: number
  paymentMethod: PaymentMethod
  paymentStatus: 'COMPLETED' | 'PENDING'
  paymentCycle: 'YEARLY' | 'MONTHLY' | 'WEEKLY'
  paymentDay: number
  registerDate: string
  updateDate: string
}

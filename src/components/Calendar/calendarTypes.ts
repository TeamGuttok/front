export enum CalendarViewType {
  YEARLY = 'YEARLY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}

export interface CalendarEvent {
  id: number
  title: string
  subscription: string
  paymentAmount: number
  paymentMethod:
    | 'CARD'
    | 'BANK_TRANSFER'
    | 'MOBILE_PAYMENT'
    | 'NAVER_PAY'
    | 'KAKAO_PAY'
    | 'OTHER'
  paymentStatus: 'COMPLETED' | 'PENDING'
  paymentCycle: 'YEARLY' | 'MONTHLY' | 'WEEKLY'
  paymentDay: number
  registerDate: string
  updateDate: string
}

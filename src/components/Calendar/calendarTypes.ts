export enum CalendarViewType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export interface CalendarEvent {
  id: number
  title: string
  subscription: string
  paymentAmount: number
  paymentMethod: string
  paymentStatus: string
  paymentCycle: string
  paymentDay: number
  registerDate: string
  updateDate: string
}

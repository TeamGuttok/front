import type { SubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'

export interface Notification extends Pick<
    SubscriptionStore,
    'title' | 'subscription' | 'paymentCycle' | 'paymentDay'
> {
  id: string,
  isRead: boolean
  createdAt: string 
}
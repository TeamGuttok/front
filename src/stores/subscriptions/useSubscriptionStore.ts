import { create } from 'zustand'

export type SubscriptionStore = {
  title: string
  subscription: string
  paymentAmount: number
  paymentMethod?: string
  paymentCycle: string
  paymentDay: number
  memo?: string
}

export type UserSubscriptionTypeInfo = SubscriptionStore & {
  userId: number
}

type SubscriptionState = {
  subscriptionData: SubscriptionStore
  setSubscriptionData: (data: Partial<SubscriptionStore>) => void
  updateSubscription: (
    isCustom: boolean,
    subscriptionId?: string,
    title?: string,
  ) => void
  resetSubscriptionData: () => void

  updatePaymentAmount: (paymentAmount: number) => void

  paymentMethodOptions: string[]
  updatePaymentMethod: (paymentMethod: string) => void

  paymentCycleOptions: string[]
  updatePaymentCycle: (paymentCycle: string) => void

  paymentDayOptions: number[]
  updatePaymentDay: (paymentDay: number) => void

  updateMemo: (memo: string) => void
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptionData: {
    title: '',
    subscription: '',
    paymentAmount: 0,
    paymentMethod: '',
    paymentCycle: '주',
    paymentDay: 1,
    memo: '',
  },
  setSubscriptionData: (data) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, ...data },
    })),
  updateSubscription: (isCustom, subscriptionId) =>
    set((state) => ({
      subscriptionData: {
        ...state.subscriptionData,
        subscription: isCustom ? '' : subscriptionId || '',
        title: isCustom ? '' : '',
      },
    })),
  resetSubscriptionData: () =>
    set(() => ({
      subscriptionData: {
        title: '',
        subscription: '',
        paymentAmount: 0,
        paymentMethod: '',
        paymentCycle: '주',
        paymentDay: 1,
        memo: '',
      },
    })),

  updatePaymentAmount: (paymentAmount) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentAmount },
    })),

  paymentMethodOptions: [
    '카드',
    '계좌 이체',
    '네이버페이',
    '카카오페이',
    '휴대폰 결제',
    '기타',
  ],
  updatePaymentMethod: (paymentMethod) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentMethod },
    })),

  paymentCycleOptions: ['주', '월', '년'],
  updatePaymentCycle: (paymentCycle) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentCycle },
    })),

  paymentDayOptions: Array.from({ length: 31 }, (_, i) => i + 1),
  updatePaymentDay: (paymentDay) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentDay },
    })),

  updateMemo: (memo) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, memo },
    })),
}))

import { create } from 'zustand'
import {
  serviceNameLabels,
  paymentMethodLabels,
  paymentCycleLabels,
  paymentStatusLabels,
  PaymentMethod,
  PaymentDay,
  PaymentCycle,
  paymentStatus,
} from '#types/subscription'
import { KNOWN_SERVICES } from '#constants/knownServices'

export type SubscriptionStore = {
  title: string
  subscription: string
  paymentAmount: number
  paymentMethod?: string
  paymentStatus?: string
  paymentCycle: string
  paymentDay: number
  memo?: string
}

export const useSubscriptionStore = create((set) => ({
  subscriptionData: {
    title: '',
    subscription: '',
    paymentAmount: 0,
    paymentMethod: '',
    paymentStatus: '',
    paymentCycle: '',
    paymentDay: '',
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
        subscription: isCustom
          ? 'CUSTOM_INPUT'
          : subscriptionId || KNOWN_SERVICES[0].id,
        title: isCustom ? state.subscriptionData.title : subscriptionId || '',
      },
    })),

  resetSubscriptionData: () =>
    set(() => ({
      subscriptionData: {
        title: '',
        subscription: '',
        paymentAmount: 0,
        paymentMethod: '',
        paymentStatus: '',
        paymentCycle: '',
        paymentDay: '',
        memo: '',
      },
    })),

  // 결제 금액
  updatePaymentAmount: (paymentAmount) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentAmount },
    })),

  // 결제 수단
  paymentMethodOptions: Object.entries(paymentMethodLabels).map(
    ([key, label]) => ({
      value: key as PaymentMethod,
      label,
    }),
  ),

  updatePaymentMethod: (paymentMethod: PaymentMethod) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentMethod },
    })),

  // 결제 상태
  paymentStatusOption: (paymentStatus: paymentStatus) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentStatus },
    })),

  paymentStatusOptions: Object.entries(paymentStatusLabels).map(
    ([key, label]) => ({
      value: key as paymentStatus,
      label,
    }),
  ),

  // 결제 주기
  paymentCycleOptions: Object.entries(paymentCycleLabels).map(
    ([key, label]) => ({
      value: key as PaymentCycle,
      label,
    }),
  ),

  updatePaymentCycle: (paymentCycle: PaymentCycle) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentCycle },
    })),

  // 결제 날짜
  paymentDayOptions: Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  })),

  updatePaymentDay: (paymentDay: PaymentDay) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentDay },
    })),

  updateMemo: (memo) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, memo },
    })),

  subscriptionOptions: KNOWN_SERVICES.map((service) => ({
    value: service.id,
    label: serviceNameLabels[service.id] || service.name,
  })),
}))

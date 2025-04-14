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
import { SubscriptionRequest } from '#types/subscription'

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

export type SubscriptionState = {
  subscriptionData: SubscriptionStore
  setSubscriptionData: (data: Partial<SubscriptionStore>) => void
  updateSubscription: (isCustom: boolean, subscriptionId: string) => void
  resetSubscriptionData: () => void
  updatePaymentAmount: (amount: number) => void
  updatePaymentMethod: (method: string) => void
  updatePaymentDay: (day: number) => void
  updatePaymentCycle: (cycle: string) => void
  updateMemo: (memo: string) => void
  paymentMethodOptions: { value: string; label: string }[]
  paymentStatusOptions: { value: string; label: string }[]
  paymentCycleOptions: { value: string; label: string }[]
  paymentDayOptions: { value: number; label: string }[]
  subscriptionOptions: { value: string; label: string }[]
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptionData: {
    title: '',
    subscription: '',
    paymentAmount: 0,
    paymentMethod: '',
    paymentStatus: '',
    paymentCycle: '',
    paymentDay: 1,
    memo: '',
  },

  setSubscriptionData: (data: Partial<SubscriptionRequest>) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, ...data },
    })),

  updateSubscription: (isCustom, subscriptionId) =>
    set((state) => {
      const isKnownService = !isCustom && subscriptionId
      const knownServiceName = isKnownService
        ? (serviceNameLabels[subscriptionId] ?? subscriptionId)
        : ''

      return {
        subscriptionData: {
          ...state.subscriptionData,
          subscription: isCustom ? 'CUSTOM_INPUT' : subscriptionId,
          title: isCustom ? state.subscriptionData.title : knownServiceName,
          iconUrl: isKnownService
            ? (KNOWN_SERVICES.find((s) => s.id === subscriptionId)?.iconUrl ??
              '')
            : '',
        },
      }
    }),
  // set((state) => ({

  //   subscriptionData: {

  //     ...state.subscriptionData,
  //     subscription: isCustom
  //       ? 'CUSTOM_INPUT'
  //       : subscriptionId,
  //       // || KNOWN_SERVICES[0].id
  //     title: isCustom ? state.subscriptionData.title : knownServiceName,
  //   },
  // })),

  resetSubscriptionData: () =>
    set(() => ({
      subscriptionData: {
        title: '',
        subscription: '',
        paymentAmount: 0,
        paymentMethod: '',
        paymentStatus: '',
        paymentCycle: '',
        paymentDay: 1,
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

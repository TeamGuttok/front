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

export const paymentMethodOptions = Object.entries(paymentMethodLabels).map(
  ([key, label]) => ({ value: key as PaymentMethod, label }),
)

export const paymentStatusOptions = Object.entries(paymentStatusLabels).map(
  ([key, label]) => ({ value: key as paymentStatus, label }),
)

export const paymentCycleOptions = Object.entries(paymentCycleLabels).map(
  ([key, label]) => ({ value: key as PaymentCycle, label }),
)

export const paymentDayOptions = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}))

export const subscriptionOptions = KNOWN_SERVICES.map((service) => ({
  value: service.id,
  label: serviceNameLabels[service.id] || service.name,
}))

export const initialState = {
  title: '',
  subscription: '',
  paymentAmount: 0,
  paymentMethod: '',
  paymentStatus: '',
  paymentCycle: '',
  paymentDay: 1,
  memo: '',
  iconUrl: '',
}

export type SubscriptionStore = typeof initialState

export type SubscriptionState = {
  subscriptionData: SubscriptionStore
  setSubscriptionData: (data: Partial<SubscriptionStore>) => void
  updateSubscription: (isCustom: boolean, subscriptionId: string) => void
  resetSubscriptionData: () => void
  updateField: <K extends keyof SubscriptionStore>(
    key: K,
    value: SubscriptionStore[K],
  ) => void

  paymentMethodOptions: typeof paymentMethodOptions
  paymentStatusOptions: typeof paymentStatusOptions
  paymentCycleOptions: typeof paymentCycleOptions
  paymentDayOptions: typeof paymentDayOptions
  subscriptionOptions: typeof subscriptionOptions
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptionData: { ...initialState },

  setSubscriptionData: (data) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, ...data },
    })),

  updateSubscription: (isCustom, subscriptionId) =>
    set((state) => {
      const isKnown = !isCustom && subscriptionId
      const knownServiceName = isKnown ? serviceNameLabels[subscriptionId] : ''
      const iconUrl = isKnown
        ? (KNOWN_SERVICES.find((s) => s.id === subscriptionId)?.iconUrl ?? '')
        : ''

      return {
        subscriptionData: {
          ...state.subscriptionData,
          subscription: isCustom ? 'CUSTOM_INPUT' : subscriptionId,
          title: isCustom ? state.subscriptionData.title : knownServiceName,
          iconUrl,
        },
      }
    }),

  resetSubscriptionData: () => set({ subscriptionData: { ...initialState } }),

  updateField: (key, value) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, [key]: value },
    })),

  paymentMethodOptions,
  paymentStatusOptions,
  paymentCycleOptions,
  paymentDayOptions,
  subscriptionOptions,
}))

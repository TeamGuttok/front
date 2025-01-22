import { create } from 'zustand';

export type SubscriptionStore = {
  title: string;
  price: number;
  subscription: '';
  paymentAmount: number;
  paymentMethod?: string;
  paymentCycle: string;
  paymentDay: number;
  memo?: string;
};

export type UserSubscriptionTypeInfo = SubscriptionStore & {
  userId: number;
};

type SubscriptionState = {
  subscriptionData: SubscriptionStore;
  paymentCycleOptions: string[];
  paymentDayOptions: number[];
  paymentMethodOptions: string[];
  setSubscriptionData: (data: Partial<SubscriptionStore>) => void;
  updatePaymentCycle: (paymentCycle: string) => void;
  updatePaymentDay: (paymentDay: number) => void;
  resetSubscriptionData: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptionData: {
    title: '',
    price: 0,
    subscription: '',
    paymentAmount: 0,
    paymentMethod: '',
    paymentCycle: '주',
    paymentDay: 1,
    memo: '',
  },
  paymentCycleOptions: ['주', '월', '년'],
  paymentDayOptions: Array.from({ length: 31 }, (_, i) => i + 1),
  paymentMethodOptions: ['카드', '계좌 이체', '네이버페이', '카카오페이', '휴대폰 결제', '기타'],

  setSubscriptionData: (data) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, ...data },
    })),

  updatePaymentCycle: (paymentCycle) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentCycle },
    })),

  updatePaymentDay: (paymentDay) =>
    set((state) => ({
      subscriptionData: { ...state.subscriptionData, paymentDay },
    })),

  resetSubscriptionData: () =>
    set(() => ({
      subscriptionData: {
        title: '',
        price: 0,
        subscription: '',
        paymentAmount: 0,
        paymentMethod: '',
        paymentCycle: '주',
        paymentDay: 1,
        memo: '',
      },
    })),
}));
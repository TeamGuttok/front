import { create } from 'zustand';

export type SubscriptionType = {
  title: string;
  price: number;
  subscription: string;
  paymentAmount: number;
  paymentMethod?: string;
  startDate: string;
  paymentCycle: string;
  paymentDay: number;
  memo?: string;
};

export type UserSubscriptionTypeInfo = SubscriptionType & {
  userId: number;
};

type SubscriptionState = {
  subscriptionData: SubscriptionType;
  setSubscriptionData: (data: Partial<SubscriptionType>) => void;
  resetSubscriptionData: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptionData: {
    title: '',
    price: 0,
    subscription: '',
    paymentAmount: 0,
    paymentMethod: '',
    startDate: '',
    paymentCycle: '',
    paymentDay: 1,
    memo: '',
  },
  setSubscriptionData: (data) =>
    set((state) => ({
      subscriptionData: {
        ...state.subscriptionData,
        ...data,
      },
    })),
  resetSubscriptionData: () =>
    set(() => ({
      subscriptionData: {
        title: '',
        price: 0,
        subscription: '',
        paymentAmount: 0,
        paymentMethod: '',
        startDate: '',
        paymentCycle: '',
        paymentDay: 1,
        memo: '',
      },
    })),
}));
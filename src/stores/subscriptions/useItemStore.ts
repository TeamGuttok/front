import { create } from 'zustand'
import { SubscriptionStore } from './useSubscriptionStore'
import { persist } from 'zustand/middleware'

export type SubscriptionItem = SubscriptionStore & {
  useId: string
}

export type ItemState = {
  items: SubscriptionItem[] // 아이템 리스트
  addItem: (item: SubscriptionItem) => void // 추가(post)
  getItemById: (id: string) => SubscriptionItem | undefined // 조회(get)
  updateItem: (id: string, updatedItem: Partial<SubscriptionItem>) => void // 수정(put)
  removeItem: (id: string) => void // 삭제(delete)
  getTotalPaymentAmount: () => number
}

export const useItemStore = create<ItemState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      getItemById: (id) => get().items.find((item) => item.useId === id),
      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.useId === id ? { ...item, ...updatedItem } : item,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.useId !== id),
        })),
        getTotalPaymentAmount: () => {
          const { items } = get()
          const today = new Date()
          const currentDay = today.getDate()
  
          return items
            .filter((item) => {
              if (item.paymentCycle === 'MONTHLY') return true
              if (item.paymentCycle === 'YEARLY')
                return item.paymentDay === currentDay
              return false
            })
            .reduce((sum, item) => sum + item.paymentAmount, 0)
        },
      }),
      {
        name: 'subscription-items',
      },
    ),
  )
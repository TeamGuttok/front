import { create } from 'zustand'
import { SubscriptionStore } from './useSubscriptionStore'
import { persist } from 'zustand/middleware'
import { isSameDay, getDate, getMonth, getYear } from 'date-fns'
import { KNOWN_SERVICES } from '#constants/knownServices'
import { createJSONStorage } from 'zustand/middleware'

export type SubscriptionItem = SubscriptionStore & {
  useId: string
  id: number
  iconUrl?: string
  createdAt?: string
}

export type ItemState = {
  items: SubscriptionItem[] // 아이템 리스트
  addItem: (item: SubscriptionItem) => void // 추가(post)
  setItems: (items: SubscriptionItem[]) => void
  getItemById: (id: string) => SubscriptionItem | undefined // 조회(get)
  updateItem: (id: string, updatedItem: Partial<SubscriptionItem>) => void // 수정(put)
  removeItem: (id: string) => void // 삭제(delete)
  getTotalPaymentAmount: () => number
  reset: () => void
}

export const useItemStore = create<ItemState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const iconUrl =
          item.subscription !== 'CUSTOM_INPUT'
            ? KNOWN_SERVICES.find((s) => s.id === item.subscription)?.iconUrl
            : ''

        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              iconUrl,
              createdAt: new Date().toISOString(),
            },
          ],
        }))
      },
      setItems: (items) => {
        const enrichedItems = items.map((item) => {
          const iconUrl =
            item.subscription !== 'CUSTOM_INPUT'
              ? KNOWN_SERVICES.find((s) => s.id === item.subscription)?.iconUrl
              : ''
          return {
            ...item,
            iconUrl,
            useId: String(item.useId),
            createdAt: new Date().toISOString(),
          }
        })

        set({ items: enrichedItems })
      },
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

        return items
          .filter((item) => {
            if (item.paymentStatus === 'COMPLETED') return false

            if (item.paymentCycle === 'MONTHLY') {
              return item.paymentDay === getDate(today)
            }

            if (item.paymentCycle === 'YEARLY') {
              const createdAt = item.createdAt ? new Date(item.createdAt) : null
              return (
                createdAt &&
                getDate(createdAt) === getDate(today) &&
                getMonth(createdAt) === getMonth(today)
              )
            }

            return false
          })
          .reduce((sum, item) => sum + item.paymentAmount, 0)
      },
      reset: () => set({ items: [] }),
    }),

    {
      name: 'subscription-items',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

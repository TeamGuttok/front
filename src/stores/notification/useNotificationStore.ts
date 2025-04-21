import { create } from 'zustand'
import { Notification } from '#types/notification'
import { persist } from 'zustand/middleware'

export interface NotificationState {
  notifications: Notification[]
  addNotification: (item: Notification) => void
  markAsRead: (id: string) => void
  removeNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (item) =>
        set((state) => ({
          notifications: [...state.notifications, item],
        })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === Number(id) ? { ...n, isRead: true } : n,
          ),
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== Number(id)),
        })),
    }),
    {
      name: 'notifications',
    },
  ),
)

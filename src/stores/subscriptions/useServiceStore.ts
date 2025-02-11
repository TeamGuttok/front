import { create } from 'zustand'
import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'

export type ServiceStore = {
  id: string
  name: string
  href: string
  iconUrl: React.ReactNode | string
  isCustom: boolean
}

export type ServiceState = {
  selectedService: ServiceStore | null
  setSelectedService: (service: Omit<ServiceStore, 'href'>) => void
}

export const useServiceStore = create<ServiceState>((set) => ({
  selectedService: null,
  setSelectedService: (service) => {
    set({
      selectedService: {
        ...service,
        href: 'add/detail',
      },
    })

    const { updateSubscription, setSubscriptionData } =
      useSubscriptionStore.getState()
    updateSubscription(service.isCustom, service.id)
    setSubscriptionData({ title: service.isCustom ? '' : service.name })
  },
}))

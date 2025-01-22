import { create } from 'zustand'
import { useSubscriptionStore } from '#stores/useSubscriptionStore'

export type ServiceStore = {
  id: string
  name: string
  href: string
  iconUrl: JSX.Element
  isCustom: boolean
}

export type ServiceState = {
  selectedService: ServiceStore | null
  setSelectedService: (service: ServiceStore) => void
}

export const useServiceStore = create<ServiceState>((set) => ({
  selectedService: null,
  setSelectedService: (service) => {
    set({ selectedService: service });

    const { setSubscriptionData } = useSubscriptionStore.getState();
    setSubscriptionData({ title: service.isCustom ? '' : service.name });
  },
}))

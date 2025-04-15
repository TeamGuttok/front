import { create } from 'zustand'
import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { serviceNameLabels } from '#types/subscription'

export type ServiceStore = {
  id: string
  title: string
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
    const id = service.id
    const isCustom = service.isCustom
    const nameFromLabels = serviceNameLabels[id]
  
    console.log('🔥 [ServiceStore] id:', id)
    console.log('🔥 [ServiceStore] isCustom:', isCustom)
    console.log('🔥 [ServiceStore] nameFromLabels:', nameFromLabels)
  
    set({
      selectedService: {
        ...service,
        href: 'add/detail',
      },
    })
  
    const { updateSubscription, setSubscriptionData } =
      useSubscriptionStore.getState()
  
    updateSubscription(isCustom, id)
  
    setSubscriptionData({
      title: isCustom ? '' : nameFromLabels ?? service.name,
    })
  }
}))

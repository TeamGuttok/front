import { create } from 'zustand'
import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { serviceNameLabels } from '#types/subscription'
import type { ServiceItem } from '#types/subscription'
import { PATH } from '#app/routes'

export type ServiceStore = ServiceItem & {
  href: string
  iconUrl: React.ReactNode | string
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
    set({
      selectedService: {
        ...service,
        href: PATH.addDetail,
      },
    })

    const { updateSubscription, setSubscriptionData } =
      useSubscriptionStore.getState()

    updateSubscription(isCustom, id)

    setSubscriptionData({
      title: isCustom ? '' : (nameFromLabels ?? service.name),
    })
  },
}))

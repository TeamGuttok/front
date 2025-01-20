import { create } from 'zustand'

type Service = {
  id: string
  name: string
  iconUrl: JSX.Element
}

type ServiceState = {
  selectedService: Service | null
  setSelectedService: (service: Service) => void
}

export const useServiceStore = create<ServiceState>((set) => ({
  selectedService: null,
  setSelectedService: (service) => set({ selectedService: service }),
}))

import { create } from 'zustand'

export type ServiceStores = {
  id: string
  name: string
  href: string
  iconUrl: React.ReactNode | string
  isCustom: boolean
}

interface SearchStore {
  searchQuery: string
  searchResults: ServiceStores[]
  setSearchQuery: (query: string) => void
  setSearchResults: (results: ServiceStores[]) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
}))

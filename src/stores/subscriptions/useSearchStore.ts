import { create } from 'zustand'
import { ServiceItem } from '#types/subscription'

interface SearchStore {
  searchQuery: string
  searchResults: ServiceItem[]
  isSearching: boolean
  setSearchQuery: (query: string) => void
  setSearchResults: (results: any[]) => void
  setIsSearching: (flag: boolean) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (flag) => set({ isSearching: flag }),
}))

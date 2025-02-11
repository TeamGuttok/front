import { useMutation } from '@tanstack/react-query'
import { useSearchStore } from '#stores/subscriptions/useSearchStore'

export const fetchSearchResults = async (query: string) => {
  const response = await fetch(`/api/search?query=${query}`)
  if (!response.ok) {
    throw new Error('검색 결과가 존재하지 않습니다.')
  }
  return response.json()
}

export const useSearch = () => {
  const { searchQuery, setSearchResults } = useSearchStore()

  const searchMutation = useMutation({
    mutationFn: fetchSearchResults,
    onSuccess: (data) => {
      setSearchResults(data.length > 0 ? data : []) // 검색 결과 상태 업데이트
    },
    onError: () => {
      setSearchResults([])
    },
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    searchMutation.mutate(searchQuery)
  }

  return { handleSearch, searchMutation }
}

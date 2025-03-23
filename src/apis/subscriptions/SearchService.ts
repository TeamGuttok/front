import { useMutation } from '@tanstack/react-query'
import { useSearchStore } from '#stores/subscriptions/useSearchStore'
import { BASE_URL } from '#constants/url'

export const fetchSearchResults = async (searchTerm: string) => {
  const response = await fetch(
    `${BASE_URL}/api/subscriptions?name=${encodeURIComponent(searchTerm)}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: { Accept: '*/*', 'Content-Type': 'application/json' },
    },
  )
  if (!response.ok) {
    throw new Error('검색 결과가 존재하지 않습니다.')
  }
  const data = await response.json()
  if (data.status !== 'OK') {
    throw new Error('응답 상태 이상')
  }
  return response.json()
}

export const useSearch = () => {
  const { searchQuery, setSearchResults } = useSearchStore()

  const searchMutation = useMutation({
    mutationFn: fetchSearchResults,
    onSuccess: (data) => {
      setSearchResults(data)
    },
    onError: () => {
      setSearchResults([])
    },
  })

  const handleSearch = (e: React.FormEvent, searchTerm: string) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    searchMutation.mutate(searchTerm)
  }

  return { handleSearch, searchMutation }
}

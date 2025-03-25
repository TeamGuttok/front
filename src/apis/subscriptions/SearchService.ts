import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useSearchStore } from '#stores/subscriptions/useSearchStore'
import { BASE_URL } from '#constants/url'
import { serviceNameLabels } from '#/types/subscription';
import { KNOWN_SERVICES } from '#/constants/knownServices';

const getServiceList = async (searchQuery: string) => {
  const { setSearchResults, setIsSearching } = useSearchStore.getState()
  setIsSearching(true)

  try {
    const query = new URLSearchParams({ name: searchQuery })

    const res = await fetch(`/api/subscriptions?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        name: searchQuery, // ✅ Header에 name 추가
      },
    })

    if (!res.ok) {
      throw new Error('API 요청 실패')
    }

    const json = await res.json()
    setSearchResults(json.data || [])
    return json.data
  } catch (err) {
    setSearchResults([])
    throw err
  } finally {
    setIsSearching(false)
  }
}

// ✅ 2. useQuery 훅
export const useSearchService = (searchQuery: string) => {
  return useQuery({
    queryKey: ['searchService', searchQuery],
    queryFn: () => getServiceList(searchQuery),
    enabled: !!searchQuery.trim(),
    retry: false,
  })
}

// const koreanToEnglishNameMap: Record<string, string> = {}
// Object.entries(serviceNameLabels).forEach(([id, koreanName]) => {
//   const service = KNOWN_SERVICES.find((s) => s.id === id)
//   if (service) {
//     koreanToEnglishNameMap[koreanName] = service.name
//   }
// })

// const getServiceList = async (searchQuery: string) => {
//   const { setSearchResults, setIsSearching } = useSearchStore.getState()
//   setIsSearching(true)

//   try {
//     const matchedKorean = Object.keys(koreanToEnglishNameMap).find((k) =>
//       k.includes(searchQuery),
//     )

//     if (!matchedKorean) {
//       setSearchResults([])
//       return []
//     }

//     const englishName = koreanToEnglishNameMap[matchedKorean]
//     const query = new URLSearchParams({ name: englishName })
//     const res = await fetch(`/api/subscriptions?${query.toString()}`)

//     if (!res.ok) {
//       throw new Error('API 요청 실패')
//     }

//     const json = await res.json()
//     setSearchResults(json.data || [])
//     return json.data
//   } catch (err) {
//     setSearchResults([])
//     throw err
//   } finally {
//     setIsSearching(false)
//   }
// }

// export const useSearchService = (searchQuery: string) => {
//   return useQuery({
//     queryKey: ['searchService', searchQuery],
//     queryFn: () => getServiceList(searchQuery),
//     enabled: !!searchQuery.trim(),
//     retry: false,
//   })
// }

// const getServiceList = async (koreanKeyword: string) => {
//   const matchedKorean = Object.keys(koreanToEnglishNameMap).find(k =>
//     k.includes(koreanKeyword)
//   );

//   if (!matchedKorean) return null;

//   const englishName = koreanToEnglishNameMap[matchedKorean];
//   const query = new URLSearchParams({
//     'searchRequest.name': englishName,
//   });

//   const res = await fetch(`/api/subscriptions?${query.toString()}`);

//   if (!res.ok) throw new Error('throw error');
//   return res.json();
// };

// export const useSearchService = (koreanKeyword: string) => {
//   return useQuery({
//     queryKey: ['searchService', koreanKeyword],
//     queryFn: () => getServiceList(koreanKeyword),
//     enabled: !!koreanKeyword, 
//   });
// };

// export default function useSearchStore (SearchServiceResponse_name: string) {
//   const { searchQuery, setSearchResults } = useSearchStore()

//   const {data, error, isLoading} = useQuery<SearchServiceResponse>({
//     queryKey: ['search', searchQuery],
//     queryFn: () => fetch(`${BASE_URL}/api/subscriptions`, {
//       method: 'GET',
//       credentials: 'include',
//       headers: { Accept: '*/*', 'Content-Type': 'application/json' },
//     }).then(res => res.json())
//   })

  // const [searchQuery, setSearchQuery] = useState(<string>'')

//   const { searchQuery, setSearchResults } = useSearchStore()
//   const {data, error, isLoading} = useQuery<SearchServiceResponse>({
//     queryKey: ['search', searchQuery],
//     queryFn: () => fetch(`${BASE_URL}/api/subscriptions`, {
//       method: 'GET',
//       credentials: 'include',
//       headers: { Accept: '*/*', 'Content-Type': 'application/json' },
//     }).then(res => res.json())
//   })
//}

// export const fetchSearchResults = async (searchTerm: string) => {
//   const response = await fetch(
//     `${BASE_URL}/api/subscriptions`,
//     {
//       method: 'GET',
//       credentials: 'include',
//       headers: { Accept: '*/*', 'Content-Type': 'application/json' },
//     },
//   )
//   if (!response.ok) {
//     throw new Error('검색 결과가 존재하지 않습니다.')
//   }
//   const data = await response.json()
//   if (data.status !== 'OK') {
//     throw new Error('응답 상태 이상')
//   }
//   return response.json()
// }

// export const useSearch = () => {
//   const { searchQuery, setSearchResults } = useSearchStore()

//   const searchMutation = useMutation({
//     mutationFn: fetchSearchResults,
//     onSuccess: (data) => {
//       setSearchResults(data)
//     },
//     onError: () => {
//       setSearchResults([])
//     },
//   })

//   const handleSearch = (e: React.FormEvent, searchTerm: string) => {
//     e.preventDefault()
//     if (!searchQuery.trim()) return
//     searchMutation.mutate(searchTerm)
//   }

//   return { handleSearch, searchMutation }
// }

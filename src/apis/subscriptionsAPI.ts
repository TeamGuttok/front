// import { useMutation } from '@tanstack/react-query'
// import { searchService } from '#apis/common/api'
// import { useSearchStore } from '#stores/subscriptions/useSearchStore'

// export default function useSearch() {
//   const { setSearchResults, setIsSearching } = useSearchStore()

//   const searchMutation = useMutation({
//     mutationFn: (query: string) => searchService(query),
//     onMutate: () => {
//       setIsSearching(true)
//     },
//     onSuccess: (response) => {
//       setSearchResults(response.data)
//       console.log('검색 성공', response)
//     },
//     onError: (error) => {
//       console.error('검색 실패', error)
//       setSearchResults([])
//     },
//     onSettled: () => {
//       setIsSearching(false)
//     },
//   })

//   return searchMutation
// }

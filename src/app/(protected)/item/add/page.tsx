export const dynamic = 'force-dynamic'

import ClientItemAdd from './ClientAddItems'
import { searchService } from '#apis/subscriptionAPI'

export default async function AddItems({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>
}) {
  const { name } = await searchParams
  const keyword = name ?? ''
  let initialResults = []

  if (keyword.trim()) {
    try {
      const result = await searchService(keyword)
      initialResults = result.data ?? []
    } catch (err) {
      console.error('검색 실패:', err)
    }
  }

  return <ClientItemAdd initialResults={initialResults} keyword={keyword} />
}

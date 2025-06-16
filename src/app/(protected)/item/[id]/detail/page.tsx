export const dynamic = 'force-dynamic'

import ClientDetailView from './ClientDetailView'
import { getItemById } from '#apis/subscriptionAPI'

export default async function ItemDetailView({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  if (!id || isNaN(Number(id))) {
    return (
      <p className="text-center text-gray-500">
        잘못된 접근 / 유효하지 않은 ID
      </p>
    )
  }

  try {
    const detailView = await getItemById(id)
    return <ClientDetailView initialData={detailView} params={params} />
  } catch (err) {
    console.error('SSR 유저 정보 로드 실패:', err)
    return (
      <p className="text-center text-gray-500">
        구독 항목을 불러오는 중 오류가 발생했습니다.
      </p>
    )
  }
}

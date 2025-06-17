export const dynamic = 'force-dynamic'

import ClientDetailView from './ClientDetailView'
import { getItemById } from '#apis/subscriptionAPI'
import type { PageProps } from '#types/subscription'

export default async function ItemDetailView(props: {
  params: Promise<{ id: string }>
}) {
  // const { id } = params
  const params = await props.params

  // if (!id || isNaN(Number(id))) {
  //   return (
  //     <p className="text-center text-gray-500">
  //       잘못된 접근입니다. 유효한 구독 항목 ID를 제공해주세요.
  //     </p>
  //   )
  // }

  try {
    const detailView = await getItemById(params.id)
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

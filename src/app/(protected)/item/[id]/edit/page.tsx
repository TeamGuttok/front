export const dynamic = 'force-dynamic'

import ClientEditItems from './ClientEditItems'

export default async function EditItems(props: { params: { id: string } }) {
  const params = await props.params
  console.log('edit/page.tsx params', params, params.id)

  try {
    return <ClientEditItems params={{ id: params.id }} />
  } catch (err) {
    console.log('SSR 구독 항목 수정 페이지 로드 실패:', err)
    return (
      <p className="text-center text-gray-500">
        구독 항목 수정 페이지를 불러오는 중 오류가 발생했습니다.
      </p>
    )
  }
}

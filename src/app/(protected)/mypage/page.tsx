export const dynamic = 'force-dynamic'

import ClientMyPage from './ClientMypage'
import { getUserInfo } from '#apis/userAPI'

export default async function MyPagePage() {
  try {
    const userData = await getUserInfo()
    return <ClientMyPage initialData={userData} />
  } catch (err) {
    console.error('SSR 유저 정보 로드 실패:', err)
  }
}

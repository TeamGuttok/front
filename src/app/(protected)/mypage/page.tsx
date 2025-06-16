import ClientMyPage from './ClientMypage'
import { getUserInfo } from '#apis/userAPI'

export default async function MyPagePage() {
  // let userData: Awaited<ReturnType<typeof getUserInfo>>
  try {
    const userData = await getUserInfo()
    console.log('initialData:', userData)
    return <ClientMyPage initialData={userData} />
  } catch (err) {
    console.error('SSR 유저 정보 로드 실패:', err)
  }
}

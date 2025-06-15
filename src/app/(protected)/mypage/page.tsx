import ClientMyPage from './ClientMypage'
import { getUserInfo } from '#apis/userAPI'
import { redirect } from 'next/navigation'
import { PATH } from '#app/routes'
import { cookies, headers } from 'next/headers'

export default async function MyPagePage() {
  // let userData: Awaited<ReturnType<typeof getUserInfo>>
  try {
    const userData = await getUserInfo()
    return <ClientMyPage initialData={userData} />
    // if (!userData) {
    //   redirect(PATH.login)
    // }
  } catch (err) {
    console.error('SSR 유저 정보 로드 실패:', err)
    redirect(PATH.login)
  }
}

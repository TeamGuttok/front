import ClientMyPage from './ClientMypage'
import { getUserInfo } from '#apis/userAPI'
import { redirect } from 'next/navigation'
import { PATH } from '#app/routes'
import { cookies, headers } from 'next/headers'

export default async function MyPagePage() {
  let userData: Awaited<ReturnType<typeof getUserInfo>> | null = null
  try {
    userData = await getUserInfo()
  } catch (err) {
    redirect(PATH.login)
  }

  return <ClientMyPage initialData={userData} />
}

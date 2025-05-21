import UnauthenticatedPage from '#components/Main/UnauthenticatedPage'
import AuthenticatedPage from '#components/Main/AuthenticatedPage'
import { cookies } from 'next/headers'
import Bubble from '#components/_common/Bubble'

export default async function Main() {
  const cookie = await cookies()
  const session = cookie.get('SESSION')?.value
  const isLoggedIn = Boolean(session)

  return (
    <>
      <main>
        {isLoggedIn ? <AuthenticatedPage /> : <UnauthenticatedPage />}
      </main>
      <Bubble />
    </>
  )
}

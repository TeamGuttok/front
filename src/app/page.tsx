import UnauthenticatedPage from '#components/Main/UnauthenticatedPage'
import AuthenticatedPage from '#components/Main/AuthenticatedPage'
import { cookies } from 'next/headers'
import FeedbackButton from '#components/_common/FeedbackButton'

export default async function Main() {
  const cookie = await cookies()
  const session = cookie.get('SESSION')?.value
  const isLoggedIn = Boolean(session)

  return (
    <>
      <main>
        {isLoggedIn ? <AuthenticatedPage /> : <UnauthenticatedPage />}
      </main>
      <FeedbackButton />
    </>
  )
}

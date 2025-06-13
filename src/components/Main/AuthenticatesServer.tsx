'use server'

import AuthenticatedPageClient from './AuthenticatedPage'
import { getItems } from '#apis/subscriptionAPI'

export default async function AuthenticatedPageServer() {
  const itemsData = await getItems()

  return <AuthenticatedPageClient initialItems={itemsData.contents} />
}

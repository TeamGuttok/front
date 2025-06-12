'use client'

import { Button } from '#components/_common/Button'
import { PATH } from '#app/routes'
import Link from 'next/link'
import ItemList from '#components/ui/itemList'
import { Plus } from 'lucide-react'
import { getGreeting } from '#hooks/getGreeting'
import { useGetUserInfoClient } from '#apis/userClient'
import { useCurrentMonthPaymentTotal } from '#hooks/useTotalPayment'
//import { Skeleton } from '#components/_common/Skeleton'
import { useEffect } from 'react'
// import { toast } from '#hooks/useToast'
// import { useRouter } from 'next/navigation'
// import { useAuthStore } from '#stores/auth/useAuthStore'

export default function AuthenficatedPage({
  initialItems,
}: {
  initialItems: any[]
}) {
  // const {
  //   data: userInfo,
  //   getUserInfoClient,
  //   isLoading,
  // } = useGetUserInfoClient()
  // const { login, logout, user, setUser, isLoggedIn } = useAuthStore()
  // const router = useRouter()
  const { getUserInfoClient, isLoading } = useGetUserInfoClient()

  // useEffect(() => {
  //   getUserInfoClient(undefined, {
  //     onSuccess: (data) => {
  //       login(data)
  //     },
  //     onError: (error) => {
  //       if (
  //         error.message.includes('SESSION') ||
  //         error.message.includes('401')
  //       ) {
  //         logout()
  //         router.replace(PATH.main)
  //         toast({
  //           variant: 'default',
  //           description: '30분 동안 활동이 없어 로그아웃 되었습니다.',
  //         })
  //       }
  //     },
  //   })
  // }, [])

  const monthlyTotal = useCurrentMonthPaymentTotal()

  // if (isLoading) {
  //   return (
  //     <main className="p-6 space-y-4">
  //       <Skeleton className="h-12 w-3/4" />
  //       <Skeleton className="h-6 w-5/6" />
  //       <Skeleton className="h-6 w-2/3" />
  //       <Skeleton className="h-40 w-full rounded-lg" />
  //     </main>
  //   )
  // }

  useEffect(() => {
    getUserInfoClient()
  }, [])

  return (
    <div className="mx-auto p-4 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex justify-between mt-3 mb-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold flex flex-row">
            {getGreeting()}
          </h1>
          <h2>
            이번 달 지출은{' '}
            <span className="font-bold">₩{monthlyTotal.toLocaleString()}</span>{' '}
            입니다.
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto mb-9">
        <ItemList />
      </div>

      <div className="fixed bottom-[5.5rem] sm:bottom-[3rem] right-4 sm:right-10 transform h-14 rounded-full shadow-lg flex items-center justify-center">
        <Link href={PATH.itemAdd} aria-label="구독 아이템 추가 페이지로 이동">
          <Button className="flex w-16 h-16 rounded-full shadow-lg items-center justify-center">
            <Plus size={48} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

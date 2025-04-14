'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import { Input } from '#components/_common/Input'
import { KNOWN_SERVICES } from '#constants/knownServices'
import { Button } from '#components/_common/Button'
import { Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useSearchStore } from '#stores/subscriptions/useSearchStore'
import SearchResults from './searchResults'
import { useMutation } from '@tanstack/react-query'
import { searchService } from '#apis/subscriptiponAPI'
import { useServiceStore } from '#stores/subscriptions/useServiceStore'
import { ServiceItem, allServices } from '#types/subscription'
import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'

export default function Page() {
  const { setSelectedService } = useServiceStore()
  const { searchQuery, setSearchQuery, setSearchResults, setIsSearching } =
    useSearchStore()
  const router = useRouter()

  const searchMutation = useMutation({
    mutationFn: (serviceName: string) => searchService(serviceName),
    onSuccess: (res) => {
      if (res.data) {
        setSearchResults(res.data)
        setIsSearching(false)
      }
    },
    onError: (error) => {
      console.error('검색 실패', error)
      setSearchResults([])
      setIsSearching(false)
    },
  })

  const handleCardClick = (service: ServiceItem) => {
    const selectedService = {
      ...service,
      iconUrl: service.iconUrl ?? '',
      title: service.name,
    }
    setSelectedService(selectedService)
    useSubscriptionStore.getState().setSubscriptionData({
      title: service.name,
      subscription: service.id,
    })
    router.push('add/detail')
  }
  return (
    <div className="flex flex-col m-4 ">
      <div className="flex flex-col items-center justify-center py-5 ">
        <h1 className="flex flex-row mt-8 mb-1 text-3xl font-bold text-center ">
          구독 서비스 선택
        </h1>
        <div className="w-full max-w-lg" onClick={() => searchMutation.reset()}>
          <form
            className="mt-5 flex flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim().length > 0) {
                setIsSearching(true)
                searchMutation.mutate(searchQuery)
              }
            }}
          >
            <Input
              name="search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="사용 중인 구독 서비스 검색"
              className="py-1.5 w-full"
            />
            <Button type="submit" className="ml-2" aria-label="검색 버튼">
              <Search />
            </Button>
          </form>
        </div>
      </div>

      {searchQuery.trim().length > 0 ? (
        <SearchResults
          // searchMutation={searchMutation}
          handleCardClick={(service: ServiceItem) => handleCardClick(service)}
          allServices={allServices}
        />
      ) : (
        <div className="grid mb-4 gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {allServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleCardClick(service)}
              className="dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700 min-h-[5.5rem]
        flex content-center justify-evenly items-center rounded-lg flex-col px-16 py-4 sm:py-3 border border-[rgba(0,0,0,0.2)] cursor-pointer"
            >
              <Link href={PATH.addDetail}>
                <div className="flex flex-col items-center">
                  {service.iconUrl ? (
                    <div
                      className={clsx(
                        'mb-2 flex items-center justify-center w-[2rem] h-[3rem]',
                        {
                          'bg-gray-300': !service.iconUrl,
                        },
                      )}
                      style={{
                        backgroundImage: service.iconUrl
                          ? `url(${service.iconUrl})`
                          : 'none',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}
                    />
                  ) : (
                    <Plus
                      className="mb-4"
                      aria-label="구독 내용 직접 입력하기"
                      size={20}
                      strokeWidth={3}
                    />
                  )}
                  <h2 className="text-center text-sm dark:text-white items-center font-medium whitespace-nowrap">
                    {service.name}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

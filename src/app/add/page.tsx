'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { Input } from '#components/_common/Input'
import { KNOWN_SERVICES } from '#constants/knownServices'
import { Button } from '#components/_common/Button'
import { Plus, Search } from 'lucide-react'
import { useServiceStore, ServiceStore } from '#stores/useServiceStore'
import { useRouter } from 'next/navigation'

export const allServices = [
  {
    id: 'custom',
    name: '',
    iconUrl: (
      <Plus
        className="mb-2"
        aria-label="구독 내용 직접 입력하기"
        size={20}
        strokeWidth={3}
      />
    ),
    href: 'add/detail',
    isCustom: true,
  },
  ...KNOWN_SERVICES.map((service) => ({
    id: service.id,
    name: service.name,
    iconUrl: (
      <Image
        src={service.iconUrl}
        className="mb-2"
        alt={service.name}
        width={20}
        height={20}
      />
    ),
    href: `add/detail`,
    isCustom: false,
  })),
]

export default function Page() {
  const { setSelectedService } = useServiceStore()
  const router = useRouter()

  useEffect(() => {
    if (!router) {
      console.error('Router is not available')
    }
  }, [router])

  const handleCardClick = (service: ServiceStore) => {
    setSelectedService(service);
    router.push(service.href);
  };

  return (
    <div className="flex flex-col h-full m-4">
      <div className="flex flex-col flex-1 items-center justify-center p-6">
        <h1 className="flex flex-row mt-8 mb-1 text-3xl font-bold text-center ">
          구독 서비스 선택
        </h1>
        <div className="w-full max-w-lg">
          <form className="mt-5 flex flex-row">
            <Input
              name="id"
              type="search"
              placeholder="사용 중인 구독 서비스 검색"
              className="py-1.5 w-full"
            />
            <Button type="submit" className="ml-2">
              <Search />
            </Button>
          </form>
        </div>
      </div>

      <div className="grid mb-8 gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {allServices.map((service) => (
          <div
            key={service.id}
            onClick={() => handleCardClick(service)}
            className="dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700 min-h-[5.5rem]
        flex content-center justify-evenly items-center rounded-lg flex-col px-16 py-4 sm:py-3 border border-[rgba(0,0,0,0.2)] cursor-pointer"
          >
            <Link href={service.href}>
              <div className="flex flex-col items-center">
                {service.iconUrl}
                <h2 className="text-center text-sm dark:text-white items-center font-medium whitespace-nowrap">
                  {service.name}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useSearchStore } from '#stores/subscriptions/useSearchStore'
import Link from 'next/link'
import clsx from 'clsx'
import { allServices } from '#types/subscription'
import { PATH } from '#app/routes'
import { KNOWN_SERVICES } from '#constants/knownServices'
import { serviceNameLabels } from '#types/subscription'

//import { useRouter } from 'next/navigation'

type ServiceItem = (typeof allServices)[number]

export default function SearchResults({
  handleCardClick,
  allServices,
}: {
  handleCardClick: (service: ServiceItem) => void
  allServices: ServiceItem[]
  // handleCardClick: (service: typeof KNOWN_SERVICES[number]) => void
  //handleCardClick: (service: (typeof KNOWN_SERVICES)[0]) => void
}) {
  const { searchResults } = useSearchStore()

  if (searchResults.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">검색 결과가 없습니다.</p>
    )
  }

  // const router = useRouter()

  // const searchCardClick = (service: ServiceItem) => {
  //   const selectedService = {
  //     ...service,
  //     iconUrl: service.iconUrl,
  //     title: service.name,
  //   }
  //   handleCardClick(selectedService)
  //   router.push('add/detail')
  // }

  return (
    <div className="grid mb-4 gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
      {searchResults.map((service) => {
        const matched = KNOWN_SERVICES.find((s) => {
          const localizedName =
            serviceNameLabels[s.id as keyof typeof serviceNameLabels]
          return localizedName === service.name
        })
        // const matched = KNOWN_SERVICES.find((s) => s.id === service.id)

        const fullService: ServiceItem = {
          ...service,
          iconUrl: matched?.iconUrl,
          name: matched?.name ?? service.name,
          // isCustom: matched?.isCustom ?? true,
        }
        console.log(
          '서비스 이름:',
          fullService.name,
          '| 아이콘 url:',
          fullService.iconUrl,
          '| matched 아이콘:',
          matched?.iconUrl,
        )
        console.log(
          '🧾 allServices 목록:',
          allServices.map((s) => s.name),
        )
        console.log('searchResult ID:', service.id)
        console.log('matched iconUrl:', matched?.iconUrl)

        return (
          <div
            key={`${service.id}-${service.name}`}
            onClick={() => handleCardClick(fullService)}
            className="dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700 min-h-[5.5rem]
      flex content-center justify-evenly items-center rounded-lg flex-col px-16 py-4 sm:py-3 border border-[rgba(0,0,0,0.2)] cursor-pointer"
          >
            <Link href={PATH.addDetail}>
              <div className="flex flex-col items-center">
                {fullService.iconUrl && (
                  <div
                    className={clsx(
                      'mb-2 flex items-center justify-center w-[2rem] h-[3rem]',
                    )}
                    style={{
                      backgroundImage: `url(${fullService.iconUrl})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />
                )}

                <h2 className="text-center text-sm dark:text-white items-center font-medium whitespace-nowrap">
                  {fullService.name}
                </h2>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

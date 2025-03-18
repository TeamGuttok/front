import { useSearchStore } from '#stores/subscriptions/useSearchStore'
import { KNOWN_SERVICES } from '#constants/knownServices'
import Link from 'next/link'
import clsx from 'clsx'

export default function SearchResults({
  handleCardClick,
}: {
  handleCardClick: (service: (typeof KNOWN_SERVICES)[0]) => void
}) {
  const { searchResults } = useSearchStore()

  if (searchResults.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">검색 결과가 없습니다.</p>
    )
  }

  return (
    <div className="grid mb-4 gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
      {searchResults.map((service: ServiceStores) => (
        <div
          key={service.id}
          onClick={() => handleCardClick(service)}
          className="dark:bg-gray-800 bg-white hover:bg-slate-200 hover:dark:bg-gray-700 min-h-[5.5rem]
            flex content-center justify-evenly items-center rounded-lg flex-col px-16 py-4 sm:py-3 border border-[rgba(0,0,0,0.2)] cursor-pointer"
        >
          <Link href="add/detail">
            <div className="flex flex-col items-center">
              {service.iconUrl && (
                <div
                  className={clsx(
                    'mb-2 flex items-center justify-center w-[2rem] h-[3rem]',
                    {
                      'bg-gray-300': !service.iconUrl,
                    },
                  )}
                  style={{
                    backgroundImage: `url(${service.iconUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
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
  )
}

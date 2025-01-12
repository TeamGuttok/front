import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { KNOWN_SERVICES } from '#constants/knownServices';

export default function Page() {

  const titles = ['직접 입력하기', 'Spotify', 'Netflix', 'Youtube Premium', 'Apple Music', 'Disney+', 'Xbox Game Pass', '밀리의 서재', '짐패스'];

  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-col flex-1 items-center  justify-center p-6">
        <h1 className="flex flex-row mt-8 mb-1 text-4xl font-bold text-center">구독 서비스 선택</h1>
        <div className="w-full max-w-lg">
          <form className="mt-5 sm:flex sm:items-center">
            <input id="q" name="q" className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="사용 중인 구독 서비스 검색" type="search" />
            <button
              type="submit"
              className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-[rgba(41,95,152,0.8)] px-8 py-2 font-medium
              text-white shadow-sm hover:bg-[rgba(41,95,152,0.86)] focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:text-sm whitespace-nowrap w-full sm:w-[4rem] sm:h-[2rem]"
            >
              검색
            </button>
          </form>
        </div>
      </div>

      <Link href="add/detail"></Link>
      <div className="grid mb-8 justify-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {titles.map((title, index) => (
          <Link href={`/item/add/detail`} key={index}>
            <Card
              key={index}
              className="flex rounded-lg h-full dark:bg-gray-800 bg-white flex-col px-16 py-4 sm:py-3 border border-[rgba(0,0,0,0.2)]"
            >
              <div className="flex flex-col items-center justify-center">
                <div
                  className="flex flex-col mb-3 w-8 h-8 mr-3 items-center justify-center rounded-full bg-[rgba(41,95,152,0.8)] text-white flex-shrink-0"
                ></div>
                <h2 className="text-sm dark:text-white font-medium">{title}</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow"></div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


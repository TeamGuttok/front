// /

import Link from 'next/link'

export default function Page() {

  const titles = ['직접 입력하기', 'Spotify', 'Netflix', 'Youtube Premium', 'Apple Music', 'Disney+', 'Xbox Game Pass', '밀리의 서재', '짐패스'];

  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-col flex-1 items-center justify-center p-6">
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
            <div
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
            </div>
          </Link>

        ))}

      </div>
    </div>
  )
}

// TODO
// [ ] 모바일에서 직접 입력하기만 큰 아이템으로 보이게 하기
// [ ] 검색 버튼 아이콘으로 수정
// [ ] 검색 버튼 모바일에서는 full
// [ ] 아이템 내 글자들 가운데 정렬 
// [ ] 모바일에서 2열로 나오기 (지금 1열)
// [ ] 다크테마 border color 지정
// [ ] 자주 사용되는 컬러들 global.css 작성 (rgba(41,95,152,0.8), hover 했을 때, border color 색깔)
// [ ]  placeholder 문구 변경
// [ ] 아이템 더블클릭 시 /item/add/detail 페이지로 이동 
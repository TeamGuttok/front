'use client'

import useTheme from '#contexts/ThemeProvider/hook'

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="">
      <div className="bg-gray-50 min-h-screen">
        <div className="overflow-hidden bg-gray-100">
          {/* <div className="flex animate-marquee space-x-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="w-40 h-20 bg-primary text-white flex items-center justify-center rounded-md shadow-md"
              >
                Item {idx + 1}
              </div>
            ))}
          </div> */}
        </div>

        <div className="px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              구독을 똑똑하게
            </h1>
            <p className="text-gray-600 mb-6">
              스마트한 구독 관리를 위한 최고의 선택
            </p>
            <div className="space-x-4">
              <button className="px-6 py-2 bg-primary text-white rounded-md shadow hover:bg-blue-700">
                회원가입
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md shadow hover:bg-gray-300">
                로그인
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center"></div>
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                구독비 절약
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                불필요한 구독을 찾아 절약하세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center"></div>
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                알림 서비스
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                갱신일에 맞춰 알림을 받아보세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center"></div>
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                캘린더 제공
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                결제 일정에 맞춘 캘린더를 제공합니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center"></div>
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                그룹 공유
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                다양한 사람들과 구독 서비스를 공유하세요
              </p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        테마
      </button>
    </div>
  )
}

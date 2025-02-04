import Link from 'next/link'
import { PATH } from '#app/routes'
import { Settings, ToggleLeft, ToggleRight } from 'lucide-react'
import CardTitle from '#components/_common/CardTitle'
import { Button } from '#components/_common/Button'
//import useTheme from '#contexts/ThemeProvider/hook'

export default function MyPage() {
  //const { theme, setTheme } = useTheme()

  return (
    <CardTitle>
      <div className="flex flex-col items-center w-full mt-5">
        <h2 className="text-3xl sm:text-3xl font-bold">마이페이지</h2>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <div className="w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">프로필 정보</p>
          <div>
            <Link
              href={PATH.mypageEdit}
              aria-label="마이페이지 수정 페이지로 이동"
            >
              <button>
                <Settings
                  className="w-[2rem] h-[2rem] text-gray-500"
                  aria-label="수정 아이콘"
                />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">닉네임</p>
          <div>구똑</div>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">이메일</p>
          <div>email@example.com</div>
        </div>
      </div>
      <hr />
      <div className="w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">알림 설정</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">이메일 결제 리마인드</p>
          <div>
            <ToggleLeft
              aria-label="이메일 결제 리마인드 동의"
              className="w-[2.5rem] h-[2.5rem] fill-[hsl(var(--primary))] strokeWidth={0} stroke-[hsl(var(--background))]"
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">시스템 설정</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">다크모드</p>
          <div>
            <ToggleRight
              aria-label="다크모드 버튼 아이콘"
              className="w-[2.5rem] h-[2.5rem] fill-[hsl(var(--primary))] strokeWidth={0} stroke-[hsl(var(--background))]"
            />
            {/* <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <ToggleRight aria-label="다크모드 버튼 아이콘" size={20} />
              ) : (
                <ToggleLeft aria-label="라이트모드 버튼 아이콘" size={20} />
              )} */}
            {/* </button> */}
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <Button className="bg-red-400 hover:bg-red-500">
            <span>탈퇴하기</span>
          </Button>
        </div>
      </div>
    </CardTitle>
  )
}

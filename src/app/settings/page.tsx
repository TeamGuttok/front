import Link from 'next/link'
import { PATH } from '#app/routes'
import RemindSwitch from './RemindSwitch'

export default function MyPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full mt-5">
        <h2 className="text-xl sm:text-3xl font-bold">마이페이지</h2>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <div className="w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">프로필 정보</p>
          <Link
            href={PATH.myPageEdit}
            className="flex items-center px-3 h-8 rounded-2xl bg-primary text-primary-foreground text-sm"
          >
            정보 수정
          </Link>
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

      <div className="w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">알림 설정</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">납부 리마인드</p>
          <RemindSwitch initialChecked={true} />
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import { Settings, ToggleLeft, ToggleRight } from 'lucide-react'
import CardTitle from '#components/_common/CardTitle'
import { Button } from '#components/_common/Button'
import { useEffect, useState } from 'react'
import { useMyPageStore } from './edit/mypageAction'
import { useAuthStore } from '#stores/auth/useAuthStore'
import useTheme from '#contexts/ThemeProvider/hook'
import { useRouter } from 'next/navigation'
import { useToggleAlarmMutation } from '#apis/notiClient'

export default function MyPage() {
  const { fetchProfile } = useMyPageStore()
  const { isLoggedIn, user, setUser, logout } = useAuthStore()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { mutate: toggleAlarm, isPending: isTogglingAlarm } =
    useToggleAlarmMutation()
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [setUser, router, isLoggedIn, fetchProfile])

  if (!isLoggedIn) return null

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
          <div>{user.nickName}</div>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">이메일</p>
          <div>{user.email}</div>
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
            <button onClick={() => toggleAlarm()} disabled={isTogglingAlarm}>
              {user.alarm ? (
                <ToggleLeft
                  aria-label="이메일 결제 리마인드 동의"
                  className="w-[3rem] h-[3rem] fill-[hsl(var(--primary))] strokeWidth={0} stroke-[hsl(var(--background))]"
                />
              ) : (
                <ToggleRight
                  aria-label="이메일 결제 리마인드 미동의"
                  className="w-[3rem] h-[3rem] fill-[hsl(var(--primary))] strokeWidth={0} stroke-[hsl(var(--background))]"
                />
              )}
            </button>
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
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
              <ToggleRight
                aria-label="다크모드 버튼 아이콘"
                className="w-[3rem] h-[3rem] fill-[hsl(var(--primary))] strokeWidth={0} stroke-[hsl(var(--background))]"
              />
            ) : (
              <ToggleLeft
                aria-label="라이트모드 버튼 아이콘"
                className="w-[3rem] h-[3rem] fill-[hsl(var(--primary))] strokeWidth={0} stroke-[hsl(var(--background))]"
              />
            )}
          </button>
        </div>

        <div className="flex justify-end mt-3">
          <Button
            //onClick={() => signOut()}
            //disabled={isLoggingOut}
            className="primary hover:[hsl(var(--primary-hover))]"
          >
            {/* <span> {isLoggingOut ? '로그아웃 중...' : '로그아웃'}</span> */}
            로그아웃
          </Button>
          <Button
            onClick={() => setShowDeleteDialog(true)}
            className="bg-red-400 hover:bg-red-500 ml-4"
          >
            <span>탈퇴하기</span>
          </Button>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="mb-4 dark:text-black">정말 탈퇴하시겠습니까?</p>
            <div className="flex justify-end space-x-4">
              <Button onClick={() => setShowDeleteDialog(false)}>아니오</Button>
              <Button
                // onClick={() => deleteAccount()}
                // disabled={isDeletingAccount}
                className="bg-red-400 hover:bg-red-500"
              >
                예
              </Button>
            </div>
          </div>
        </div>
      )}
    </CardTitle>
  )
}

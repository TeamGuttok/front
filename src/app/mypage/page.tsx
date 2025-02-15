'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import { Settings, ToggleLeft, ToggleRight } from 'lucide-react'
import CardTitle from '#components/_common/CardTitle'
import { Button } from '#components/_common/Button'
import { useEffect, useState } from 'react'
import { useMyPageStore } from './edit/mypageAction'
import { useAuthStore } from '#stores/auth/useAuthStore'
import Fetcher from '#apis/common/fetcher'

export default function MyPage() {
  const { nickName, fetchProfile } = useMyPageStore()
  const { user } = useAuthStore()
  const email = user?.email

  const [alarm, setAlarm] = useState<boolean>(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const fetcher = new Fetcher()

  const handleToggleAlarm = async () => {
    try {
      await fetcher.patch('/api/users/alarm', {})
      setAlarm((prev) => !prev)
    } catch (error) {
      console.error('알림 설정 변경 실패', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await fetcher.delete('/api/users')
    } catch (error) {
      console.error('회원 탈퇴 실패', error)
    }
  }

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
          <div>{nickName}</div>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">이메일</p>
          <div>{email}</div>
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
            <button onClick={handleToggleAlarm}>
              {alarm ? (
                <ToggleLeft
                  aria-label="이메일 결제 리마인드 동의"
                  className="w-[2.5rem] h-[2.5rem] fill-[hsl(var(--primary))]"
                />
              ) : (
                <ToggleRight
                  aria-label="이메일 결제 리마인드 미동의"
                  className="w-[2.5rem] h-[2.5rem] fill-[hsl(var(--primary))]"
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
              )} 
               </button>
               */}
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <Button
            onClick={() => setShowDeleteDialog(true)}
            className="bg-red-400 hover:bg-red-500"
          >
            <span>탈퇴하기</span>
          </Button>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="mb-4">정말 탈퇴하시겠습니까?</p>
            <div className="flex justify-end space-x-4">
              <Button onClick={() => setShowDeleteDialog(false)}>아니오</Button>
              <Button
                onClick={handleDeleteAccount}
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

'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import { Settings } from 'lucide-react'
import CardTitle from '#components/_common/CardTitle'
import { Button } from '#components/_common/Button'
import { useState, useEffect } from 'react'
import { useAuthStore } from '#stores/auth/useAuthStore'
import useTheme from '#contexts/ThemeProvider/hook'
import { useToggleAlarmMutation } from '#apis/notiClient'
import { useMyProfileQuery, useDeleteUser } from '#apis/userClient'
import { ConfirmDialog } from '#components/ui/ConfirmDialog'
import { useHandleLogout } from '#hooks/useHandleLogout'
import { cn } from '#components/lib/utils'
import { getMenuClassName } from '#style/style'
import { useRouter } from 'next/navigation'
import { toast } from '#hooks/useToast'
import { Switch } from '#components/_common/Switch'

export default function ClientMypage() {
  const router = useRouter()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const {
    data: getMypage,
    isError: isProfileError,
    refetch,
  } = useMyProfileQuery({
    enabled: isLoggedIn,
  })
  const { mutate: deleteAccount, isPending: isDeletingAccount } =
    useDeleteUser()
  const { mutate: toggleAlarm, isPending: isTogglingAlarm } =
    useToggleAlarmMutation()

  const { theme, setTheme } = useTheme()

  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
  const handleLogout = useHandleLogout()

  // TODO
  // [ ] 미들웨어 연결 후 삭제 (for SEO)
  // useEffect(() => {
  //   if (!isLoggedIn || isProfileError) {
  //     router.push(PATH.login)
  //   }
  // }, [isLoggedIn, isProfileError, router])

  return (
    <CardTitle className="mx-auto lg:mt-10 p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex flex-col items-center w-full">
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
          <div>{getMypage?.nickName}</div>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">이메일</p>
          <div>{getMypage?.email}</div>
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
            <Switch
              aria-label="이메일 알림 수신 여부 설정 토글"
              checked={getMypage?.alarm}
              onCheckedChange={() =>
                toggleAlarm(undefined, {
                  onSuccess: async () => {
                    await refetch()
                    const willSubscribe = !getMypage?.alarm
                    toast({
                      description: willSubscribe
                        ? '이메일 알림 수신을 받습니다.'
                        : '이메일 알림 수신을 받지 않습니다.',
                      variant: 'default',
                    })
                  },
                  onError: () => {
                    toast({
                      description:
                        '이메일 수신 여부 변경 중 오류가 발생했습니다.',
                      variant: 'destructive',
                    })
                  },
                })
              }
              disabled={isTogglingAlarm}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full p-5 ">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">시스템 설정</p>
        </div>
        <div className="flex justify-between mb-8">
          <p className="text-gray-600">다크모드</p>
          <Switch
            aria-label="다크모드 설정 토글"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => {
              const newTheme = checked ? 'dark' : 'light'
              setTheme(newTheme)

              toast({
                description: checked
                  ? '다크 모드로 전환되었습니다.'
                  : '라이트 모드로 전환되었습니다.',
              })
            }}
          />
        </div>

        <div className="flex justify-end mt-3 mb-9">
          <Button
            onClick={() => setShowLogoutDialog(true)}
            className={cn(getMenuClassName())}
          >
            <span className="text-white">로그아웃</span>
          </Button>
          <ConfirmDialog
            open={showLogoutDialog}
            onOpenChange={setShowLogoutDialog}
            title="로그아웃 하시겠습니까?"
            onConfirm={handleLogout}
          />

          <Button
            onClick={() => setShowDeleteDialog(true)}
            className="bg-red-400 hover:bg-red-500 ml-4"
            disabled={isDeletingAccount}
          >
            <span>탈퇴하기</span>
          </Button>
        </div>
      </div>
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="정말 탈퇴하시겠습니까?"
        description="탈퇴하시면 계정과 기록이 모두 삭제됩니다."
        onConfirm={() =>
          deleteAccount(undefined, {
            onSuccess: () => {
              toast({
                description: '계정이 성공적으로 삭제되었습니다.',
                variant: 'default',
              })
            },
            onError: () => {
              toast({
                description: '계정 삭제 중 오류가 발생했습니다.',
                variant: 'destructive',
              })
            },
          })
        }
      />
    </CardTitle>
  )
}

'use client'

import useTheme from '#contexts/ThemeProvider/hook'
import Link from 'next/link'
import {
  Menu,
  Calendar,
  Users,
  Bell,
  User,
  LogIn,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { useAuthStore } from '#stores/auth/useAuthStore'

export default function SideBar({ pathname }: { pathname: string }) {
  const { theme, setTheme } = useTheme()
  
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const logout = useAuthStore((state) => state.logout)
  // const isLoggedIn = useAuthStore((state) => !!state.user?.session)
  // const [logoutState, handleLogout, isLogoutPending] = useActionState(
  //   logoutAction,
  //   null,
  // )
  const itemClassName =
    'flex items-center gap-2 p-3 text-sub hover:text-primary rounded-md'

  // const handleConfirmLogout = () => {
  //   handleLogout()
  // }

  return (
    <aside className="fixed flex z-50 flex-col w-56 h-screen p-5 bg-secondary shadow-sm mb-5">
      <span className="px-2 mb-5 text-[1.5rem] font-bold">
        <Link href="/">구똑</Link>
      </span>

      <nav className="grow">
        <ul>
          <li>
            <Link
              href={PATH.listView}
              className={cn(
                itemClassName,
                pathname === PATH.listView && 'bg-accent',
              )}
            >
              <Menu aria-label="리스트 뷰 아이콘" size={20} />
              <span>리스트 뷰</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.calendarView}
              className={cn(
                itemClassName,
                pathname === PATH.calendarView && 'bg-accent',
              )}
            >
              <Calendar aria-label="캘린더 뷰 아이콘" size={20} />
              <span>캘린더 뷰</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.group}
              className={cn(
                itemClassName,
                pathname === PATH.group && 'bg-accent',
              )}
            >
              <Users aria-label="그룹 아이콘" size={20} />
              <span>그룹</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.notification}
              className={cn(
                itemClassName,
                pathname === PATH.notification && 'bg-accent',
              )}
            >
              <Bell aria-label="알림 아이콘" size={20} />
              <span>알림</span>
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="justify-self-end">
        <ul>
          <li>
            <button
              className={cn(itemClassName)}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Moon aria-label="다크모드 버튼 아이콘" size={20} />
              ) : (
                <Sun aria-label="라이트모드 버튼 아이콘" size={20} />
              )}
              <span>테마</span>
            </button>
          </li>
          <li>
            <Link
              href={PATH.mypage}
              className={cn(
                itemClassName,
                pathname === PATH.mypage && 'bg-accent',
              )}
            >
              <User aria-label="마이페이지 아이콘" size={20} />
              <span>마이페이지</span>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className={cn(itemClassName)}
                  >
                    <LogOut aria-label="로그아웃 아이콘" size={20} />
                    <span>로그아웃</span>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md">
                    <Dialog.Title className="mb-4 text-lg font-medium dark:text-black">
                      로그아웃 하시겠습니까?
                    </Dialog.Title>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        예
                      </button>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-300 rounded-md"
                        >
                          아니오
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </li>
          ) : (
            <li>
              <Link
                href={PATH.login}
                className={cn(
                  itemClassName,
                  pathname === PATH.login && 'bg-accent',
                )}
              >
                <LogIn aria-label="로그인 아이콘" size={20} />
                <span>로그인</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  )
}

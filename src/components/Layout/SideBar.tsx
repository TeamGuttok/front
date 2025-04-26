'use client'

import useTheme from '#contexts/ThemeProvider/hook'
import Link from 'next/link'
import { Menu, Bell, User, LogIn, LogOut, Moon, Sun } from 'lucide-react'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { getMenuClassName } from '#style/style'
import { useState } from 'react'
import { ConfirmDialog } from '#components/ui/ConfirmDialog'
import { useHandleLogout } from '#hooks/useHandleLogout'

export default function SideBar({ pathname }: { pathname: string }) {
  const { theme, setTheme } = useTheme()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const handleLogout = useHandleLogout()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

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
                getMenuClassName(),
                pathname === PATH.listView && 'bg-accent',
              )}
            >
              <Menu aria-label="리스트 뷰 아이콘" size={20} />
              <span>목록</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.notification}
              className={cn(
                getMenuClassName(),
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
              className={cn(getMenuClassName())}
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
                getMenuClassName(),
                pathname === PATH.mypage && 'bg-accent',
              )}
            >
              <User aria-label="마이페이지 아이콘" size={20} />
              <span>마이페이지</span>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button
                type="button"
                onClick={() => setShowLogoutDialog(true)}
                className={cn(getMenuClassName())}
              >
                <LogOut aria-label="로그아웃 아이콘" size={20} />
                <span>로그아웃</span>
              </button>
              <ConfirmDialog
                onConfirm={handleLogout}
                open={showLogoutDialog}
                onOpenChange={setShowLogoutDialog}
                title="로그아웃 하시겠습니까?"
              />
            </li>
          ) : (
            <li>
              <Link
                href={PATH.login}
                className={cn(
                  getMenuClassName(),
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

'use client'

import useTheme from '#contexts/ThemeProvider/hook'

import Link from 'next/link'
import { Menu, Calendar, Users, Bell, User, LogIn } from 'lucide-react'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'

export default function SideBar({ pathname }: { pathname: string }) {
  const { theme, setTheme } = useTheme()
  const itemClassName =
    'flex items-center gap-2 p-3 text-sub hover:text-primary rounded-md'

  return (
    <aside className="fixed flex z-50 flex-col w-56 h-screen p-5 bg-secondary shadow-sm">
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
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              테마
            </button>
          </li>
          <li>
            <Link
              href={PATH.myPage}
              className={cn(
                itemClassName,
                pathname === PATH.myPage && 'bg-accent',
              )}
            >
              <User aria-label="마이페이지 아이콘" size={20} />
              <span>마이페이지</span>
            </Link>
          </li>
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
        </ul>
      </nav>
    </aside>
  )
}

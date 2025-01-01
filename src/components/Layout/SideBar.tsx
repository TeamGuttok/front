import Link from 'next/link'
import { Menu, Calendar, Users, Bell, User, LogIn } from 'lucide-react'
import { PATH } from '#app/routes'

export default function SideBar() {
  return (
    <aside className="hidden sm:flex z-50 flex-col w-56 h-screen p-5 bg-secondary shadow-sm">
      <span className="px-2 mb-5 text-[1.5rem] font-bold">
        <Link href="/">구똑</Link>
      </span>

      <nav className="grow">
        <ul>
          <li>
            <Link
              href={PATH.listView}
              className="flex items-center gap-2 p-3 text-sub hover:text-primary"
            >
              <Menu aria-label="리스트 뷰 아이콘" size={20} />
              <span>리스트 뷰</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.calendarView}
              className="flex items-center gap-2 p-3 text-sub hover:text-primary"
            >
              <Calendar aria-label="캘린더 뷰 아이콘" size={20} />
              <span>캘린더 뷰</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.group}
              className="flex items-center gap-2 p-3 text-sub hover:text-primary"
            >
              <Users aria-label="그룹 아이콘" size={20} />
              <span>그룹</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.notification}
              className="flex items-center gap-2 p-3 text-sub hover:text-primary"
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
            <Link
              href={PATH.myPage}
              className="flex items-center gap-2 p-3 text-sub hover:text-primary"
            >
              <User aria-label="마이페이지 아이콘" size={20} />
              <span>마이페이지</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.login}
              className="flex items-center gap-2 p-3 text-sub hover:text-primary"
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

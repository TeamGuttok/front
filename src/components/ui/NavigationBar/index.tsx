import Link from 'next/link'
import { House, User, Bell } from 'lucide-react'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'
import { usePathname } from 'next/navigation'
import { getMobileIconClassName } from '#style/style'

export default function NavigationBar() {
  const pathname = usePathname()

  return (
    <footer className="fixed z-50 bottom-0 w-full h-[4.5rem] bg-secondary">
      <nav className="h-full">
        <ul className="flex justify-evenly items-center h-full">
          <li>
            <Link
              href={PATH.notification}
              className={cn(
                getMobileIconClassName(),
                pathname === PATH.notification && 'text-foreground',
              )}
            >
              <Bell aria-label="알림 아이콘" size={20} />
              <span>알림</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={cn(
                getMobileIconClassName(),
                pathname === PATH.main && 'text-foreground',
              )}
            >
              <House aria-label="홈 아이콘" />
              <span>홈</span>
            </Link>
          </li>
          <li>
            <Link
              href={PATH.mypage}
              className={cn(
                getMobileIconClassName(),
                pathname === PATH.mypage && 'text-foreground',
              )}
            >
              <User aria-label="마이페이지 아이콘" />
              <span>마이페이지</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

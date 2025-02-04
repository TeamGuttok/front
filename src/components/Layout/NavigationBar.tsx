import Link from 'next/link'
import { House, User, Users } from 'lucide-react'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'

export default function NavigationBar({ pathname }: { pathname: string }) {
  const itemClassName = 'flex flex-col items-center gap-1 w-24 text-gray-400'

  return (
    <footer className="fixed z-50 bottom-0 w-full h-[4.5rem] bg-secondary">
      <nav className="h-full">
        <ul className="flex justify-evenly items-center h-full">
          <li>
            <Link
              href={PATH.group}
              className={cn(
                itemClassName,
                pathname === PATH.group && 'text-foreground',
              )}
            >
              <Users aria-label="그룹 아이콘" />
              <span>그룹</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={cn(
                itemClassName,
                pathname === '/' && 'text-foreground',
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
                itemClassName,
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

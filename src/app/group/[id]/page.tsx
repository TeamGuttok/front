import Link from 'next/link'
import { Crown, Settings, User } from 'lucide-react'
import { cn } from '#components/lib/utils'
import { PATH } from '#app/routes'

export default async function GroupDetail({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const groupId = (await params).id
  const leaderBgColor = 'bg-primary/80'
  const leaderIconColor = 'text-primary-foreground'

  const isLeader = true

  return (
    <>
      <div className="relative space-y-3 px-5 py-4 bg-secondary rounded-2xl shadow-sm">
        <h3 className="font-semibold">구독 정보</h3>

        <div>
          <p className="text-lg">넷플릭스 프리이엄 4인</p>
          <p className="text-xl font-semibold">17,000원/월</p>
        </div>
        <p className="text-gray-500">다음 결제일: 2024년 2월 15일</p>

        <Link
          href={PATH.groupEdit(groupId)}
          className="absolute bottom-4 right-3 w-5 h-5 bg-transparent rounded-full"
          aria-label="그룹 설정"
        >
          <Settings
            className="w-full h-full text-gray-500"
            aria-label="그룹 설정 아이콘"
          />
        </Link>
      </div>

      <div className="relative space-y-4 px-5 py-4 bg-secondary rounded-2xl shadow-sm">
        <h3 className="font-semibold">참여자 목록 (2명)</h3>

        <div className="flex items-center gap-3 w-full">
          <div
            className={cn(
              'flex items-center justify-center w-12 h-12 bg-secondary-foreground rounded-full',
              leaderBgColor,
            )}
          >
            <Crown className={leaderIconColor} size={22} />
          </div>
          <div>
            <p className="font-semibold">김하율 (관리자)</p>
            <p className="text-sub">4,250원</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full">
          <div className="flex items-center justify-center w-12 h-12 bg-background rounded-full">
            <User size={22} />
          </div>
          <div>
            <p className="font-semibold">이영희</p>
            <p className="text-sub">4,250원</p>
          </div>
        </div>

        {isLeader && (
          <Link
            href={PATH.groupMember(groupId)}
            className="absolute bottom-4 right-3 w-5 h-5 bg-transparent rounded-full"
            aria-label="멤버 설정"
          >
            <Settings
              className="w-full h-full text-gray-500"
              aria-label="멤버 설정 아이콘"
            />
          </Link>
        )}
      </div>
    </>
  )
}

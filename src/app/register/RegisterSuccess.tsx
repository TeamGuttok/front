import Link from 'next/link'
import { Button } from '#components/_common/Button'

export default function RegisterSuccess({ nickname }: { nickname: string }) {
  return (
    <div className="flex flex-col items-center m-auto">
      <div className="flex flex-col gap-1 text-center text-2xl font-bold">
        <span>{nickname} 님,</span>
        <p>회원가입을 축하합니다!</p>
      </div>

      <div className="flex flex-col gap-1 mt-6 text-center text-lg font-medium text-sub">
        <p>관리의 새로운 시작,</p>
        <p>구똑과 함께 스마트한 구독 생활을 시작해 보세요</p>
      </div>

      <Link href={'/'} className="mt-8">
        <Button size="lg" className="rounded-lg">
          메인으로 가기
        </Button>
      </Link>
    </div>
  )
}

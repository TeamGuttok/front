import { Button } from '#components/_common/Button'
import Link from 'next/link'
import { PATH } from '#app/routes'

export interface ForgotPasswordSuccessProps {
  nickname: string
}

export default function ForgotPasswordSuccess({
  nickname,
}: ForgotPasswordSuccessProps) {
  return (
    <div className="w-full max-w-lg mt-10 px-10">
      <div className="flex flex-col gap-1 min-h-16">
        <p className="mt-6 text-center text-lg font-medium text-sub">
          {nickname} 님의 이메일으로 임시 비밀번호가 발송되었습니다.
        </p>
      </div>

      <Link href={PATH.login}>
        <Button
          type="submit"
          className="flex justify-self-center w-full h-10 text-md rounded-lg mt-6"
        >
          로그인
        </Button>
      </Link>
    </div>
  )
}

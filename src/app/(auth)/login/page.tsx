'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { loginAction } from './loginAction'
import { PATH } from '#app/routes'

export default function Login() {
  const [, handleSubmit, isPending] = useActionState(loginAction, null)

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full mt-5">
        <span className="text-3xl font-bold ">로그인</span>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <form
        action={handleSubmit}
        className="w-full space-y-6 max-w-lg mt-10 px-10"
      >
        <div className="flex items-center">
          <Label htmlFor="email" className="w-20">
            <span className="text-base font-medium">이메일</span>
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="이메일을 입력하세요"
            className="w-0 grow"
          />
        </div>

        <div className="flex items-center">
          <Label htmlFor="password" className="w-20">
            <span className="text-base font-medium">비밀번호</span>
          </Label>
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-0 grow"
          />
        </div>

        <Button
          type="submit"
          className="flex justify-self-center w-32 h-14 text-lg rounded-2xl"
          disabled={isPending}
        >
          로그인
        </Button>
      </form>
      <div className="sm:w-full h-[1px] bg-border mt-5"></div>

      <div className="flex justify-center items-center sm:mt-2">
        <Link href={PATH.forgotEmail}>
          <Button
            type="button"
            variant="ghost"
            className="text-sub hover:bg-transparent hover:text-sub-foreground"
          >
            이메일 찾기
          </Button>
        </Link>
        <span className="text-xs">|</span>
        <Link href={PATH.forgotPassword}>
          <Button
            type="button"
            variant="ghost"
            className="text-sub hover:bg-transparent hover:text-sub-foreground"
          >
            비밀번호 찾기
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <Link href={PATH.register}>
          <Button
            type="button"
            className="flex justify-self-center w-32 h-14 text-lg rounded-2xl"
          >
            회원 가입
          </Button>
        </Link>
      </div>
    </div>
  )
}

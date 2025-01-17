'use client'

import dynamic from 'next/dynamic'
import { useActionState } from 'react'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { Button } from '#components/_common/Button'
import { forgotPasswordAction } from './forgotPasswordAction'

const ForgotPasswordSuccess = dynamic(() => import('./ForgotPasswordSuccess'))

export default function ForgotPassword() {
  const [state, handleSubmit, isPending] = useActionState(
    forgotPasswordAction,
    null,
  )

  const formData = state?.formData
  const errors = state?.errors

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full mt-5">
        <span className="text-3xl font-bold ">비밀번호 찾기</span>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      {state?.isSuccess ? (
        <ForgotPasswordSuccess nickname={formData?.get('nickname') as string} />
      ) : (
        <form action={handleSubmit} className="w-full max-w-lg mt-10 px-10">
          <div className="flex flex-col gap-1 min-h-16">
            <div className="flex items-center">
              <Label htmlFor="nickname" className="w-20">
                <span className="text-base font-medium">닉네임</span>
              </Label>
              <Input
                name="nickname"
                placeholder="닉네임을 입력하세요"
                className="w-0 grow"
                defaultValue={formData?.get('nickname') as string}
              />
            </div>
            <ErrorMessage errors={errors?.nickname} className="ml-20" />
          </div>

          <div className="flex flex-col gap-1 min-h-16">
            <div className="flex items-center">
              <Label htmlFor="password" className="w-20">
                <span className="text-base font-medium">비밀번호</span>
              </Label>
              <Input
                name="password"
                placeholder="비밀번호를 입력하세요"
                className="w-0 grow"
                defaultValue={formData?.get('password') as string}
              />
            </div>
            <ErrorMessage errors={errors?.password} className="ml-20" />
          </div>

          <Button
            type="submit"
            className="flex justify-self-center w-full h-10 text-md rounded-lg mt-6"
            disabled={isPending}
          >
            인증번호 받기
          </Button>
        </form>
      )}
    </div>
  )
}

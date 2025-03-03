'use client'

import dynamic from 'next/dynamic'
import { useActionState } from 'react'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { Button } from '#components/_common/Button'
import { forgotEmailAction } from './forgotEmailAction'

const ForgotEmailSuccess = dynamic(() => import('../password/ForgotPasswordSuccess'))

export default function ForgotEmail() {
  const [state, handleSubmit, isPending] = useActionState(
    forgotEmailAction,
    null,
  )

  const formData = state?.formData
  const errors = state?.errors

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full mt-5">
        <span className="text-3xl font-bold ">이메일 찾기</span>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      {state?.data ? (
        <ForgotEmailSuccess
          nickName={state.data.nickName}
          email={state.data.email}
        />
      ) : (
        <form action={handleSubmit} className="w-full max-w-lg mt-10 px-10">
          <div className="flex flex-col gap-1 min-h-16">
            <div className="flex items-center">
              <Label htmlFor="nickname" className="w-20">
                <span className="text-base font-medium">닉네임</span>
              </Label>
              <Input
                name="nickName"
                placeholder="닉네임을 입력하세요"
                className="w-0 grow"
                defaultValue={formData?.get('nickName') as string}
              />
            </div>
            <ErrorMessage errors={errors?.nickname} className="ml-20" />
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

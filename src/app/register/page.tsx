'use client'

import dynamic from 'next/dynamic'
import { useActionState, useState } from 'react'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import RegisterInputField from './RegisterInputField'
import { registerAction } from './registerAction'
import { RegisterUser } from '#apis/auth/RegisterUser'
import Fetcher from '#apis/common/fetcher'
import { string } from 'zod'
import ForgotPassword from '#app/(auth)/forgot/password/page'

const RegisterSuccess = dynamic(() => import('./RegisterSuccess'))
const fetcher = new Fetcher()

export default function Register() {
  const [session, setSession] = useState<string>('')
  const [state, onSubmit, isPending] = useActionState(registerAction, null)
  if (state?.data) return <RegisterSuccess nickName={state.data.nickName} />

  const formData = state?.formData
  const errors = state?.errors

  function handleSubmit(payload: FormData) {
    payload.append('session', session)
    onSubmit(payload)
  }

  return (
    <div className="flex flex-col items-center sm:m-auto sm:-translate-y-12">
      <div className="w-full sm:w-[60vw] sm:max-w-[832px] sm:p-8 sm:rounded-md sm:border sm:border-border">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-full mt-5">
            <span className="text-3xl font-bold ">회원가입</span>
          </div>
          <div className="w-full h-[1px] bg-border mt-5"></div>

          <form
            action={handleSubmit}
            className="flex flex-col w-full max-w-lg mt-10 px-10"
          >
            <div className="flex flex-col gap-1 min-h-16">
              <div className="flex items-center">
                <Label htmlFor="nickname" className="w-14 mr-6">
                  <span className="text-base font-medium">닉네임</span>
                </Label>
                <Input
                  name="nickname"
                  placeholder="닉네임을 입력하세요"
                  className="w-0 grow"
                  //defaultValue={formData?.get('nickname') as string}
                />
              </div>
              <ErrorMessage errors={errors?.nickname} className="ml-20" />
            </div>

            <RegisterInputField
              defaultValue={formData?.get('email')?.toString() ?? ''}
              setSession={setSession}
            />

            <div className="flex flex-col gap-1 min-h-16">
              <div className="flex items-center">
                <Label htmlFor="password" className="w-[3.46rem] mr-6">
                  <span className="text-base font-medium">비밀번호</span>
                </Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-0 grow"
                  defaultValue={formData?.get('password') as string}
                />
              </div>
              <ErrorMessage errors={errors?.password} className="ml-20" />
            </div>

            <div className="flex flex-col gap-1 min-h-16">
              <div className="flex items-center">
                <Label
                  htmlFor="password-confirm"
                  className="w-[3.46rem] mr-6 text-center"
                >
                  <span className="text-base font-medium leading-5">
                    비밀번호 <br /> 확인
                  </span>
                </Label>
                <Input
                  name="password-confirm"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-0 grow"
                  defaultValue={formData?.get('password-confirm') as string}
                />
              </div>
              <ErrorMessage
                errors={errors?.passwordConfirm}
                className="ml-20"
              />
            </div>

            <ErrorMessage errors={errors?.session} />
            <Button
              type="submit"
              className="flex justify-self-center w-full h-10 text-md rounded-lg mt-10"
              disabled={isPending || session.length <= 0}
            >
              회원가입
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

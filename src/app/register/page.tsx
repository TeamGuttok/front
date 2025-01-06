'use client'

import { useActionState } from 'react'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { registerAction } from './registerAction'
import dynamic from 'next/dynamic'

const RegisterSuccess = dynamic(() => import('./RegisterSuccess'))

export default function Register() {
  const [state, handleSubmit, isPending] = useActionState(registerAction, null)

  if (state?.data) return <RegisterSuccess nickname={state.data.nickname} />
  const errors = state?.errors

  return (
    <div className="flex flex-col items-center sm:m-auto sm:-translate-y-12">
      <p className="hidden sm:block text-4xl mb-2">
        <span className="font-bold">구</span>독을{' '}
        <span className="font-bold">똑</span>똑하게
      </p>
      <p className="hidden sm:block text-lg text-sub mb-6">
        스마트한 구독 생활을 위한 최고의 선택
      </p>
      <div className="w-full sm:w-[60vw] sm:max-w-[832px] sm:p-8 sm:rounded-md sm:border sm:border-border">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-full mt-5">
            <span className="text-3xl font-bold ">회원가입</span>
          </div>
          <div className="w-full h-[1px] bg-border mt-5"></div>

          <form
            action={handleSubmit}
            className="flex flex-col w-full gap-y-6 max-w-lg mt-10 px-10"
          >
            <div className="flex justify-between gap-3">
              <div className="flex items-center grow">
                <Label htmlFor="nickname" className="w-14 mr-6">
                  <span className="text-base font-medium">닉네임</span>
                </Label>
                <Input
                  name="nickname"
                  placeholder="닉네임을 입력하세요"
                  className="w-0 grow"
                />
              </div>
              <Button type="button" className="rounded-lg">
                중복확인
              </Button>
            </div>

            <div className="flex items-center">
              <Label htmlFor="email" className="w-[3.46rem] mr-6">
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
              <Label htmlFor="password" className="w-[3.46rem] mr-6">
                <span className="text-base font-medium">비밀번호</span>
              </Label>
              <Input
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-0 grow"
              />
            </div>

            <div className="flex items-center">
              <Label
                htmlFor="password-confirm"
                className="w-[3.46rem] mr-6 text-center"
              >
                <span className="text-base font-medium">
                  비밀번호 <br /> 확인
                </span>
              </Label>
              <Input
                name="password-confirm"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-0 grow"
              />
            </div>

            <Button
              type="submit"
              className="flex justify-self-center w-full h-10 text-lg rounded-lg mt-5"
              disabled={isPending}
            >
              회원가입
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

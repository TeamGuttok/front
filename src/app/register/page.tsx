'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import RegisterInputField from './RegisterInputField'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { z } from 'zod'
import {BASE_URL} from '#constants/url'

const RegisterSuccess = dynamic(() => import('./RegisterSuccess'))

const registerSchema = z
  .object({
    nickName: z.string().min(1, '최소 1자 이상 입력해주세요.'),
    email: z.string().email('유효한 이메일 주소를 입력하세요.'),
    password: z
      .string()
      .min(
        12,
        '특수문자(@&!%*?&#), 영어 소문자를 포함한 12자 이상을 입력해주세요.',
      )
      .regex(
        /^(?=.*[a-z])(?=.*[@$!%*?&#]).{12,}$/,
        '특수문자(@$!%*?&#), 영어 소문자를 포함해주세요.',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.passwordConfirm.length > 0, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })

export default function Register() {
  const { user, setUser } = useAuthStore()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [error, setError] = useState<Record<string, string[]>>({})

  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          password: password,
          email: user?.email,
          nickName: nickName,
          alarm: true,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '회원가입 요청 실패')
      }

      const data = await response.json()
      if (data.status !== '100 CONTINUE') {
        throw new Error('회원가입 실패. 다시 시도해주세요.')
      }

      return data
    },
    onSuccess: (data) => {
      console.log('회원가입 성공:', data)

      setUser({
        email: data.data.email,
        nickName: data.data.nickName,
        alarm: true,
      })

      useAuthStore.setState({ isLoggedIn: true })
      console.log('useAuthStore 변경 후:', useAuthStore.getState())
      // setUser({ email: data.data.email, nickName: nickName || data.data.nickName, alarm: true  })
    },
    onError: (error) => {
      if (error instanceof Error) {
        setError({ general: [error.message] })
      }
    },
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('useAuthStore:', useAuthStore.getState())
    console.log('비밀번호:', password)
    console.log('비밀번호 확인:', passwordConfirm)
    console.log('닉네임', nickName)

    const input = {
      email: user?.email ?? '',
      password: password ?? '',
      passwordConfirm: passwordConfirm ?? '',
      nickName: nickName,
      alarm: true,
    }

    console.log('검증할 데이터:', input)

    const parseResult = registerSchema.safeParse(input)

    if (!parseResult.success) {
      console.log('유효성 검사 실패:', parseResult.error.flatten().fieldErrors)
      setError(parseResult.error.flatten().fieldErrors)
      return
    }

    registerUser()
  }

  if (isLoggedIn) {
    return <RegisterSuccess nickName={user?.nickName} />
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
            onSubmit={handleSubmit}
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
                  value={nickName}
                  //onChange={(e) => setUser({ nickName: e.target.value })}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </div>
              <ErrorMessage errors={error?.nickname} className="ml-20" />
            </div>

            <RegisterInputField

            // defaultValue={formData?.get('email')?.toString() ?? ''}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  //defaultValue={formData?.get('password') as string}
                  autoComplete="new-password"
                />
              </div>
              <ErrorMessage errors={error?.password} className="ml-20" />
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
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  //defaultValue={formData?.get('password-confirm') as string}
                  autoComplete="new-password"
                />
              </div>
              <ErrorMessage
                errors={error?.passwordConfirm || []}
                className="ml-20"
              />
            </div>
            {/* <ErrorMessage errors={error?.passwordConfirm || []} /> */}
            <Button
              type="submit"
              className="flex justify-self-center w-full h-10 text-md rounded-lg mt-10"
              // disabled={isRegistering || isCheckingSession}
              disabled={isRegistering}
            >
              회원가입
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

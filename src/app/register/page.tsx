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

const RegisterSuccess = dynamic(() => import('./RegisterSuccess'))

const registerSchema = z.object({
  nickName: z.string().min(1, '최소 1자 이상 입력해주세요.'),
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
  password: z
    .string()
    .min(12, '특수문자(@&!%*?&#), 영어 소문자를 포함한 12자 이상을 입력해주세요.')
    .regex(/^(?=.*[a-z])(?=.*[@$!%*?&#]).{12,}$/, '특수문자(@$!%*?&#), 영어 소문자를 포함해주세요.'),
})

export default function Register() {
  const { user, setUser, isLoggedIn } = useAuthStore()
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [error, setError] = useState<Record<string, string[]>>({})

  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: async () => {
      const response = await fetch('http:localhost:8080/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email || '',
          password: password,
          nickName: nickName,
          //nickName: user?.nickName || '',
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
      setUser({ email: data.data.email, nickName: nickName || data.data.nickName || 'defaultNickname', alarm: true  })
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

    const input = {
      email: user?.email || '',
      password,
      nickName,
    }

    const parseResult = registerSchema.safeParse(input)

    if (!parseResult.success) {
      setError(parseResult.error.flatten().fieldErrors)
      return
    }

    if (password !== passwordConfirm) {
      setError({ passwordConfirm: ['비밀번호가 일치하지 않습니다.'] })
      return
    }

    registerUser()
  }

  if (isLoggedIn) {
    return <RegisterSuccess nickName={user?.nickName || ''} />
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
                  //value={nickName}
                  onChange={(e) => setUser({ nickName: e.target.value })}
                />
              </div>
              <ErrorMessage errors={error?.nickname || []} className="ml-20" />
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
              <ErrorMessage errors={error?.password || []} className="ml-20" />
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
            <ErrorMessage errors={error?.passwordConfirm || []} />
            <ErrorMessage errors={error?.session || []} />
            <Button
              type="submit"
              className="flex justify-self-center w-full h-10 text-md rounded-lg mt-10"
              // disabled={isRegistering || isCheckingSession}
              disabled={isRegistering}
            >회원가입
              {/* {isCheckingSession ? '이메일 검증 여부 확인' : isRegistering ? '회원가입 중...' : '회원가입'} */}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

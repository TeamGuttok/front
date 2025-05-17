'use client'

import { useState } from 'react'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import RegisterInputField from './RegisterInputField'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { registerSchema } from '#schema/userSchema'
import { useRegister } from '#apis/authClient'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import { cn } from '#components/lib/utils'
import { CardTitle } from '#components/_common/Card'

//const RegisterSuccess = dynamic(() => import('./success/page'))

export default function Register() {
  const { user, setUser, isEmailVerified } = useAuthStore()
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [error, setError] = useState<Record<string, string[]>>({})
  const { mutate: registerUser, isPending: isRegistering } = useRegister()
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const input = {
      email: user?.email ?? '',
      password,
      passwordConfirm,
      nickName: user?.nickName ?? '',
      alarm: true,
    }

    const parseResult = registerSchema.safeParse(input)

    if (!parseResult.success) {
      setError(parseResult.error.flatten().fieldErrors)
      return
    }

    if (!isEmailVerified) {
      setError((prev) => ({
        ...prev,
        email: ['이메일 인증을 완료해 주세요.'],
      }))
      return
    }

    registerUser(
      {
        email: input.email,
        password: input.password,
        nickName: input.nickName,
        alarm: input.alarm,
      },
      {
        onSuccess: () => {
          router.push(PATH.registerSuccess)
        },
        onError: (err) => {
          console.error(err)
        },
      },
    )
  }

  return (
    <CardTitle className="mx-auto lg:mt-10 p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl sm:text-3xl font-bold">회원가입</h1>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <div className="flex flex-col justify-center items-center my-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-1.5">
          <SelectGroup className={cn(groupClassName)}>
            <SelectLabel
              aria-labelledby="registerNickname"
              aria-describedby="registerNickname-required"
              aria-required="true"
              className={cn(labelClassName, 'w-[3.46rem] mr-12')}
            >
              닉네임
            </SelectLabel>
            <Input
              name="nickname"
              type="text"
              aria-labelledby="registerNickname"
              aria-describedby="registerNickname-required"
              placeholder="닉네임을 입력하세요"
              value={user?.nickName ?? ''}
              onChange={(e) => setUser({ nickName: e.target.value })}
              className="grow"
            />
          </SelectGroup>
          <ErrorMessage errors={error?.nickName} className="ml-20" />

          <RegisterInputField
            email={user?.email ?? ''}
            onChangeEmail={(e) => setUser({ ...user, email: e.target.value })}
            errorEmail={error?.email}
          />

          <SelectGroup className={cn(groupClassName, 'mt-5')}>
            <SelectLabel
              aria-labelledby="registerPassword"
              aria-describedby="registerPassword-required"
              aria-required="true"
              className={cn(labelClassName, 'w-[3.46rem] mr-12')}
            >
              비밀번호
            </SelectLabel>
            <Input
              name="password"
              type="password"
              aria-labelledby="mypagePassword"
              aria-describedby="mypagePassword-required"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="grow"
            />
          </SelectGroup>
          <ErrorMessage errors={error?.password} className="ml-20" />

          <SelectGroup className={cn(groupClassName, 'mt-3')}>
            <SelectLabel
              aria-labelledby="registerPasswordConfirm"
              aria-describedby="registerPasswordConfirm-required"
              aria-required="true"
              className={cn(labelClassName, 'w-[3.46rem] mr-12')}
            >
              <span className="leading-5">
                비밀번호 <br /> 확인
              </span>
            </SelectLabel>
            <Input
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="grow"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </SelectGroup>
          <ErrorMessage
            errors={error?.passwordConfirm || []}
            className="ml-20"
          />
          <Button
            type="submit"
            className="flex justify-self-center w-full h-10 text-md rounded-lg mb-10"
            disabled={isRegistering}
          >
            회원가입
          </Button>
        </form>
      </div>
    </CardTitle>
  )
}

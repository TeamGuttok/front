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

//const RegisterSuccess = dynamic(() => import('./success/page'))

export default function Register() {
  const { user, setUser } = useAuthStore()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
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
                  value={user?.nickName ?? ''}
                  onChange={(e) => setUser({ nickName: e.target.value })}
                />
              </div>
              <ErrorMessage errors={error?.nickname} className="ml-20" />
            </div>

            <RegisterInputField
              email={user?.email ?? ''}
              onChangeEmail={(e) => setUser({ ...user, email: e.target.value })}
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
                  autoComplete="new-password"
                />
              </div>
              <ErrorMessage
                errors={error?.passwordConfirm || []}
                className="ml-20"
              />
            </div>
            <Button
              type="submit"
              className="flex justify-self-center w-full h-10 text-md rounded-lg mt-10"
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

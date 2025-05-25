'use client'

import { useState } from 'react'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import RegisterEmail from '#components/ui/RegisterEmail'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { registerSchema } from '#schema/userSchema'
import { useRegisterClient } from '#apis/authClient'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import { cn } from '#components/lib/utils'
import { CardTitle } from '#components/_common/CardTitle'
import { PrivacyPolicy } from '#components/ui/PrivacyPolicy'

export default function Register() {
  const { user, setUser, isEmailVerified, policyAccepted, setPolicyAccepted } =
    useAuthStore()
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [error, setError] = useState<Record<string, string[]>>({})
  const { mutate: registerUser, isPending: isRegistering } = useRegisterClient()
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const input = {
      email: user?.email ?? '',
      password,
      passwordConfirm,
      nickName: user?.nickName ?? '',
      alarm: true,
      consent: policyAccepted,
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
    <CardTitle>
      <CardTitle.Heading>회원가입</CardTitle.Heading>
      <CardTitle.Divider />

      <div className="flex flex-col justify-center items-center my-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-1.5 px-5">
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
          <ErrorMessage errors={error?.nickName} className="ml-2" />

          <RegisterEmail
            email={user?.email ?? ''}
            onChangeEmail={(e) => setUser({ ...user, email: e.target.value })}
            errorEmail={error?.email}
          />

          <SelectGroup className={cn(groupClassName)}>
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
          <ErrorMessage errors={error?.password} className="ml-2" />

          <SelectGroup className={cn(groupClassName)}>
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
            className="ml-2"
          />

          <PrivacyPolicy
            onChange={(value) => setPolicyAccepted(value === 'yes')}
          />
          <ErrorMessage errors={error?.policyAccepted} className="ml-2" />

          <Button
            type="submit"
            className="flex justify-self-center w-full h-10 text-md rounded-lg mb-10 "
            disabled={isRegistering}
          >
            회원가입
          </Button>
        </form>
      </div>
    </CardTitle>
  )
}

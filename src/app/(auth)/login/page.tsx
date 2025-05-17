'use client'

import Link from 'next/link'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { PATH } from '#app/routes'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { loginSchema } from '#schema/userSchema'
import { useLoginClient } from '#apis/authClient'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { cn } from '#components/lib/utils'
import { CardTitle } from '#components/_common/Card'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, setUser, isLoggedIn } = useAuthStore()
  const [error, setError] = useState<Record<string, string[]>>({
    email: [],
    password: [],
  })

  const { mutate: loginMutate, isPending } = useLoginClient()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = { email, password }
    const parseResult = loginSchema.safeParse(input)
    if (!parseResult.success) {
      setError(parseResult.error.flatten().fieldErrors)
      return
    }
    loginMutate(input, {
      onSuccess: async (user) => {
        login(user)
        setUser(user)
        await new Promise((resolve) => setTimeout(resolve, 100))
        router.push(PATH.main)
      },
      onError: (error) => {
        if (error instanceof Error) {
          setError({ general: [error.message] })
        }
      },
    })
  }

  // TODO
  // [ ] 미들웨어 연결 후 삭제 (for SEO)
  useEffect(() => {
    if (isLoggedIn) {
      router.replace(PATH.main)
    }
  }, [isLoggedIn, router])

  return (
    <CardTitle className="pb-[10rem] background-color-[hsl(var(--background))] flex flex-col min-h-[calc(100vh-4.5rem)] 2xl:pb-[8rem]">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl sm:text-3xl font-bold">로그인</h1>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg mt-10 px-10 ">
        <SelectGroup className={cn(groupClassName)}>
          <SelectLabel
            aria-labelledby="loginEmailLabel"
            aria-describedby="loginEmailLabel-required"
            aria-required="true"
            className={cn(labelClassName, 'w-[3.46rem] mr-12')}
          >
            이메일
          </SelectLabel>
          <Input
            name="email"
            type="email"
            aria-labelledby="loginEmailInput"
            aria-describedby="loginEmailInput-required"
            placeholder="이메일을 입력하세요"
            className="grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="current-email"
          />
        </SelectGroup>
        <ErrorMessage errors={error?.email} className="ml-20" />

        <SelectGroup className={cn(groupClassName, 'mt-5 mb-3')}>
          <SelectLabel
            aria-labelledby="loginPasswordLabel"
            aria-describedby="loginPasswordLabel-required"
            aria-required="true"
            className={cn(labelClassName, 'w-[3.46rem] mr-12')}
          >
            비밀번호
          </SelectLabel>
          <Input
            name="password"
            type="password"
            aria-labelledby="loginPasswordInput"
            aria-describedby="loginPasswordInput-required"
            placeholder="비밀번호를 입력하세요"
            className="grow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </SelectGroup>
        <ErrorMessage errors={error?.password} className="ml-20" />

        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="mt-6 w-32 h-14 text-lg rounded-2xl"
            disabled={isPending}
          >
            로그인
          </Button>
        </div>
      </form>
      <div className="sm:w-full h-[1px] bg-border mt-5"></div>

      <div className="flex justify-center items-center sm:mt-2">
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
    </CardTitle>
  )
}

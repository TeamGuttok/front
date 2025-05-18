'use client'

import { useState } from 'react'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { usePatchPasswordMutation } from '#apis/userClient'
import { passwordSchema } from '#schema/userSchema'
import { CardTitle } from '#components/_common/CardTitle'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import { cn } from '#components/lib/utils'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { mutate: patchPassword, isPending } = usePatchPasswordMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const parsed = passwordSchema.safeParse(password)

    if (!parsed.success) {
      setErrors(parsed.error.errors.map((err) => err.message))
      return
    }

    setErrors([])

    patchPassword(password, {
      onSuccess: () => {
        setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.')
      },
      onError: (err: any) => {
        setErrors([err.message || '비밀번호 변경 실패'])
      },
    })
  }

  return (
    <CardTitle>
      <CardTitle.Heading>비밀번호 재설정</CardTitle.Heading>
      <CardTitle.Divider />

      {successMessage ? (
        <div className="text-center text-green-600 font-semibold text-md">
          {successMessage}
        </div>
      ) : (
        <div className="items-center grid">
          <p className="text-lg text-sub my-5 text-center">
            새로운 비밀번호를 입력해주세요.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-1">
            <SelectGroup className={cn(groupClassName)}>
              <Input
                type="password"
                id="password"
                aria-labelledby="ResetPassword"
                aria-describedby="ResetPassword-required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.length > 0 && (
                <ErrorMessage errors={errors} className="mt-1" />
              )}
            </SelectGroup>

            <Button type="submit" className="w-full mt-4" disabled={isPending}>
              {isPending ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </form>
        </div>
      )}
    </CardTitle>
  )
}

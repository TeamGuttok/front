'use client'

import { useState } from 'react'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { usePatchPasswordMutation } from '#apis/userClient'
import { passwordSchema } from '#schema/userSchema'

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
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">비밀번호 재설정</h1>

        {successMessage ? (
          <div className="text-center text-green-600 font-semibold text-md">
            {successMessage}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block font-medium mb-1">
                새 비밀번호
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.length > 0 && (
                <ErrorMessage errors={errors} className="mt-1" />
              )}
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isPending}>
              {isPending ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

import type { Dispatch, SetStateAction } from 'react'
import { useRef, useState } from 'react'
import { z } from 'zod'

import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { Button } from '#components/_common/Button'

const emailSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
})

interface RegisterInputFieldProps {
  defaultValue: string
  setSession: Dispatch<SetStateAction<string>>
}

export default function RegisterInputField({
  defaultValue,
  setSession,
}: RegisterInputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [errors, setErrors] = useState<string[]>([])

  function handleClick() {
    const email = inputRef.current?.value || ''
    const result = emailSchema.safeParse({ email })

    if (!result.success) {
      setErrors(result.error.errors.map((err) => err.message))
      return
    }

    setSession(email)

    if (inputRef.current && buttonRef.current) {
      inputRef.current.readOnly = true
      buttonRef.current.disabled = true
    }

    setErrors([])
  }

  return (
    <div className="flex flex-col gap-1 min-h-16">
      <div className="flex justify-between gap-3">
        <div className="flex items-center grow">
          <Label htmlFor="email" className="w-14 mr-6">
            <span className="text-base font-medium">이메일</span>
          </Label>
          <Input
            ref={inputRef}
            name="email"
            placeholder="이메일을 입력하세요"
            className="w-0 grow read-only:opacity-50 read-only:pointer-events-none"
            defaultValue={defaultValue}
          />
        </div>
        <Button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          className="rounded-lg"
        >
          인증하기
        </Button>
      </div>
      <ErrorMessage errors={errors} className="ml-20" />
    </div>
  )
}

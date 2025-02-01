'use client'

import { useRef, useState } from 'react'
import { z } from 'zod'
import { Input } from '#components/_common/Input'
import { Label } from '#components/_common/Label'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'

const emailSchema = z.string().email('유효하지 않은 이메일 형식입니다.')

// Todo: mutate, refresh 작성
export default function InviteInput() {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<string[] | undefined>(undefined)

  // validation and mutate
  const handleClick = () => {
    const email = emailInputRef.current?.value

    const validationResult = emailSchema.safeParse(email)
    if (!validationResult.success) {
      setErrors(validationResult.error.errors.map((err) => err.message))
      return
    }

    setErrors(undefined)

    if (emailInputRef.current) {
      emailInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        <Label className="w-full">
          <Input
            ref={emailInputRef}
            type="email"
            name="email"
            placeholder="이메일 주소 입력"
          />
        </Label>
        <Button onClick={handleClick}>초대</Button>
      </div>
      <ErrorMessage errors={errors} />
    </div>
  )
}

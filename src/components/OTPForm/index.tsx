'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#components/_common/InputOtp'
import { cn } from '#components/lib/utils'

interface OTPFormProps {
  email: string
  onSuccess?:
    | ((
        data: unknown,
        variables: void,
        context: unknown,
      ) => Promise<unknown> | unknown)
    | undefined
  className?: string
}

// Todo: API 연동
export default function OTPForm({ email, onSuccess, className }: OTPFormProps) {
  const [otp, setOtp] = useState('')
  const { mutate, isPending } = useMutation({ onSuccess })

  function handleComplete(value: string) {
    setOtp(value)
    // mutate({email, value})
  }

  return (
    <div className={cn('space-y-8 mt-10', className)}>
      <div className="text-center">
        <p className="text-md text-sub">
          <span className="font-semibold">{email}</span> 로 전송된 코드를
          입력해주세요
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP
          maxLength={4}
          value={otp}
          onChange={(value) => setOtp(value)}
          onComplete={handleComplete}
          containerClassName="justify-center"
        >
          <InputOTPGroup>
            {Array.from({ length: 4 }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  )
}

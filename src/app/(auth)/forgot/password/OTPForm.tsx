'use client'

import { useState } from 'react'
// import { useMutation } from '@tanstack/react-query'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#components/_common/InputOtp'

interface OTPFormProps {
  email: string
}

export default function OTPForm({ email }: OTPFormProps) {
  const [otp, setOtp] = useState('')

  // Todo: API 연동
  // const { mutate, isPending } = useMutation({})

  function handleComplete(value: string) {
    setOtp(value)
    // mutate({email, value})
  }

  return (
    <div className="space-y-8 mt-10">
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

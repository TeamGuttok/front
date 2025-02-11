'use client'

import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#components/_common/InputOtp'
import { cn } from '#components/lib/utils'

const TIME_LIMIT_SECONDS = 10 * 60 // 10분

interface OTPFormProps {
  email: string
  onSuccess: (session: string) => void
  // onSuccess?:
  //   | ((
  //       data: unknown,
  //       variables: void,
  //       context: unknown,
  //     ) => Promise<unknown> | unknown)
  //   | undefined
  className?: string
}

async function verifyOTP(
  email: string,
  otp: string,
): Promise<{ session: string }> {
  const response = await fetch('/api/users/email-verification/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, certificationNumber: otp }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'OTP 인증 실패')
  }

  return response.json()
}

export default function OTPForm({ email, onSuccess, className }: OTPFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS)
  const [errors, setErrors] = useState<string[]>([])
  const [startTime, setStartTime] = useState(() => performance.now())
  //const [startTime] = useState(() => performance.now())

  //const { mutate, isPending } = useMutation({ onSuccess })

  const { mutate, isPending } = useMutation({
    mutationFn: () => verifyOTP(email, otp), // ✅ email, otp를 전달
    onSuccess: (data) => {
      console.log('OTP 인증 성공:', data)
      onSuccess(data.session) // ✅ 인증 성공 후 session 전달
    },
    onError: async (err: unknown) => {
      if (err instanceof Error) {
        setErrors([`오류 발생: ${err.message}`])
      } else {
        setErrors(['OTP 인증 실패'])
      }
    },
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // timer
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime
      const remaining = Math.max(
        Math.ceil((TIME_LIMIT_SECONDS * 1000 - elapsed) / 1000),
        0,
      )
      setTimeLeft(remaining)

      if (remaining <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  function handleComplete(value: string) {
    setOtp(value)
    mutate()
    console.log('otp 입력 완료', value)
    //mutate({email, value})
  }

  return (
    <div className={cn('space-y-8 mt-10', className)}>
      <div className="text-center">
        <p className="text-md text-sub">
          <span className="font-semibold">{email}</span> 로 전송된 코드를 입력해
          주세요
        </p>
        <p className="text-sm text-sub mt-1">
          인증 시간: {formatTime(timeLeft)}
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP
          ref={inputRef}
          maxLength={4}
          value={otp}
          onChange={(value) => setOtp(value)}
          onComplete={handleComplete}
          containerClassName="justify-center"
          disabled={isPending || timeLeft === 0}
        >
          <InputOTPGroup>
            {Array.from({ length: 4 }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* 삭제예정 */}
      {errors.length > 0 && (
        <div className="text-center text-destructive text-sm">{errors[0]}</div>
      )}

      {timeLeft === 0 && (
        <div className="text-center text-destructive text-sm">
          인증 시간이 만료되었습니다. 다시 시도해 주세요.
        </div>
      )}
    </div>
  )
}

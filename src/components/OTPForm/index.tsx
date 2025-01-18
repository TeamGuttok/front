'use client'

import { useEffect, useRef, useState } from 'react'
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

const TIME_LIMIT_SECONDS = 10 * 60 // 10분

// Todo: API 연동
export default function OTPForm({ email, onSuccess, className }: OTPFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS)
  const [startTime] = useState(() => performance.now())

  const { mutate, isPending } = useMutation({ onSuccess })

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
    // mutate({email, value})
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

      {timeLeft === 0 && (
        <div className="text-center text-destructive text-sm">
          인증 시간이 만료되었습니다. 다시 시도해 주세요.
        </div>
      )}
    </div>
  )
}

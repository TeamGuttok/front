'use client'

import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#components/_common/InputOtp'
import { cn } from '#components/lib/utils'
import { Button } from '#components/_common/Button'
import { BASE_URL } from '#constants/url'
//import { OTPInputContext } from 'input-otp'

const TIME_LIMIT_SECONDS = 10 * 60 // 10분

interface OTPFormProps {
  email: string
  onSuccess: (session: string) => void
  resetTrigger: number
  className?: string
}

export default function OTPForm({
  email,
  onSuccess,
  className,
  resetTrigger,
}: OTPFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS)
  const [errors, setErrors] = useState<string[]>([])
  const [startTime, setStartTime] = useState(() => performance.now())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const {
    mutate: verifyOTP,
    isPending: isLoading,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: async () => {
      console.log('인증번호 검증:', email, otp)
      const response = await fetch(`${BASE_URL}/api/users/email-verification`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          certificationNumber: otp,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    },
    onSuccess: (data) => {
      console.log('인증번호 검증 성공:', email, otp)
      onSuccess(data.session)
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setErrors([`이메일 인증 요청 실패: ${err.message}`])
      }
    },
  })

  useEffect(() => {
    setOtp('')
    setStartTime(performance.now())
    setTimeLeft(TIME_LIMIT_SECONDS)
    setErrors([])
    if (inputRef.current) {
      inputRef.current.focus()
    }
    setIsSubmitted(false)
  }, [resetTrigger])

  // 타이머
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

  function handleVerifyOTP(value: string) {
    if (isSubmitted || isLoading || isVerified) {
      return
    }
    setIsSubmitted(true)
    verifyOTP()
    //mutate()
    console.log('otp 입력 완료', value)
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

      <div className="flex flex-col items-center">
        <InputOTP
          ref={inputRef}
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          //onComplete={handleComplete}
          containerClassName="justify-center"
          disabled={isLoading || timeLeft === 0}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button
          type="button"
          onClick={() => handleVerifyOTP(otp)}
          disabled={isLoading}
          className="w-32 mt-5 mb-3"
        >
          {isLoading ? '인증중...' : isSuccess ? '인증완료' : '인증하기'}
        </Button>
      </div>

      {timeLeft === 0 && (
        <div className="text-center text-destructive text-sm">
          인증 시간이 만료되었습니다. 다시 시도해 주세요.
        </div>
      )}
    </div>
  )
}

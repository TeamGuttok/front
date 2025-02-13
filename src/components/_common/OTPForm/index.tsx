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
import { OTPInputContext } from 'input-otp'

//const TIME_LIMIT_SECONDS = 10 * 60 // 10분
const TIME_LIMIT_SECONDS = 30 * 60 // 테스트할 때만

interface OTPFormProps {
  email: string
  onSuccess: (session: string) => void
  resetTrigger: number
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
  otp: string,
  email: string,
): Promise<{ session: string }> {
  //const response = await fetch('/api/users/certification-number', {
  const response = await fetch(
    'http://localhost:8080/api/users/certification-number',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        certificationNumber: otp,
        email: email,
        certificationNumberDto: {
          certificationNumber: otp,
          email: email,
        },
      }),
    },
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '올바른 인증번호를 입력해주세요.')
  }

  return response.json()
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

  const { mutate, isPending } = useMutation({
    mutationFn: () => verifyOTP(email, otp),
    onSuccess: (data) => {
      onSuccess(data.session) // 인증 성공 후 session 전달
      setIsSubmitted(false)
      console.log('OTP 인증 성공:', data)
    },
    onError: async (err: unknown) => {
      setIsSubmitted(false)
      if (err instanceof Error) {
        setErrors([`오류 발생: ${err.message}`])
      } else {
        setErrors(['올바른 인증번호를 입력해주세요.'])
      }
    },
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

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
    if (otp.length !== 6) {
      setErrors(['인증번호를 모두 입력해주세요.'])
      return
    }
    if (isSubmitted || isPending) {
      return
    }
    setIsSubmitted(true)
    // setOtp(value)
    mutate()
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

      <div className="flex justify-center">
        <InputOTP
          ref={inputRef}
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          //onComplete={handleComplete}
          containerClassName="justify-center"
          disabled={isPending || timeLeft === 0}
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
          disabled={isPending || otp.length !== 6}
          className="w-32"
        >
          인증하기
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

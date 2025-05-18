'use client'

import { useEffect, useRef, useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#components/_common/InputOtp'
import { cn } from '#components/lib/utils'
import { Button } from '#components/_common/Button'
import { useSendCertificationCode } from '#apis/authClient'
import { useAuthStore } from '#stores/auth/useAuthStore'
import type { UseMutationResult } from '@tanstack/react-query'
import { toast } from '#hooks/useToast'

const TIME_LIMIT_SECONDS = 10 * 60 // 10분

interface OTPFormProps {
  email: string
  onSuccess: (session: string) => void
  resetTrigger: number
  className?: string
  verifyMutation: UseMutationResult<
    any,
    any,
    { email: string; certificationNumber: string },
    unknown
  >
}

export default function OTPForm({
  email,
  onSuccess,
  className,
  resetTrigger,
  verifyMutation: { mutate: verify, isPending: isLoading, reset },
}: OTPFormProps) {
  const { verifyEmail } = useAuthStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS)
  const [errors, setErrors] = useState<string[]>([])
  const [startTime, setStartTime] = useState(() => performance.now())
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { mutate: resendCertificationCode } = useSendCertificationCode()

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && otp.length === 6 && !isLoading) {
        handleVerifyOTP()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [otp, isLoading])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  function handleVerifyOTP() {
    if (isLoading) return

    if (timeLeft === 0) {
      resendCertificationCode(email, {
        onSuccess: () => {
          reset()
          setOtp('')
          setStartTime(performance.now())
          setTimeLeft(TIME_LIMIT_SECONDS)
          setErrors([])
          setIsSubmitted(false)
          if (inputRef.current) {
            inputRef.current.focus()
          }
        },
        onError: (err: any) => {
          setErrors([err.message || '인증번호 재요청 실패'])
        },
      })
      return
    }

    verify(
      { email, certificationNumber: otp },
      {
        onSuccess: (data) => {
          verifyEmail()
          onSuccess(data.session)
        },
        onError: (err: any) => {
          const status = err?.response?.status

          let message = '인증에 실패했습니다. 다시 시도해 주세요.'
          if (status === 401) {
            message = '올바른 인증 코드를 입력해주세요.'
          } else if (status === 410) {
            message = '인증 시간이 만료되었습니다. 인증 코드를 재전송해 주세요.'
          } else if (err.message) {
            message = err.message
          }

          toast({
            title: '인증에 실패했습니다.',
            description: message,
            variant: 'destructive',
          })
          setErrors([])
        },
      },
    )
  }

  return (
    <div className={cn('space-y-8', className)}>
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
          onClick={handleVerifyOTP}
          disabled={isLoading || otp.length !== 6}
          className="w-32 mt-10"
        >
          {timeLeft === 0
            ? '재요청'
            : isLoading
              ? '인증중...'
              : isLoading
                ? '인증완료'
                : '인증하기'}
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

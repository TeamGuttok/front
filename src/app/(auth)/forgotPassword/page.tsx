'use client'

import React, { useState } from 'react'
import { Input } from '#components/_common/Input'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { Button } from '#components/_common/Button'
import OTPForm from '#components/ui/OTPForm'
import { usePasswordOTP, useSendCertificationCode } from '#apis/authClient'
import { emailSchema } from '#schema/userSchema'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import { cn } from '#components/lib/utils'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'

export default function ForgotPassword() {
  const passwordOTP = usePasswordOTP()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
  const [isOTPOpen, setIsOTPOpen] = useState(false)
  const [otpErrors, setOtpErrors] = useState<string[]>([])
  const [otpReset, setOtpReset] = useState(0)

  const { mutate: sendCertificationCode, isPending: isSending } =
    useSendCertificationCode()

  const handleRequestOTP = () => {
    const parsed = emailSchema.safeParse({ email })

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors)
      return
    }

    setErrors(null)

    sendCertificationCode(email, {
      onSuccess: () => {
        setIsOTPOpen(true)
        setOtpErrors([])
        setOtpReset((prev) => prev + 1)
      },
      onError: (err: any) => {
        setErrors({ email: [err.message || '인증번호 발송 실패'] })
      },
    })
  }

  return (
    <div>
      <div className="justify-center text-center">
        <h1 className="text-3xl font-bold mt-10">비밀번호 찾기</h1>
        <p className="text-sm mt-3">가입하셨던 이메일 주소를 입력해주세요.</p>
      </div>

      <div className="flex flex-col justify-center items-center my-8">
        <form className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 flex-col gap-2 sm:gap-4">
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel
                aria-labelledby="emailForFindingPassword"
                aria-describedby="emailForFindingPassword-required"
                aria-required="true"
                className={cn(labelClassName, 'mr-5')}
              >
                이메일{' '}
              </SelectLabel>
              <Input
                type="email"
                aria-labelledby="emailForFindingPassword"
                aria-describedby="emailForFindingPassword-required"
                onChange={(e) => setEmail(e.target.value)}
                readOnly={isOTPOpen}
                className={cn(inputClassName)}
              />
              {errors?.email && (
                <ErrorMessage errors={errors.email} className="ml-20" />
              )}
            </SelectGroup>
          </div>
          <Button
            type="button"
            onClick={handleRequestOTP}
            disabled={isSending}
            aria-label="emailForFindingPassword"
            aria-labelledby="certificationCode"
          >
            {isSending ? '인증번호 발송 중...' : '인증번호 받기'}
          </Button>
          {isOTPOpen && (
            <div className="w-full max-w-lg mt-10 px-10">
              <OTPForm
                email={email}
                resetTrigger={otpReset}
                onSuccess={() => {
                  localStorage.setItem('resetEmail', email)
                  router.push(PATH.resetPassword)
                }}
                verifyMutation={passwordOTP}
              />
              {otpErrors.length > 0 && (
                <ErrorMessage errors={otpErrors} className="ml-20 mt-2" />
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

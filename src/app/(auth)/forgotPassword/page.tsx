'use client'

import React, { useState } from 'react'
import { Input } from '#components/_common/Input'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { Button } from '#components/_common/Button'
import OTPForm from '#components/ui/OTPForm'
import { usePasswordOTPClient, useSendCodeClient } from '#apis/authClient'
import { emailSchema } from '#schema/userSchema'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import { cn } from '#components/lib/utils'
import { useRouter } from 'next/navigation'
import { PATH } from '#app/routes'
import { CardTitle } from '#components/_common/CardTitle'

export default function ForgotPassword() {
  const passwordOTP = usePasswordOTPClient()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
  const [isOTPOpen, setIsOTPOpen] = useState(false)
  const [otpErrors, setOtpErrors] = useState<string[]>([])
  const [otpReset, setOtpReset] = useState(0)

  const { mutate: sendCertificationCode, isPending: isSending } =
    useSendCodeClient()

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
    <CardTitle>
      <CardTitle.Heading>비밀번호 찾기</CardTitle.Heading>
      <CardTitle.Divider />

      <div className="items-center grid">
        <p className="text-lg text-sub mt-10 mb-5 text-center">
          가입하셨던 이메일 주소를 입력해주세요.
        </p>

        <form className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 flex-col ">
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel
                aria-labelledby="emailForFindingPassword"
                aria-describedby="emailForFindingPassword-required"
                aria-required="true"
                className={cn(labelClassName)}
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
            </SelectGroup>
            {errors?.email && (
              <ErrorMessage
                errors={errors.email}
                className="flex flex-col ml-2 mt-3"
              />
            )}
          </div>
          <Button
            type="button"
            onClick={handleRequestOTP}
            disabled={isSending}
            className="mt-1"
            aria-label="emailForFindingPassword"
            aria-labelledby="certificationCode"
          >
            {isSending ? '인증번호 발송 중...' : '인증번호 받기'}
          </Button>
          {isOTPOpen && (
            <div className="w-full max-w-lg">
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
                <ErrorMessage errors={otpErrors} className="flex ml-2 mt-2" />
              )}
            </div>
          )}
        </form>
      </div>
    </CardTitle>
  )
}

import { useState, useEffect } from 'react'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import OTPForm from '#components/ui/OTPForm'
import { useSendCertificationCode, useVerifyOTP } from '#apis/authClient'
import { emailSchema } from '#schema/userSchema'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import { cn } from '#components/lib/utils'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { ErrorMessage } from '#components/_common/ErrorMessage'

interface RegisterInputFieldProps {
  email: string
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorEmail?: string[]
}

export default function RegisterInputField({
  email,
  onChangeEmail,
  errorEmail,
}: RegisterInputFieldProps) {
  const {
    user,
    setUser,
    verifyEmail,
    isEmailVerified,
    resetEmailVerification,
  } = useAuthStore()
  const [errors, setErrors] = useState<string[]>([])
  const [isOTPOpen, setIsOTPOpen] = useState<boolean>(false)
  const [otpReset, setOtpReset] = useState(0)

  const {
    mutate: sendCertificationCode,
    isPending,
    isSuccess,
  } = useSendCertificationCode()
  const verifyMutation = useVerifyOTP()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChangeEmail(e)

    const result = emailSchema.safeParse({ email: value })
    if (result.success) {
      setErrors([])
      setUser({ email: value })
    } else {
      const errorMessages = result.error.errors.map((err) => err.message)
      setErrors(errorMessages)
    }

    console.log(errors)
  }

  const handleSendCertificationCode = () => {
    const result = emailSchema.safeParse({ email })
    if (!result.success) {
      setErrors(result.error.errors.map((err) => err.message))
      return
    }

    sendCertificationCode(email, {
      onSuccess: () => {
        resetEmailVerification()
        setErrors([])
        setIsOTPOpen(true)
        setOtpReset((prev) => prev + 1)
      },
      onError: (err: any) => {
        setErrors([err.message || '인증 요청 실패'])
      },
    })
  }

  const handleOtpSuccess = () => {
    setIsOTPOpen(false)
    verifyEmail()
  }

  useEffect(() => {
    resetEmailVerification()
  }, [email])

  return (
    <>
      <SelectGroup
        className={cn(
          groupClassName,
          'flex-wrap sm:flex-nowrap mt-2 items-start sm:items-center gap-5',
        )}
      >
        <div className="flex grow items-center gap-2">
          <SelectLabel
            aria-labelledby="registerNickname"
            aria-describedby="registerNickname-required"
            aria-required="true"
            className={cn(labelClassName, 'w-[3.46rem] mr-10')}
          >
            이메일
          </SelectLabel>
          <Input
            name="email"
            type="email"
            aria-labelledby="registerEmail"
            aria-describedby="registerEmail-required"
            placeholder="이메일을 입력하세요"
            className="grow"
            value={user?.email}
            onChange={handleEmailChange}
            readOnly={isSuccess}
          />
        </div>
        <div className="w-full sm:w-auto flex justify-end sm:justify-start">
          <Button
            type="button"
            onClick={handleSendCertificationCode}
            className="rounded-lg grow sm:w-auto"
            disabled={isPending}
          >
            {isEmailVerified
              ? '인증 완료'
              : isOTPOpen
                ? '인증번호 재발송'
                : '인증번호 발송'}
          </Button>
        </div>
      </SelectGroup>

      {isOTPOpen && (
        <OTPForm
          email={email}
          resetTrigger={otpReset}
          onSuccess={handleOtpSuccess}
          className="mt-6 mb-6 space-y-4"
          verifyMutation={verifyMutation}
        />
      )}
      <ErrorMessage errors={errorEmail} className="ml-20" />
    </>
  )
}

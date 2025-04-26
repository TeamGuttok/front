import { useState, useEffect } from 'react'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { Button } from '#components/_common/Button'
import OTPForm from '#components/ui/OTPForm'
import { useSendCertificationCode, useVerifyOTP } from '#apis/authClient'
import { emailSchema } from '#schema/userSchema'

interface RegisterInputFieldProps {
  email: string
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RegisterInputFiel({
  email,
  onChangeEmail,
}: RegisterInputFieldProps) {
  const { user, setUser, verifyEmail } = useAuthStore()
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
  }

  const handleSendCertificationCode = () => {
    const result = emailSchema.safeParse({ email })
    if (!result.success) {
      setErrors(result.error.errors.map((err) => err.message))
      return
    }

    sendCertificationCode(email, {
      onSuccess: () => {
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
    console.log('현재 user 상태:', user)
  }, [user])

  return (
    <div className="flex flex-col gap-1 min-h-16">
      <div className="flex justify-between gap-3">
        <div className="flex items-center grow">
          <Label htmlFor="email" className="w-14 mr-6">
            <span className="text-base font-medium">이메일</span>
          </Label>
          <Input
            name="email"
            placeholder="이메일을 입력하세요"
            className="w-0 grow read-only:opacity-50 read-only:pointer-events-none"
            value={user?.email}
            onChange={handleEmailChange}
            readOnly={isSuccess}
          />
        </div>
        <Button
          type="button"
          onClick={handleSendCertificationCode}
          className="rounded-lg"
          disabled={isPending}
        >
          {isSuccess
            ? '인증 완료'
            : isOTPOpen
              ? '다시 보내기'
              : '인증번호 발송'}
        </Button>
      </div>
      <ErrorMessage errors={errors} className="ml-20" />

      {isOTPOpen && (
        <OTPForm
          email={email}
          resetTrigger={otpReset}
          onSuccess={handleOtpSuccess}
          className="mt-2 mb-3 space-y-4"
          verifyMutation={verifyMutation}
        />
      )}
    </div>
  )
}

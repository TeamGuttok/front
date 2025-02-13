import type { Dispatch, SetStateAction } from 'react'
import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
//import { RegisterUser } from '#apis/auth/RegisterUser'
import { useAuthStore } from '#stores/auth/useAuthStore'
//import Fetcher from '#apis/common/fetcher'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { Button } from '#components/_common/Button'
import OTPForm from '#components/_common/OTPForm'

//const fetcher = new Fetcher()

const emailSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
})

interface RegisterInputFieldProps {
  defaultValue: string
  setSession: Dispatch<SetStateAction<string>> // otp 인증 후 백엔드 세션 저장
}

export default function RegisterInputField({
  defaultValue,
  setSession,
}: RegisterInputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [errors, setErrors] = useState<string[]>([])
  const [isOTPOpen, setIsOTPOpen] = useState<boolean>(false) // 인증번호 요청하면 otp폼 렌더링
  const [otpReset, setOtpReset] = useState(0) // 시간 만료 후 인증번호 재요청

  const setUser = useAuthStore((state) => state.setUser)

  // useEffect(() => {
  //   if (isSuccess) setIsOTPOpen(true)
  // }, [isSuccess])

  // 이메일 인증
  const TEST_EMAIL = 'guttok.mail@gmail.com'

  const { mutate: requestEmailVerification, isPending: isVerifyingEmail } =
    useMutation({
      mutationFn: async (email: string) => {
        console.log('인증번호 이메일로 발송:', email)

        const response = await fetch(
          'http://localhost:8080/api/mail/certification',
          //'http://localhost:8080/api/users/email-verification',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: TEST_EMAIL,
              emailDto: { email: TEST_EMAIL },
            }),
          },
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      },
      // useMutation({
      //   mutationFn: async (email: string) => {
      //     console.log('이메일 인증 요청 시작:', email)
      //     return fetch('/api/users/email-verification')
      //   },
      onSuccess: () => {
        console.log('이메일 인증 성공')
        setIsOTPOpen(true)
        setErrors([])
      },
      onError: (err: unknown) => {
        if (err instanceof Error) {
          setErrors([`이메일 인증 요청 실패: ${err.message}`])
        } else {
          setErrors(['이메일 인증 요청 실패'])
        }
      },
    })

  // 인증번호 검증, 백엔드에서 최초로 생성된 세션 받아오는 시점
  const { mutate: verifyOTPCode } = useMutation({
    mutationFn: async ({
      certificationNumber,
      email,
    }: {
      certificationNumber: string
      email: string
    }) => {
      const response = await fetch(
        // 인증번호 otp에 입력 후 검증
        'http://localhost:8080/api/users/certification-number',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            certificationNumber,
            email,
            certificationNumberDto: { certificationNumber, email },
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    },
    onSuccess: (data) => {
      setSession(data.session)
      setIsOTPOpen(false)

      setUser({
        email: data.email,
        nickname: data.nickName,
        session: data.session,
      })
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setErrors([`OTP 인증 실패: ${err.message}`])
      } else {
        setErrors(['OTP 인증 실패'])
      }
    },
  })

  function handleEmailVerification() {
    const email = inputRef.current?.value || ''
    const result = emailSchema.safeParse({ email })

    if (!result.success) {
      setErrors(result.error.errors.map((err) => err.message))
      return
    }
    if (isOTPOpen) {
      handleResendOTP() // 수정됨: OTP 재발송 시 리셋 신호 전달
    }

    requestEmailVerification(email)
  }

  const handleResendOTP = () => {
    setOtpReset((prev) => prev + 1)
  }

  function handleOTPVerification(otp: string) {
    const email = inputRef.current?.value || ''
    verifyOTPCode({ email, certificationNumber: otp })

    if (inputRef.current && buttonRef.current) {
      inputRef.current.readOnly = true
      buttonRef.current.disabled = true
    }

    setErrors([])
  }

  // function handleClick() {
  //   const email = inputRef.current?.value || ''
  //   const result = emailSchema.safeParse({ email })

  //   if (!result.success) {
  //     setErrors(result.error.errors.map((err) => err.message))
  //     return
  //   }

  //   mutate({ email, password: 'testPassword123!', nickname: 'TestUser' })

  //   if (inputRef.current && buttonRef.current) {
  //     inputRef.current.readOnly = true
  //     buttonRef.current.disabled = true
  //   }

  //   setErrors([])
  // }

  return (
    <div className="flex flex-col gap-1 min-h-16">
      <div className="flex justify-between gap-3">
        <div className="flex items-center grow">
          <Label htmlFor="email" className="w-14 mr-6">
            <span className="text-base font-medium">이메일</span>
          </Label>
          <Input
            ref={inputRef}
            name="email"
            placeholder="이메일을 입력하세요"
            className="w-0 grow read-only:opacity-50 read-only:pointer-events-none"
            defaultValue={defaultValue}
          />
        </div>
        <Button
          ref={buttonRef}
          type="button"
          onClick={handleEmailVerification}
          className="rounded-lg"
          disabled={isVerifyingEmail}
        >
          {isOTPOpen ? '다시 보내기' : '인증번호 발송'}
        </Button>
      </div>
      <ErrorMessage errors={errors} className="ml-20" />

      {isOTPOpen && (
        <OTPForm
          email={inputRef.current?.value as string}
          resetTrigger={otpReset}
          onSuccess={handleOTPVerification}
          className="mt-2 mb-3 space-y-4"
        />
      )}
    </div>
  )
}

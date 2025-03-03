import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { ErrorMessage } from '#components/_common/ErrorMessage'
import { Button } from '#components/_common/Button'
import OTPForm from '#components/_common/OTPForm'

const emailSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
})

export default function RegisterInputField() {
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { user, setUser } = useAuthStore()
  const [errors, setErrors] = useState<string[]>([])
  const [isOTPOpen, setIsOTPOpen] = useState<boolean>(false)
  const [otpReset, setOtpReset] = useState(0)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ email: e.target.value })
  }

  // 회원가입 과정 1. 이메일 입력 후 인증코드 요청
  const {
    mutate: requestEmailVerification,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (email: string) => {
      console.log('인증번호 이메일로 발송:', email)
      const response = await fetch('http://localhost:8080/api/mail/certification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error(`HTTP 에러: ${response.status}`)
      }

      return response.json()
    },
    onSuccess: () => {
      console.log('이메일 인증 성공')
      setIsOTPOpen(true)
      setErrors([])
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setErrors([`이메일 인증 요청 실패: ${err.message}`])
      }
    },
  })

  function handleEmailVerification() {
    if (!user) {
      setErrors(['사용자 정보가 없습니다.'])
      return
    }
    const result = emailSchema.safeParse({ email: user.email })

    if (!result.success) {
      setErrors(result.error.errors.map((err) => err.message))
      return
    }

    if (isOTPOpen) {
      setOtpReset((prev) => prev + 1)
    }

    requestEmailVerification(user.email)
  }

  function handleOTPVerification() {
    setIsOTPOpen(false)

    setUser((prev) => ({
      ...prev,
      nickName: prev.nickName || '',
    }))

    if (inputRef.current && buttonRef.current) {
      inputRef.current.readOnly = true
      buttonRef.current.disabled = true
    }
    setErrors([])
  }

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
            value={user?.email || ''}
            onChange={handleEmailChange}
          />
        </div>
        <Button type="button" onClick={handleEmailVerification} className="rounded-lg" disabled={isPending}>
          {isSuccess ? '인증 완료' : isOTPOpen ? '다시 보내기' : '인증번호 발송'}
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


// import type { Dispatch, SetStateAction } from 'react'
// import { useRef, useState} from 'react'
// import { useMutation } from '@tanstack/react-query'
// import { z } from 'zod'
// import { useAuthStore } from '#stores/auth/useAuthStore'
// import { Label } from '#components/_common/Label'
// import { Input } from '#components/_common/Input'
// import { ErrorMessage } from '#components/_common/ErrorMessage'
// import { Button } from '#components/_common/Button'
// import OTPForm from '#components/_common/OTPForm'

// const emailSchema = z.object({
//   email: z.string().email('유효한 이메일 주소를 입력하세요.'),
// })

// interface RegisterInputFieldProps {
//   defaultValue?: string
//   setSession: Dispatch<SetStateAction<string>> // otp 인증 후 백엔드 세션 저장
// }

// export default function RegisterInputField({
//   defaultValue = '',
//   setSession
// }: RegisterInputFieldProps) {
//   const inputRef = useRef<HTMLInputElement>(null)
//   const buttonRef = useRef<HTMLButtonElement>(null)

//   const { user, setUser } = useAuthStore()
//   const [errors, setErrors] = useState<string[]>([])
//   const [isOTPOpen, setIsOTPOpen] = useState<boolean>(false)
//   const [otpReset, setOtpReset] = useState(0)


//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUser({ email: e.target.value });
//   };

//   const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUser({ nickName: e.target.value });
//   };

//   // 회원가입 과정 1. 이메일 입력 후 인증코드 요청
//   const {
//     mutate: requestEmailVerification,
//     isPending,
//     isSuccess,
//   } = useMutation({
//     mutationFn: async (email: string) => {
//       console.log('인증번호 이메일로 발송:', email)
//       const response = await fetch(
//         'http://localhost:8080/api/mail/certification',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: email,
//           }),
//         },
//       )

//       if (!response.ok) {
//         throw new Error(`HTTP 에러: ${response.status}`)
//       }

//       return response.json()
//     },
//     onSuccess: (email) => {
//       console.log('이메일 인증 성공:', email)
//       setIsOTPOpen(true)
//       setErrors([])
//     },
//     onError: (err: unknown) => {
//       if (err instanceof Error) {
//         setErrors([`이메일 인증 요청 실패: ${err.message}`])
//       }
//     },
//   })

//   function handleEmailVerification() {
//     if (!user) {
//       setErrors(['사용자 정보가 없습니다.']);
//       return;
//     }
//     const result = emailSchema.safeParse({ email: user.email });

//     if (!result.success) {
//       setErrors(result.error.errors.map((err) => err.message));
//       return;
//     }

//     if (isOTPOpen) {
//       setOtpReset((prev) => prev + 1);
//     }

//     requestEmailVerification(user.email);
//   }

//   function handleOTPVerification(session: string) {
//     setSession(session);
//     setIsOTPOpen(false);

//     setUser((prev) => {
//       const updatedUser = {
//         ...prev,
//         nickName: prev.nickName || '',
//         session,
//       };

//       localStorage.setItem('session', session); 
//       console.log('상태 업데이트 후 useAuthStore:', useAuthStore.getState());
//       return updatedUser;
//     });
  
//     if (inputRef.current && buttonRef.current) {
//       inputRef.current.readOnly = true;
//       buttonRef.current.disabled = true;
//     }
//     setErrors([]);
//   }
// // pw: guttok012345!

//   return (
//     <div className="flex flex-col gap-1 min-h-16">
//       <div className="flex justify-between gap-3">
//         <div className="flex items-center grow">
//           <Label htmlFor="email" className="w-14 mr-6">
//             <span className="text-base font-medium">이메일</span>
//           </Label>
//           <Input
//             ref={inputRef}
//             name="email"
//             placeholder="이메일을 입력하세요"
//             className="w-0 grow read-only:opacity-50 read-only:pointer-events-none"
//             value={user?.email || ''}
//             onChange={handleEmailChange}
//           />
//         </div>
//         <Button
//           type="button"
//           onClick={handleEmailVerification}
//           className="rounded-lg"
//           disabled={isPending}
//         >
//           {isSuccess
//             ? '인증 완료'
//             : isOTPOpen
//               ? '다시 보내기'
//               : '인증번호 발송'}
//         </Button>
//       </div>
//       <ErrorMessage errors={errors} className="ml-20" />

//       {isOTPOpen && (
//         <OTPForm
//           email={inputRef.current?.value as string}
//           resetTrigger={otpReset}
//           onSuccess={handleOTPVerification}
//           className="mt-2 mb-3 space-y-4"
//         />
//       )}
//     </div>
//   )
// }

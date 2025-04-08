export default function ForgotPasswordPage() {
  return <div>비밀번호 찾기 페이지</div>
}

// 'use client'

// import { useActionState, useState } from 'react'
// import { Label } from '#components/_common/Label'
// import { Input } from '#components/_common/Input'
// import { ErrorMessage } from '#components/_common/ErrorMessage'
// import { Button } from '#components/_common/Button'
// import OTPForm from '#components/_common/OTPForm'
// import { useMutation } from '@tanstack/react-query'
// // import { forgotPasswordAction } from './forgotPasswordAction'
// import ForgotPasswordSuccess from './ForgotPasswordSuccess'
// import { BASE_URL } from '#constants/url'

// export default function ForgotPassword() {
//   // const [email, setEmail] = useState('')
//   const [isOTPOpen, setIsOTPOpen] = useState(false)
//   // const [isVerified, setIsVerified] = useState(false)
//   // const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
//   // const [state, handleSubmit, isPending] = useActionState(
//   //   forgotPasswordAction,
//   //   null,
//   // )

//   // 서버 액션: 이메일 입력 후 인증번호 발송 요청
//   const [state, handleSubmit, isPending] = useActionState(
//     forgotPasswordAction,
//     null,
//   )
//   const { isSuccess, errors: actionErrors, formData } = state ?? {}

//   // 로컬 상태: OTP 검증 결과 및 에러 관리
//   const [otpErrors, setOtpErrors] = useState<Record<string, string[]> | null>(
//     null,
//   )
//   const [isVerified, setIsVerified] = useState(false)
//   const [otpReset, setOtpReset] = useState(0)

//   const email = (formData?.get('email') as string) ?? ''

//   // 비밀번호 찾기 버튼 클릭 -> 이메일 입력 -> 인증번호 받기 클릭하면 `/api/mail/certification` api 호출 && otp 입력 호출
//   // 메일에 인증번호 발송 -> 인증번호를 otp에 입력 후 검증 버튼 클릭 -> `api/users/certification-number` api 호출 -> validation
//   // const formData = state?.formData

//   // 인증번호 검증 api
//   const { mutate: verifyCertificationNumber, status: verifyStatus } =
//     useMutation({
//       mutationFn: async (data: {
//         certificationNumber: string
//         email: string
//       }) => {
//         const response = await fetch(
//           `${BASE_URL}/api/users/certification-number`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//           },
//         )
//         if (!response.ok) {
//           const errorData = await response.json()
//           throw new Error(JSON.stringify(errorData.errors || {}))
//         }
//         return response.json()
//       },
//       onSuccess: () => {
//         setIsVerified(true)
//         setOtpErrors(null)
//       },
//       onError: (error: any) => {
//         try {
//           const parsedErrors = JSON.parse(error.message)
//           setOtpErrors(parsedErrors)
//         } catch {
//           setOtpErrors({ certificationNumber: [error.message] })
//         }
//       },
//     })

//   const isVerifyLoading = verifyStatus === 'pending'

//   const handleOTPSubmit = (certificationNumber: string) => {
//     verifyCertificationNumber({ certificationNumber, email })
//   }

//   // OTP 인증 성공 시 성공 페이지 렌더링
//   if (isVerified) {
//     return <ForgotPasswordSuccess email={email} nickName={''} />
//   }

//   // 만약 인증번호 발송에 성공했다면 OTP 입력 폼 노출
//   if (isSuccess) {
//     return (
//       <div className="w-full max-w-lg mt-10 px-10">
//         <div>
//           <p>인증번호가 발송되었습니다. 이메일을 확인하세요.</p>
//         </div>
//         <OTPForm
//           email={email}
//           resetTrigger={otpReset}
//           onSuccess={handleOTPSubmit}
//           className="mt-2 mb-3 space-y-4"
//         />
//         {otpErrors?.certificationNumber && (
//           <ErrorMessage
//             errors={otpErrors.certificationNumber}
//             className="ml-20"
//           />
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="flex flex-col items-center w-full mt-5">
//         <span className="text-3xl font-bold ">비밀번호 찾기</span>
//       </div>
//       <div className="w-full h-[1px] bg-border mt-5"></div>

//       {!isOTPOpen ? (
//         <form action={handleSubmit} className="w-full max-w-lg mt-10 px-10">
//           <div className="flex flex-col gap-1 min-h-16">
//             <div className="flex items-center">
//               <Label htmlFor="email" className="w-20">
//                 <span className="text-base font-medium">이메일</span>
//               </Label>
//               <Input
//                 name="email"
//                 placeholder="이메일을 입력하세요"
//                 className="w-0 grow"
//               />
//             </div>
//             {actionErrors?.email && (
//               <ErrorMessage errors={actionErrors.email} className="ml-20" />
//             )}
//           </div>
//           <Button
//             type="submit"
//             className="flex justify-self-center w-full h-10 text-md rounded-lg mt-6"
//             disabled={isPending}
//           >
//             {isPending ? '인증번호 발송 중...' : '인증번호 받기'}
//           </Button>
//         </form>
//       ) : (
//         <div className="w-full max-w-lg mt-10 px-10">
//           <OTPForm
//             email={email}
//             onSubmitOTP={handleOTPSubmit} // OTP 입력 후 검증 버튼 클릭 시 호출
//             isLoading={isVerifyLoading}
//           />
//           {errors?.certificationNumber && (
//             <ErrorMessage
//               errors={errors.certificationNumber}
//               className="ml-20"
//             />
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

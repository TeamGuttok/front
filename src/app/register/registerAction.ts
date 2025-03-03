// 'use server'

// import { z } from 'zod'
// import { useAuthStore } from '#stores/auth/useAuthStore'
// import { useMutation } from '@tanstack/react-query'

// const registerSchema = z.object({
//   nickName: z.string().min(1, '최소 1자 이상 입력해주세요.'),
//   email: z.string().email('유효한 이메일 주소를 입력하세요.'),
//   password: z
//     .string()
//     .min(
//       12,
//       '특수문자(@&!%*?&#), 영어 소문자를 포함한 12자 이상을 입력해주세요.',
//     )
//     .regex(
//       /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,6}$/,
//       '특수문자(@$!%*?&#), 영어 소문자를 포함해주세요.',
//     ),
//   session: z.string().min(1, '새로고침하여 다시 이메일을 인증해 주세요'),
// })

// interface State {
//   data?: {
//     email: string
//     nickName: string
//     alarm: boolean
//     session: string
//   }
//   errors?: Record<string, string[]>
//   formData?: FormData
// }

// export async function registerAction(
//   prevState: State | null,
//   formData: FormData,
// ): Promise<State> {
//   const input = {
//     password: formData.get('password')?.toString() ?? '',
//     email: formData.get('email')?.toString() ?? '',
//     nickName: formData.get('nickname')?.toString() ?? '',
//     session: formData.get('session')?.toString() ?? '',
//   }

//   const parseResult = registerSchema.omit({ password: true }).safeParse(input)
//   if (!parseResult.success) {
//     const errors = parseResult.error.flatten().fieldErrors
//     return {
//       errors,
//       formData,
//     }
//   }

//   const passwordConfirm = formData.get('password-confirm')?.toString() ?? ''
//   if (input.password !== passwordConfirm) {
//     return {
//       errors: {
//         passwordConfirm: ['비밀번호가 일치하지 않습니다.'],
//       },
//       formData,
//       data: null,
//     }
//   }
//   try {
//     const {mutate: RegisterUser, isPending:isPending, isSuccess: isSuccess } = useMutation({
//       mutationFn: async ({ password, email, nickName, alarm }: { password: string, email: string, nickName: string, alarm: boolean }) => {
//         console.log('회원가입 요청:', password, email, nickName, alarm)
//         const response = await fetch('http://localhost:8080/api/users/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             password: input.password,
//             email: input.email,
//             nickName: input.nickName,
//             alarm: true,
//           }),
//         })

//         if (!response.ok) {
//           throw new Error(`HTTP 에러: ${response.status}`)
//         }

//         return response.json()
//       },
//       onSuccess: (password, email, nickName, alarm) => {
//         console.log('회원가입 성공')

//       }
//     },
  
//   )

//     const response = await fetch('/api/users/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         password: input.password,
//         email: input.email,
//         nickName: input.nickName,
//         alarm: true,
//       }),
//     })

//     if (!response.ok) {
//       const errorData = await response.json()
//       throw new Error(errorData.message || '회원가입 요청 실패')
//     }

//     const data = await response.json()

//     // ✅ 상태 업데이트 (useAuthStore에 저장)
//     useAuthStore.getState().setUser({
//       email: data.email,
//       nickName: data.nickName,
//     })

//     return {
//       data: {
//         email: data.email,
//         nickName: data.nickName,
//         session: data.session ?? '',
//         alarm: true,
//       },
//     }
//   } catch (error) {
//     return {
//       errors: {
//         general: [error instanceof Error ? error.message : '회원가입 실패'],
//       },
//       formData,
//     }
//   }

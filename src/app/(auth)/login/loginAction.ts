// 'use server'

// import { z } from 'zod'
// import { useAuthStore } from '#stores/auth/useAuthStore'
// import { useMutation } from '@tanstack/react-query'

// const loginSchema = z.object({
//   email: z.string().email('정확한 이메일을 입력해주세요.'),
//   password: z.string().min(1, '비밀번호를 입력해주세요.'),
// })

// export interface User {
//   email: string
//   nickName: string
//   alarm: boolean
// }

// // export interface State {
// //   errors?: Record<string, string[]>
// //   formData?: FormData
// //   success?: boolean
// //   user?: User
// // }

// export default function loginAction() {
//     const { user, setUser, isLoggedIn } = useAuthStore()
//     const [password, setPassword] = useState<string>('')
//     const [passwordConfirm, setPasswordConfirm] = useState<string>('')
//     const [error, setError] = useState<Record<string, string[]>>({})

//     const {mutate:}

// }

// export function useLoginAction() {
//   const setUser = useAuthStore((state) => state.setUser)

//   return useMutation<LoginResponse, Error, { email: string; password: string }>(
//     async (credentials) => {
//       // 1. 입력값 검증
//       const parseResult = loginSchema.safeParse(credentials)
//       if (!parseResult.success) {
//         throw new Error(
//           JSON.stringify(parseResult.error.flatten().fieldErrors)
//         )
//       }

//       // 2. 로그인 API 요청
//       const response = await fetch('http://localhost:8080/api/users/signin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || '로그인에 실패했습니다.')
//       }

//       const data = await response.json()

//       // 3. 성공 시, API 응답 데이터와 함께 필요한 사용자 정보를 반환합니다.
//       return {
//         email: credentials.email,
//         nickName: data.nickName || '',
//         alarm: data.alarm ?? true,
//       }
//     },
//     {
//       // 4. onSuccess에서 로그인 성공 시 useAuthStore를 업데이트하여 로그인 상태를 반영합니다.
//       onSuccess: (data) => {
//         setUser({
//           email: data.email,
//           nickName: data.nickName,
//           alarm: data.alarm,
//         })
//       },
//     }
//   )
// }

// export async function loginAction(
//   prevState: State | null,
//   formData: FormData,
// ): Promise<State> {
//   // export async function loginAction(formData: FormData) {
//   const storeUser = useAuthStore.getState().user
//   const email = (storeUser && storeUser.email) || formData.get('email')
//   const nickName = (storeUser && storeUser.nickName) || ''
//   const password = formData.get('password')

//   console.log('loginAction 입력값:', { email, nickName })

//   const parseResult = loginSchema.safeParse({ email, password })
//   if (!parseResult.success) {
//     throw new Error(JSON.stringify(parseResult.error.flatten().fieldErrors))
//   }

//   try {
//     const response = await fetch('http://localhost:8080/api/users/signin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password, nickName }),
//     })

//     if (!response.ok) {
//       const errorData = await response.json()
//       const validation = loginSchema.safeParse({email, password})
//       if (!validation.success) {
//         const fieldErrors = validation.error.flatten().fieldErrors
//         return { errors: fieldErrors, formData }
//       }
//       throw new Error(errorData.message || '로그인에 실패했습니다.')
//     }

//     // 로그인 성공시 메인페이지로 이동
//     const userData = await response.json()
//     console.log('loginAction - 로그인 성공:', {
//       email,
//       nickName,
//       isLoggedIn: useAuthStore.getState().isLoggedIn,
//     })

//     // 로그인 성공 후 클라이언트에서 별도로 useAuthStore.setUser 호출하여 로그인 상태 갱신
//     return {
//       formData,
//       success: true,
//       user: {
//         email: email as string,
//         nickName: nickName as string,
//         alarm: userData.alarm ?? true,
//       },
//     }
//   } catch (error: unknown) {
//     return {
//       errors: { general: [error instanceof Error ? error.message : '로그인에 실패했습니다.'] },
//       formData,
//     }
//   }
// }

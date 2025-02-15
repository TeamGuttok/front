'use server'

import { z } from 'zod'
import { RegisterUser } from '#apis/auth/RegisterUser'

const registerSchema = z.object({
  nickName: z.string().min(1, '최소 1자 이상 입력해주세요.'),
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
  password: z
    .string()
    .min(
      8,
      '특수문자(@$!%*?&#), 영어 소문자, 숫자를 포함한 8자 이상 입력해주세요.',
    )
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,}$/,
      '특수문자(@$!%*?&#), 영어 소문자, 숫자를 포함해주세요.',
    ),
  session: z.string().min(1, '새로고침하여 다시 이메일을 인증해 주세요'),
})

interface State {
  data?: {
    email: string
    password: string
    nickName: string
    alarm: boolean
    session: string
  }
  errors?: Record<string, string[]>
  formData?: FormData
}

export async function registerAction(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const input = {
    password: formData.get('password')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    nickName: formData.get('nickname')?.toString() ?? '',
    session: formData.get('session')?.toString() ?? '',
  }

  console.log(input)

  const parseResult = registerSchema.safeParse(input)
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    return {
      errors,
      formData,
    }
  }

  const passwordConfirm = formData.get('password-confirm')
  if (input.password !== passwordConfirm) {
    return {
      errors: {
        passwordConfirm: ['비밀번호가 일치하지 않습니다.'],
      },
      formData,
    }
  }

  try {
    const data = await RegisterUser({
      email: input.email!,
      password: input.password!,
      nickName: input.nickName!,
    })

    return {
      data: {
        email: data.data.email,
        password: input.password,
        nickName: data.data.nickName,
        session: data.data.session ?? '',
        alarm: true,
      },
    }
  } catch (error: unknown) {
    return {
      errors: {
        general: [error instanceof Error ? error.message : '회원가입 실패'],
      },
      formData,
    }
  }
}

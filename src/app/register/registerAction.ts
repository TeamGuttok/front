import { z } from 'zod'

const registerSchema = z.object({
  nickname: z.string().min(3, '닉네임은 최소 3자 이상이어야 합니다.'),
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
  password: z
    .string()
    .min(
      12,
      '특수문자(@$!%*?&#), 영어 소문자, 숫자를 포함한 12자 이상이어야 합니다.',
    )
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,}$/,
      '특수문자(@$!%*?&#), 영어 소문자, 숫자를 포함해야 합니다.',
    ),
})

interface State {
  data?: {
    email: string
    password: string
    nickname: string
    alarm: boolean
  }
  errors?: Record<string, string[]>
  formData?: FormData
}

export async function registerAction(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const input = {
    email: formData.get('email'),
    password: formData.get('password'),
    nickname: formData.get('nickname'),
  }

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

  // Todo: api 호출 및 return

  return {
    data: {
      email: 'you@dsfs',
      password: '1233dsdsff',
      nickname: 'gwjun',
      alarm: true,
    },
  }
}

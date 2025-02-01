'use server'

import { userSchema } from '#schemas/userSchema'

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

export async function myPageEditAction(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const input = {
    email: formData.get('email'),
    password: formData.get('password'),
    nickname: formData.get('nickname'),
  }

  console.log(input)

  const parseResult = userSchema.safeParse(input)
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

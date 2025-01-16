'use server'

import { z } from 'zod'

const forgotPasswordSchema = z.object({
  nickname: z.string().min(3, '닉네임은 최소 3자 이상이어야 합니다.'),
  password: z.string().min(12, '비밀번호는 최소 12자 이상이어야 합니다.'),
})

interface State {
  isSuccess: boolean
  errors?: Record<string, string[]>
  formData?: FormData
}

export async function forgotPasswordAction(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const input = {
    nickname: formData.get('nickname'),
    password: formData.get('password'),
  }

  const parseResult = forgotPasswordSchema.safeParse(input)
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    return {
      isSuccess: false,
      errors,
      formData,
    }
  }

  // Todo: api 호출 및 return

  return {
    isSuccess: true,
    formData,
  }
}

'use server'

import { z } from 'zod'
import { ForgotEmailSuccessProps } from './ForgotEmailSuccess'

const forgotEmailSchema = z.object({
  nickname: z.string().min(3, '닉네임은 최소 3자 이상이어야 합니다.'),
})

interface State {
  data?: ForgotEmailSuccessProps
  errors?: Record<string, string[]>
  formData?: FormData
}

export async function forgotEmailAction(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const input = {
    nickname: formData.get('nickname'),
  }

  const parseResult = forgotEmailSchema.safeParse(input)
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    return {
      errors,
      formData,
    }
  }

  // Todo: api 호출 및 return

  return {
    data: {
      nickname: 'gwjun',
      email: 'you@gmail.com',
    },
  }
}

'use server'

import { z } from 'zod'
import { ForgotEmailSuccessProps } from '../password/ForgotPasswordSuccess'

const forgotEmailSchema = z.object({
  nickName: z.string().min(3, '닉네임은 최소 3자 이상이어야 합니다.'),
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
    nickName: formData.get('nickname'),
  }

  const parseResult = forgotEmailSchema.safeParse(input)
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    return {
      errors,
      formData,
    }
  }

  return {
    data: {
      nickName: 'test',
      email: 'guttok.mail@gmail.com',
    },
  }
}

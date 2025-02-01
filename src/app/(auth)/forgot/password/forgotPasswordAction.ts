'use server'

import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
})

export interface EmailActionState {
  isSuccess: boolean
  errors?: Record<string, string[]>
  formData?: FormData
}

export async function forgotPasswordAction(
  prevState: EmailActionState | null,
  formData: FormData,
): Promise<EmailActionState> {
  const input = {
    email: formData.get('email'),
  }

  const parseResult = emailSchema.safeParse(input)
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

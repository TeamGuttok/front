'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
  password: z.string().min(1, '비밀번호를 입력하세요.'),
})

interface State {
  errors?: Record<string, string[]>
}

export async function loginAction(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const input = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parseResult = loginSchema.safeParse(input)
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    return {
      errors,
    }
  }

  redirect('/')
}

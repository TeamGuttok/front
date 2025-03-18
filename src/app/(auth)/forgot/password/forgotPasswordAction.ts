'use server'

import { z } from 'zod'
import prisma from '#/lib/prisma'
import { BASE_URL } from '#constants/url'

const emailSchema = z.object({
  email: z.string().email('이메일 주소를 정확하게 입력하세요.'),
})

async function sendCertificationMail(email: string) {
  const response = await fetch(`${BASE_URL}/api/mail/certification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!response.ok) {
    throw new Error('인증번호 발송 실패')
  }
}

// export interface EmailActionState {
//   isSuccess: boolean
//   errors?: Record<string, string[]>
//   formData?: FormData
// }

export async function forgotPasswordAction(
  _prevState: any,
  formData: FormData,
) {
  const emailValue = formData.get('email')
  if (typeof emailValue !== 'string') {
    return {
      isSuccess: false,
      errors: { email: ['이메일이 입력되지 않았습니다.'] },
      formData,
    }
  }

  // 이메일 형식 검증
  const parseResult = emailSchema.safeParse({ email: emailValue })
  if (!parseResult.success) {
    return {
      isSuccess: false,
      errors: parseResult.error.flatten().fieldErrors,
      formData,
    }
  }

  // DB 조회 (Prisma 예시)
  const user = await prisma.user.findUnique({
    where: { email: emailValue },
  })
  if (!user) {
    return {
      isSuccess: false,
      errors: { email: ['등록된 이메일이 아닙니다.'] },
      formData,
    }
  }

  // 실제 인증번호 발송 (외부 API)
  await sendCertificationMail(emailValue)

  // 필요한 경우, 인증번호를 DB에 저장할 수도 있음
  // await prisma.emailCertification.create({...})

  return {
    isSuccess: true,
    formData,
  }
}

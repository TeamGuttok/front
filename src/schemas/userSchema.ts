import { z } from 'zod'

export const userSchema = z.object({
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
  session: z.string().min(1, '새로고침하여 다시 이메일을 인증해 주세요'),
})

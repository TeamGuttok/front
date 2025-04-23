import { z } from 'zod'

export const nickNameSchema = z
  .string()
  .min(2, '닉네임은 최소 2자 이상이어야 합니다.')

export const passwordSchema = z
  .string()
  .min(12, '비밀번호는 최소 12자 이상이어야 합니다.')

export const loginSchema = z.object({
  email: z.string().email('정확한 이메일을 입력해주세요.'),
  password: z.string().min(1, '정확한 비밀번호를 입력해주세요.'),
})

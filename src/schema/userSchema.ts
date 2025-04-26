import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요.'),
})

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

export const registerSchema = z
  .object({
    nickName: z.string().min(1, '최소 1자 이상 입력해주세요.'),
    email: z.string().email('유효한 이메일 주소를 입력하세요.'),
    password: z
      .string()
      .min(
        12,
        '특수문자(@&!%*?&#), 영어 소문자를 포함한 12자 이상을 입력해주세요.',
      )
      .regex(
        /^(?=.*[a-z])(?=.*[@$!%*?&#]).{12,}$/,
        '특수문자(@$!%*?&#), 영어 소문자를 포함해주세요.',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.passwordConfirm.length > 0, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })

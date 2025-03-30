// import { z } from 'zod'
// import { CycleEnum, MethodEnum } from '#constants/addServiceLabels'

// export const groupSchema = z.object({
//   name: z.string().min(3, '이름은 최소 3자 이상이어야 합니다.'),
//   price: z
//     .number({
//       invalid_type_error: '가격은 숫자 형식이어야 합니다.',
//     })
//     .int('가격은 정수여야 합니다.')
//     .positive('가격은 양수여야 합니다.')
//     .max(1000000, '가격은 1,000,000 이하이어야 합니다.'),
//   date: z
//     .number({
//       invalid_type_error: '결제일은 숫자 형식이어야 합니다.',
//     })
//     .int('결제일은 정수여야 합니다.')
//     .min(1, '결제일은 최소 1이어야 합니다.')
//     .max(31, '결제일은 최대 31이어야 합니다.'),
//   cycle: z.enum(CycleEnum, {
//     errorMap: () => ({
//       message: '납부 주기는 연간, 매월, 매주 중 하나여야 합니다.',
//     }),
//   }),
//   method: z.enum(MethodEnum, {
//     errorMap: () => ({
//       message: '결제 수단은 카드 또는 계좌이체여야 합니다.',
//     }),
//   }),
//   description: z.string().max(500, '설명은 500자 이내로 작성해야 합니다.'),
// })

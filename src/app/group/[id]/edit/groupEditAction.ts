// 'use server'

// import { CycleLabelsKey, MethodLabelsKey } from '#constants/addServiceLabels'
// import { groupSchema } from '#schemas/groupSchema'

// interface State {
//   data?: {
//     name: string
//     price: number
//     date: number
//     cycle: CycleLabelsKey
//     method: MethodLabelsKey
//     description: string
//   }
//   errors?: Record<string, string[]>
//   formData?: FormData
// }

// export async function groupEditAction(
//   prevState: State | null,
//   formData: FormData,
// ): Promise<State> {
//   const input = {
//     name: formData.get('name'),
//     price: parseInt(formData.get('price') as string),
//     date: parseInt(formData.get('date') as string),
//     cycle: formData.get('cycle'),
//     method: formData.get('method'),
//     description: formData.get('description'),
//   }

//   const parseResult = groupSchema.safeParse(input)
//   if (!parseResult.success) {
//     const errors = parseResult.error.flatten().fieldErrors
//     return {
//       errors,
//       formData,
//     }
//   }

//   // Todo: API 호출 및 return

//   return {}
// }

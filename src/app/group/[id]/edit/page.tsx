// 'use client'

// import { useActionState } from 'react'
// import { useParams } from 'next/navigation'
// import { Label } from '#components/_common/Label'
// import { Input } from '#components/_common/Input'
// import { ErrorMessage } from '#components/_common/ErrorMessage'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '#components/_common/Select'
// import { Textarea } from '#components/_common/TextArea'
// import { Button } from '#components/_common/Button'
// import {
//   CYCLE_LABELS,
//   CycleLabelsKey,
//   METHOD_LABELS,
//   MethodLabelsKey,
// } from '#constants/addServiceLabels'

// // import { groupEditAction } from './groupEditAction'

// const data: {
//   name: string
//   price: number
//   date: number
//   cycle: CycleLabelsKey
//   method: MethodLabelsKey
//   description: string
// } = {
//   name: 'netflix',
//   price: 4700,
//   date: 1,
//   cycle: 'MONTHLY',
//   method: 'CARD',
//   description: 'string',
// }

// export default function GroupEdit() {
//   const params = useParams<{ id: string }>()
//   const groupId = parseInt(params.id)

//   const [state, handleSubmit, isPending] = useActionState(groupEditAction, {
//     data,
//   })

//   const formData = state?.formData
//   const errors = state?.errors

//   return (
//     <>
//       <div className="relative space-y-3 px-5 py-4 bg-secondary rounded-2xl shadow-sm">
//         <form action={handleSubmit} className="flex flex-col">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="name" className="text-gray-600">
//               그룹 이름
//             </Label>
//             <Input
//               name="name"
//               placeholder="그룹 이름을 입력하세요"
//               defaultValue={(formData?.get('name') as string) ?? data.name}
//             />
//             <ErrorMessage errors={errors?.name} />
//           </div>

//           <div className="flex flex-col gap-2 mt-4">
//             <Label htmlFor="price" className="text-gray-600">
//               결제 금액
//             </Label>
//             <Input
//               name="price"
//               type="number"
//               placeholder="결제 금액을 입력하세요"
//               defaultValue={(formData?.get('price') as string) ?? data.price}
//             />
//             <ErrorMessage errors={errors?.price} />
//           </div>

//           <div className="flex flex-col gap-2 mt-4">
//             <Label htmlFor="date" className="text-gray-600">
//               결제일
//             </Label>
//             <Input
//               name="date"
//               type="number"
//               placeholder="결제일을 입력하세요 (1~31)"
//               defaultValue={(formData?.get('date') as string) ?? data.date}
//             />
//             <ErrorMessage errors={errors?.date} />
//           </div>

//           <div className="flex flex-col gap-2 mt-4">
//             <Label htmlFor="cycle" className="text-gray-600">
//               납부 주기
//             </Label>
//             <Select
//               name="cycle"
//               defaultValue={(formData?.get('cycle') as string) ?? data.cycle}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="납부 주기를 선택하세요" />
//               </SelectTrigger>
//               <SelectContent>
//                 {Object.entries(CYCLE_LABELS).map(([key, value]) => (
//                   <SelectItem key={key} value={key}>
//                     {value}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <ErrorMessage errors={errors?.cycle} />
//           </div>

//           <div className="flex flex-col gap-2 mt-4">
//             <Label htmlFor="method" className="text-gray-600">
//               결제 수단
//             </Label>
//             <Select
//               name="method"
//               defaultValue={(formData?.get('method') as string) ?? data.method}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="결제 수단을 선택하세요" />
//               </SelectTrigger>
//               <SelectContent>
//                 {Object.entries(METHOD_LABELS).map(([key, value]) => (
//                   <SelectItem key={key} value={key}>
//                     {value}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <ErrorMessage errors={errors?.method} />
//           </div>

//           <div className="flex flex-col gap-2 mt-4">
//             <Label htmlFor="description" className="text-gray-600">
//               설명
//             </Label>
//             <Textarea
//               name="description"
//               placeholder="설명을 입력하세요"
//               defaultValue={
//                 (formData?.get('description') as string) ?? data.description
//               }
//             />
//             <ErrorMessage errors={errors?.description} />
//           </div>

//           <Button
//             type="submit"
//             className="flex justify-self-center w-full h-10 text-md rounded-lg mt-10"
//             disabled={isPending}
//           >
//             수정하기
//           </Button>
//         </form>
//       </div>
//     </>
//   )
// }

export default function ForgotPasswordPage() {
  return <div>비밀번호 찾기 페이지</div>
}

// import { User } from 'lucide-react'
// import { Button } from '#components/_common/Button'
// import InviteInput from './InviteInput'

// export default async function GroupMemberEdit({
//   params,
// }: {
//   params: Promise<{ id: number }>
// }) {
//   const groupId = (await params).id

//   return (
//     <>
//       <div className="relative space-y-2 px-5 py-4 bg-secondary rounded-2xl shadow-sm">
//         <InviteInput />
//         <p className="text-gray-400 text-sm">
//           ※ 10명 이상은 초대할 수 없습니다
//         </p>
//       </div>
//       <div className="relative space-y-3 px-5 py-4 bg-secondary rounded-2xl shadow-sm">
//         <h3 className="font-semibold">초대된 참여자</h3>

//         <div className="flex items-center gap-3 w-full">
//           <div className="flex items-center justify-center w-12 h-12 bg-background rounded-full">
//             <User size={22} />
//           </div>
//           <div>
//             <p className="font-semibold">이영희</p>
//             <p className="text-sub">4,250원</p>
//           </div>
//           <Button
//             variant="ghost"
//             className="ml-auto p-0 h-[unset] text-destructive hover:bg-transparent hover:text-destructive/70"
//           >
//             삭제
//           </Button>
//         </div>
//       </div>
//     </>
//   )
// }

// 'use client'

// import { useMutation } from '@tanstack/react-query'
// import {
//   // getUserInfo,
//   patchNickname,
//   patchPassword,
//   deleteUser,
// } from '#apis/userAPI'
// import { useAuthStore } from '#stores/auth/useAuthStore'
// import { useRouter } from 'next/navigation'
// import { PATH } from '#app/routes'
// import { userInfo } from '#types/user'
// import { toast } from '#hooks/useToast'

// // 마이페이지 조회 get
// export const useGetUserInfoClient = () => {
//   const { setUser } = useAuthStore()

//   const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
//     mutationFn: getUserInfo,
//     onSuccess: (data: userInfo) => {
//       setUser({
//         id: data.id,
//         email: data.email,
//         nickName: data.nickName,
//         alarm: data.alarm,
//       })
//     },
//   })

//   return {
//     getUserInfoClient: mutate,
//     data,
//     isLoading: isPending,
//     isSuccess,
//     isError,
//     error,
//   }
// }

// // 닉네임 변경 patch
// export const usePatchNicknameClient = () => {
//   const { setUser } = useAuthStore()

//   return useMutation({
//     mutationFn: patchNickname,
//     onSuccess: (response, nickName) => {
//       const updatedNickName = response.data?.nickName ?? nickName
//       setUser({ nickName: updatedNickName })
//     },
//     onError: (error) => {
//       console.error('닉네임 변경 실패:', error)
//     },
//   })
// }

// // 비밀번호 변경 patch
// export const usePatchPasswordClient = () => {
//   return useMutation({
//     mutationFn: patchPassword,
//   })
// }

// // 탈퇴 delete
// export const useDeleteUserClient = () => {
//   const { logout } = useAuthStore()
//   const router = useRouter()

//   return useMutation({
//     mutationFn: deleteUser,
//     onSuccess: (_data, _variables, context) => {
//       logout()
//       router.push(PATH.main)

//       if (context && typeof context === 'object') {
//         const message = (context as any).successMessage
//         if (message) {
//           toast({ title: message })
//         }
//       }
//     },
//   })
// }

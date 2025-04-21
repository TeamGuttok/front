'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { getUserInfo, patchUserNickName, patchUserPassword } from './userAPI'
import { useAuthStore } from '#stores/auth/useAuthStore'

// 마이페이지 조회 get
export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getUserInfo,
  })
}

// 닉네임 변경 patch
export const usePatchNickNameMutation = () => {
  const { setUser, user } = useAuthStore()

  return useMutation({
    mutationFn: patchUserNickName,
    onSuccess: (response, nickName) => {
      const updatedNickName = response.data?.nickName ?? nickName 
      setUser({ nickName: updatedNickName })
    },
    onError: (error) => {
      console.error('닉네임 변경 실패:', error)
    },
  })
}

// 비밀번호 변경 patch
export const usePatchPasswordMutation = () => {
  return useMutation({
    mutationFn: patchUserPassword,
    onSuccess: (res) => {
      console.log('비밀번호 변경 성공:', res.message)
    },
    onError: (err) => {
      console.error('비밀번호 변경 실패:', err)
    },
  })
}
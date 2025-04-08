import { create } from 'zustand'
//import { z } from 'zod'
// import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '#stores/auth/useAuthStore'
// import { useState, FormEvent } from 'react'
// import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { BASE_URL } from '#constants/url'

// const profileSchema = z.object({
//   nickName: z.string().min(2, '닉네임은 최소 1자 이상이어야 합니다.'),
//   password: z.string().min(6, '비밀번호는 최소 8자 이상이어야 합니다.'),
// })

// TODO 스토어 분리
interface MyPageState {
  // nickName: string
  // password: string
  loading: boolean
  message: string
  // setnickName: (nickName: string) => void
  // setPassword: (password: string) => void
  setMessage: (message: string) => void
  setLoading: (loading: boolean) => void
  updateProfile: (newNickName: string) => Promise<void>
  fetchProfile: () => Promise<void>
}

export const useMyPageStore = create<MyPageState>((set) => ({
  // nickName: '',
  // password: '',
  loading: false,
  message: '',
  // setnickName: (nickName: string) => set({ nickName }),
  // setPassword: (password: string) => set({ password }),
  setMessage: (message: string) => set({ message }),
  setLoading: (loading: boolean) => set({ loading }),
  updateProfile: async (newNickName: string) => {
    set({ loading: true, message: '' })
    try {
      const response = await fetch(`${BASE_URL}/api/users/nickname`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickName: newNickName }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '닉네임 변경 실패')
      }
      const data = await response.json()
      if (data.status !== '100 CONTINUE') {
        throw new Error('닉네임 변경 실패')
      }
      // 전역 상태 업데이트: useAuthStore의 setUser를 사용
      useAuthStore.getState().setUser({ nickName: newNickName })
      set({ message: '닉네임이 성공적으로 변경되었습니다.' })
    } catch (error) {
      set({ message: error instanceof Error ? error.message : '오류 발생' })
    } finally {
      set({ loading: false })
    }
  },

  fetchProfile: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        throw new Error('프로필 정보를 불러오지 못했습니다.')
      }
      const data = await response.json()
      useAuthStore.getState().setUser({
        email: data.data.email,
        nickName: data.data.nickName,
        alarm: data.data.alarm,
      })
    } catch (error) {
      set({
        message:
          error instanceof Error ? error.message : '프로필 정보 호출 중 오류',
      })
    }
  },
}))

// const { mutate: modifyingPassword } = useMutation({
// const modifyPassword = async (password: string) => {
//   mutationFn: async () => {
//     const response = await fetch(`${BASE_URL}/api/users/password`, {
//       method: 'PATCH',
//       credentials: 'include',
//       headers: { Accept: '*/*', 'Content-Type': 'application/json' },
//       body: JSON.stringify({ password }),
//     })
//     if (!response.ok) {
//       const errorData = await response.json()
//       throw new Error('비밀번호 변경 실패')
//     }

//     const data = await response.json()
//     if (data.status !== '100 CONTINUE') {
//       throw new Error('비밀번호 변경 실패')
//     }
//   }
// }

//pw: guttok012345!

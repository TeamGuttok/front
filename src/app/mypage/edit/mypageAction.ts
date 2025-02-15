// src/app/mypage/mypageAction.ts
import { create } from 'zustand'
import { z } from 'zod'
import Fetcher from '#apis/common/fetcher'

const profileSchema = z.object({
  nickName: z.string().min(2, '닉네임은 최소 1자 이상이어야 합니다.'),
  password: z.string().min(6, '비밀번호는 최소 8자 이상이어야 합니다.'),
})

// TODO 스토어 분리
interface MyPageState {
  nickName: string
  password: string
  loading: boolean
  message: string
  setnickName: (nickName: string) => void
  setPassword: (password: string) => void
  setMessage: (message: string) => void
  setLoading: (loading: boolean) => void
  updateProfile: () => Promise<void>
  fetchProfile: () => Promise<void>
}

export const useMyPageStore = create<MyPageState>((set, get) => ({
  nickName: '',
  password: '',
  loading: false,
  message: '',
  setnickName: (nickName: string) => set({ nickName }),
  setPassword: (password: string) => set({ password }),
  setMessage: (message: string) => set({ message }),
  setLoading: (loading: boolean) => set({ loading }),
  updateProfile: async () => {
    set({ loading: true, message: '' })
    const { nickName, password } = get()

    const parseResult = profileSchema.safeParse({ nickName, password })
    if (!parseResult.success) {
      const { fieldErrors } = parseResult.error.flatten()
      const errorMsg = Object.values(fieldErrors).flat().join(' ')
      set({ message: errorMsg, loading: false })
      return
    }

    const fetcher = new Fetcher()
    try {
      await fetcher.patch('/api/users/password', { password })
      await fetcher.patch('/api/users/nickName', { nickName: nickName })
      set({ message: '프로필 정보가 업데이트되었습니다.' })
    } catch (error: unknown) {
      set({
        message:
          error instanceof Error
            ? error.message
            : '프로필 정보를 업데이트하는 중 오류가 발생했습니다.',
      })
    } finally {
      set({ loading: false })
    }
  },
  fetchProfile: async () => {
    try {
      const fetcher = new Fetcher()
      const profile = await fetcher.get<{ nickName: string }>(
        '/api/users/profile',
      )
      set({ nickName: profile.nickName })
    } catch (error) {
      console.error('프로필 정보를 불러오지 못했습니다.', error)
    }
  },
}))

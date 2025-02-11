import { useAuthStore } from '#stores/auth/useAuthStore'
import Fetcher from '#apis/common/fetcher'

const fetcher = new Fetcher() // Fetcher 인스턴스 생성

interface RegisterInput {
  email: string
  password: string
  nickname: string
}

interface RegisterResponse {
  data: {
    email: string
    nickName: string
    session?: string
  }
}

export async function RegisterUser({
  email,
  password,
  nickname,
}: RegisterInput): Promise<RegisterResponse> {
  try {
    const data = await fetcher.post<RegisterResponse>('/api/users/signup', {
      email,
      password,
      nickName: nickname,
      alarm: true,
    })

    useAuthStore.getState().setUser({
      email: data.data.email,
      nickname: data.data.nickName,
      session: data.data.session || '',
    })

    return data
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '회원가입 실패')
  }
}

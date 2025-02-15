import { useAuthStore } from '#stores/auth/useAuthStore'
import Fetcher from '#apis/common/fetcher'

const fetcher = new Fetcher()

interface RegisterInput {
  email: string
  password: string
  nickName: string
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
  nickName,
}: RegisterInput): Promise<RegisterResponse> {
  try {
    const data = await fetcher.post<RegisterResponse>(
      '/api/users/signup',
      {
        email,
        password,
        nickName: nickName,
        alarm: true,
      },
      { skipSessionCheck: true },
    )

    useAuthStore.getState().setUser({
      email: data.data.email,
      nickName: data.data.nickName,
      session: data.data.session || '',
    })

    return data
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '회원가입 실패')
  }
}

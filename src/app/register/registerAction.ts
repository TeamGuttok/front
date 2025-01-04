'use server'

interface State {
  success: boolean
  nickname: string
}

export async function registerAction(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const nickname = formData.get('nickname')
  const email = formData.get('email')
  const password = formData.get('password')

  // Todo: 입력값 검증 및 제출
  console.log(nickname)
  console.log(email)
  console.log(password)

  return { success: true, nickname: '구똑' }
}

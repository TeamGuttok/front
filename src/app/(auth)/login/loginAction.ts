'use server'

export async function loginAction(prevState: void | null, formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Todo: 입력값 검증 및 제출
  console.log(email)
  console.log(password)
}

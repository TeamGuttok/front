'use server'

export async function registerAction(
  prevState: void | null,
  formData: FormData,
) {
  const nickname = formData.get('nickname')
  const email = formData.get('email')
  const password = formData.get('password')

  // Todo: 입력값 검증 및 제출
  console.log(nickname)
  console.log(email)
  console.log(password)
}

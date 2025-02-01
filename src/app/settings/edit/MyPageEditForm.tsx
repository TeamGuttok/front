'use client'

import { useActionState } from 'react'
import type { UserDetail } from '#types/user'

import { Input } from '#components/_common/Input'
import { Label } from '#components/_common/Label'
import { Button } from '#components/_common/Button'
import { ErrorMessage } from '#components/_common/ErrorMessage'

import { myPageEditAction } from './myPageEditAction'

export default function MyPageEditForm({
  initialData,
}: {
  initialData: UserDetail
}) {
  const [state, handleSubmit, isPending] = useActionState(
    myPageEditAction,
    null,
  )

  const formData = state?.formData
  const errors = state?.errors

  const getDefaultValue = (field: keyof UserDetail): string => {
    const formValue = formData?.get(field)
    if (formValue !== null && formValue !== undefined) {
      return formValue.toString()
    }
    return initialData[field]?.toString() ?? ''
  }

  return (
    <form action={handleSubmit} className="w-full p-5">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">프로필 정보</p>
      </div>

      <div className="felx flex-col">
        <div className="flex justify-between items-center gap-3 mb-2">
          <Label htmlFor="nickname" className="text-gray-600">
            닉네임
          </Label>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            className="w-0 grow max-w-60"
            defaultValue={getDefaultValue('nickName')}
          />
        </div>
        <ErrorMessage errors={errors?.nickname} className="mb-2" />
      </div>

      <div className="felx flex-col">
        <div className="flex justify-between items-center gap-3 mb-2">
          <Label htmlFor="email" className="text-gray-600">
            이메일
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요"
            className="w-0 grow max-w-60"
            defaultValue={getDefaultValue('email')}
          />
        </div>
        <ErrorMessage errors={errors?.email} className="mb-2" />
      </div>

      <div className="felx flex-col">
        <div className="flex justify-between items-center gap-3 mb-2">
          <Label htmlFor="password" className="text-gray-600">
            비밀번호
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호을 입력하세요"
            className="w-0 grow max-w-60"
            defaultValue={formData?.get('password') as string}
          />
        </div>
        <ErrorMessage errors={errors?.password} className="mb-2" />
      </div>

      <div className="felx flex-col">
        <div className="flex justify-between items-center gap-3 mb-2">
          <Label
            htmlFor="password-confirm"
            className="text-center text-gray-600"
          >
            비밀번호 <br /> 확인
          </Label>
          <Input
            id="password-confirm"
            name="password-confirm"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-0 grow max-w-60"
            defaultValue={formData?.get('password-confirm') as string}
          />
        </div>
        <ErrorMessage errors={errors?.passwordConfirm} className="mb-2" />
      </div>

      <div className="px-10 mt-10">
        <Button disabled={isPending} className="w-full rounded-lg">
          저장하기
        </Button>
      </div>
    </form>
  )
}

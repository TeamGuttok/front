'use client'

import { useState, useEffect } from 'react'
import CardTitle from '#components/_common/CardTitle'
import { Button } from '#components/_common/Button'
import { Input } from '#components/_common/Input'
import { cn } from '#components/lib/utils'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import {
  useMyProfileQuery,
  usePatchNickNameMutation,
  usePatchPasswordMutation,
} from '#apis/userClient'
import { nickNameSchema, passwordSchema } from '#schema/userSchema'

export default function ClientMypageEdit() {
  const { user, setUser } = useAuthStore()
  const { data: profile } = useMyProfileQuery()
  const [nickName, setNickName] = useState(user?.nickName ?? '')
  const [password, setPassword] = useState('')

  const { mutate: updateNickName, isPending: isNickNameUpdating } =
    usePatchNickNameMutation()
  const { mutate: updatePassword, isPending: isPasswordUpdating } =
    usePatchPasswordMutation()

  const nickNameUpdateSubmit = () => {
    const parsed = nickNameSchema.safeParse(nickName)

    if (!parsed.success) {
      alert(parsed.error.errors[0].message)
      return
    }

    updateNickName(nickName)
  }

  const passwordUpdateSubmit = () => {
    const parsed = passwordSchema.safeParse(password)

    if (!parsed.success) {
      alert(parsed.error.errors[0].message)
      return
    }

    updatePassword(password)
  }

  useEffect(() => {
    if (profile?.nickName) {
      setNickName(profile.nickName)
    }
  }, [profile])

  return (
    <CardTitle className="mx-auto lg:mt-10 p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <div className="flex flex-col items-center w-full ">
        <h1 className="text-3xl sm:text-3xl font-bold">마이페이지 수정</h1>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <div className="w-full p-5">
        <form className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 flex-col gap-2 sm:gap-4">
            <h2 className="text-lg font-semibold mb-3">프로필 정보</h2>
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel
                aria-labelledby="mypageNickname"
                aria-describedby="mypageNickname-required"
                aria-required="true"
                className={cn(labelClassName)}
              >
                닉네임{' '}
              </SelectLabel>
              <Input
                type="text"
                aria-labelledby="mypageNickname"
                aria-describedby="mypageNickname-required"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="수정할 닉네임을 작성해주세요"
                className={cn(inputClassName)}
              />
            </SelectGroup>
            <Button
              type="button"
              onClick={nickNameUpdateSubmit}
              disabled={isNickNameUpdating}
              className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]"
            >
              <span>{isNickNameUpdating ? '저장 중...' : '저장하기'}</span>
            </Button>

            <SelectGroup className={cn(groupClassName, 'mt-5')}>
              <SelectLabel
                aria-labelledby="mypagePassword"
                aria-describedby="mypagePassword-required"
                aria-required="true"
                className={cn(labelClassName)}
              >
                비밀번호{' '}
              </SelectLabel>
              <Input
                type="password"
                aria-labelledby="mypagePassword"
                aria-describedby="mypagePassword-required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="수정할 비밀번호를 작성해주세요"
                className={cn(inputClassName)}
              />
            </SelectGroup>
            <Button
              type="button"
              onClick={passwordUpdateSubmit}
              disabled={isPasswordUpdating}
              className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]"
            >
              <span>{isPasswordUpdating ? '저장 중...' : '비밀번호 변경'}</span>
            </Button>
          </div>
        </form>
      </div>
    </CardTitle>
  )
}

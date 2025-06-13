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
  // useGetUserInfoClient,
  usePatchNicknameClient,
  usePatchPasswordClient,
} from '#apis/userClient'
import { nickNameSchema, passwordSchema } from '#schema/userSchema'

export default function ClientMypageEdit() {
  const { user, setUser } = useAuthStore()
  const [nickName, setNickName] = useState(user?.nickName ?? '')
  const [password, setPassword] = useState('')

  const { mutate: updateNickName, isPending: isNickNameUpdating } =
    usePatchNicknameClient()
  const { mutate: updatePassword, isPending: isPasswordUpdating } =
    usePatchPasswordClient()

  const nickNameUpdateSubmit = () => {
    const parsed = nickNameSchema.safeParse(nickName)

    if (!parsed.success) {
      alert(parsed.error.errors[0].message)
      return
    }

    updateNickName({ nickName })
  }

  const passwordUpdateSubmit = () => {
    const parsed = passwordSchema.safeParse(password)

    if (!parsed.success) {
      alert(parsed.error.errors[0].message)
      return
    }

    updatePassword({ password })
  }

  useEffect(() => {
    if (user?.nickName) {
      setNickName(user.nickName)
    }
  }, [user])

  // TODO
  // [ ] input 반응형 스타일 수정

  return (
    <CardTitle>
      <CardTitle.Heading>마이페이지 수정</CardTitle.Heading>
      <CardTitle.Divider />

      <div className="w-full px-5 py-10">
        <form className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 flex-col gap-3 sm:gap-4">
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
              aria-label="닉네임 수정 버튼"
              type="button"
              onClick={nickNameUpdateSubmit}
              disabled={isNickNameUpdating}
              className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]"
            >
              <span>{isNickNameUpdating ? '저장 중...' : '닉네임 수정'}</span>
            </Button>

            <SelectGroup className={cn(groupClassName, 'mt-8')}>
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
                autoComplete="current-password"
              />
            </SelectGroup>
            <Button
              aria-label="비밀번호 수정 버튼"
              type="button"
              onClick={passwordUpdateSubmit}
              disabled={isPasswordUpdating}
              className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]"
            >
              <span>{isPasswordUpdating ? '저장 중...' : '비밀번호 수정'}</span>
            </Button>
          </div>
        </form>
      </div>
    </CardTitle>
  )
}

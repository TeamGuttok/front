'use client'

import { FormEvent, useState, useEffect } from 'react'
import CardTitle from '#components/_common/CardTitle'
import { Button } from '#components/_common/Button'
import { Input } from '#components/_common/Input'
import { cn } from '#components/lib/utils'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '#stores/auth/useAuthStore'
import { BASE_URL } from '#constants/url'
import { groupClassName, labelClassName, inputClassName } from '#style/style'

export default function MyPage() {
  const { user, setUser } = useAuthStore()
  const [nickName, setNickName] = useState(user?.nickName || '')
  const [password, setPassword] = useState('')
  const [alarm, setAlarm] = useState(user?.alarm ?? true)

  // 마이페이지 정보 호출 API
  const {
    mutate: getProfile,
    isPending: profileLoading,
    error: profileError,
    data: profileData,
  } = useMutation({
    mutationFn: async (): Promise<{ status: string; data: any }> => {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: 'GET',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        throw new Error('프로필 정보를 불러오지 못했습니다.')
      }
      const data = await response.json()

      if (data.status !== '100 CONTINUE') {
        throw new Error('프로필 정보 호출 실패')
      }

      return data
    },
    onSuccess: (data) => {
      console.log('프로필 정보 호출 성공:', data)
      setUser(data.data)
      setNickName(data.data.nickName)
      setAlarm(data.data.alarm)
    },
    onError: (error) => {
      throw new Error('프로필 정보 호출 실패', error)
    },
  })

  // 닉네임 수정 API
  const {
    mutate: updateNickName,
    isPending: NickNameLoading,
    error: NickNameError,
    data: NickNameData,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/api/users/nickname`, {
        method: 'PATCH',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickName }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '닉네임 변경 실패')
      }

      const data = await response.json()

      if (data.status !== '100 CONTINUE') {
        throw new Error('닉네임 변경 실패')
      }

      return data
    },
    onSuccess: (data) => {
      console.log('닉네임 변경 성공:', data)
      setUser({ ...user, nickName }) //{nickName: nickName: nickName || data.data.nickName}
    },
    onError: (error) => {
      throw new Error('닉네임 변경 실패', error)
    },
  })

  // 비밀번호 호출 API
  const {
    mutate: updatePassword,
    isPending: PasswordLoading,
    error: PasswordError,
    data: PasswordData,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/api/users/password`, {
        method: 'PATCH',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '비밀번호 변경 실패')
      }

      const data = await response.json()

      if (data.status !== '100 CONTINUE') {
        throw new Error('비밀번호 변경 실패')
      }

      return data
    },
    onSuccess: (data) => {
      console.log('비밀번호 변경 성공:', data)
    },
    onError: (error) => {
      throw new Error('비밀번호 변경 실패', error)
    },
  })

  // 알림 수정 API
  const {
    mutate: updateAlarm,
    isPending: alarmLoading,
    error: alarmError,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/api/users/alarm`, {
        method: 'PATCH',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ alarm }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '알림 변경 실패')
      }

      const data = await response.json()

      if (data.status !== '100 CONTINUE') {
        throw new Error('알림 변경 실패')
      }

      return data
    },
    onSuccess: (data) => {
      console.log('알림 변경 성공:', data)
      setUser({ ...user, alarm: data.data.alarm })
    },
    onError: (error) => {
      throw new Error('알림 변경 실패', error)
    },
  })

  useEffect(() => {
    getProfile()
  }, [getProfile])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //updateProfile()
    // await updateProfile()
  }

  return (
    <CardTitle>
      <div className="flex flex-col items-center w-full mt-5">
        <h1 className="text-3xl sm:text-3xl font-bold">마이페이지 수정</h1>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <div className="w-full p-5">
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 flex-col gap-2 sm:gap-4">
            <h2 className="text-lg font-semibold">프로필 정보</h2>
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
              type="submit"
              disabled={NickNameLoading}
              className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]"
            >
              <span>{NickNameLoading ? '저장 중...' : '저장하기'}</span>
              {NickNameError && (
                <p className="text-center text-sm text-red-500">
                  {NickNameError.message}
                </p>
              )}
            </Button>
            <SelectGroup className={cn(groupClassName)}>
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
              type="submit"
              disabled={PasswordLoading}
              className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]"
            >
              <span>{PasswordLoading ? '저장 중...' : '저장하기'}</span>
              {PasswordError && (
                <p className="text-center text-sm text-red-500">
                  {PasswordError.message}
                </p>
              )}
            </Button>
          </div>
        </form>
      </div>
      {/* <div className="flex w-full my-5">
        <Link href={PATH.mypage}>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]"
          >
            <span>{isPending ? '저장 중...' : '저장하기'}</span>
            {error && (
            <p className="text-center text-sm text-red-500">{error.message}</p>
          )}
          </Button>
        </Link>
      </div> */}
    </CardTitle>
  )
}

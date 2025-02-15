import Link from 'next/link'
import { PATH } from '#app/routes'
import { FormEvent } from 'react'
import CardTitle from '#components/_common/CardTitle'
import { Button } from '#components/_common/Button'
import { Input } from '#components/_common/Input'
import { cn } from '#components/lib/utils'
import { SelectLabel, SelectGroup } from '#components/_common/Select'
import { useMyPageStore } from './mypageAction'

export default function MyPage() {
  const groupClassName = 'flex items-start sm:items-center justify-between'
  const labelClassName =
    'block mb-1 sm:mb-0 tracking-wide text-lg font-medium text-nowrap'
  const inputClassName =
    'block w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem] pl-2 text-sm sm:text-base placeholder-[hsl(var(--muted-foreground))]'

  const {
    nickName,
    password,
    setnickName,
    setPassword,
    updateProfile,
    message,
    loading,
  } = useMyPageStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateProfile()
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
                onChange={(e) => setnickName(e.target.value)}
                placeholder="닉네임을 작성해주세요"
                className={cn(inputClassName)}
              />
            </SelectGroup>
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
                placeholder="이메일을 작성해주세요"
                className={cn(inputClassName)}
              />
            </SelectGroup>
          </div>
        </form>
      </div>
      <div className="flex w-full my-5">
        <Link href={PATH.mypage}>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]"
          >
            <span>{loading ? '저장 중...' : '저장하기'}</span>
            {message && (
              <p className="text-center text-sm text-red-500">{message}</p>
            )}
          </Button>
        </Link>
      </div>
    </CardTitle>
  )
}

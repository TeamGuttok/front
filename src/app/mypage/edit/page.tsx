import Link from 'next/link'
import { PATH } from '#app/routes'
import CardTitle from '#components/_common/CardTitle'
import { Button } from '#components/_common/Button'
import { Input } from '#components/_common/Input'
import { cn } from '#components/lib/utils'
import { SelectLabel, SelectGroup } from '#components/_common/Select'

export default function MyPage() {
  const groupClassName = 'flex items-start sm:items-center justify-between'
  const labelClassName =
    'block mb-1 sm:mb-0 tracking-wide text-lg font-medium text-nowrap'
  const inputClassName =
    'block w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem] pl-2 text-sm sm:text-base placeholder-[hsl(var(--muted-foreground))]'

  return (
    <CardTitle>
      <div className="flex flex-col items-center w-full mt-5">
        <h1 className="text-3xl sm:text-3xl font-bold">마이페이지 수정</h1>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <div className="w-full p-5">
        <form className="grid grid-cols-1 gap-4">
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
                value="구똑"
                //onChange={(e) => 회원정보.nickname({ title: e.target.value })}
                placeholder="닉네임을 작성해주세요"
                className={cn(inputClassName)}
              />
            </SelectGroup>
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel
                aria-labelledby="mypageEmail"
                aria-describedby="mypageNickname-required"
                aria-required="true"
                className={cn(labelClassName)}
              >
                이메일{' '}
              </SelectLabel>
              <Input
                type="email"
                aria-labelledby="mypageEmail"
                aria-describedby="mypageEmail-required"
                value="email@example.com"
                //onChange={(e) => 회원정보.email({ title: e.target.value })}
                placeholder="이메일을 작성해주세요"
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
                value="testtesttest"
                //onChange={(e) => 회원정보.password({ title: e.target.value })}
                placeholder="이메일을 작성해주세요"
                className={cn(inputClassName)}
              />
            </SelectGroup>
          </div>
        </form>
      </div>
      <div className="flex w-full my-5">
        <Link href={PATH.mypage}>
          <Button className="w-full bg-primary text-white hover:bg-[hsl(var(--primary-hover))]">
            <span>저장하기</span>
          </Button>
        </Link>
      </div>
    </CardTitle>
  )
}

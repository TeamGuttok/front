'use client'

import Link from 'next/link'
import { PATH } from '#app/routes'
import { cn } from '#components/lib/utils'
import { Bell, CalendarCheck, Users, HandCoins } from 'lucide-react'
import Carousel from '#components/_common/Carousel'
import { Button } from '#components/_common/Button'

export default function Home({ pathname }: { pathname: string }) {
  const buttonClassName =
    'w-20 bg-primary text-white rounded-md shadow hover:bg-[hsl(var(--primary-hover))]'
  const iconClassName =
    'w-16 h-16 stroke-[hsl(var(--primary))] mx-auto flex items-center justify-center'

  return (
    <div>
      <div className="background-color-[hsl(var(--background))] flex flex-col h-screen my-auto2xl:space-y-28">
        <div>
          <Carousel />
        </div>
        <div className="px-4 py-12 text-center">
          <h1 className="block text-4xl mb-2">
            <span className="font-bold">구</span>독을{' '}
            <span className="font-bold">똑</span>똑하게
          </h1>
          <p className="block text-lg text-sub mb-8">
            스마트한 구독 생활을 위한 최고의 선택
          </p>
          <div className="space-x-4 mb-12">
            <Link href={PATH.register} aria-label="회원가입 페이지로 이동">
              <Button
                type="button"
                className={cn(
                  buttonClassName,
                  pathname === PATH.register && 'bg-accent',
                )}
              >
                회원가입
              </Button>
            </Link>
            <Link href={PATH.login} aria-label="로그인 페이지로 이동">
              <Button
                className={cn(
                  buttonClassName,
                  pathname === PATH.register && 'bg-accent',
                )}
              >
                로그인
              </Button>
            </Link>
          </div>
          <div>
            <h2 className="block text-lg text-center">
              <span className="font-semibold">관리의 새로운 시작,</span>{' '}
              <span className="font-medium whitespace-nowrap">
                구똑과 함께 스마트한 구독 생활을 시작해보세요
              </span>
            </h2>
          </div>

          <div className="m-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-x-11 gap-y-16 auto-rows-[8rem] auto-cols-auto-[8rem] justify-items">
            <div className="text-center aspect-w-1 aspect-h-1">
              <HandCoins
                aria-label="구독비 절약 아이콘"
                className={iconClassName}
                strokeWidth={2.2}
              />
              <h3 className="my-2 text-lg font-medium">구독비 절약</h3>
              <p className="text-sm lg:px-9 break-keep-all">
                불필요한 구독을 찾아 비용을 절감해보세요
              </p>
            </div>
            <div className="text-center aspect-w-1 aspect-h-1">
              <Bell
                aria-label="알림 서비스 아이콘"
                className={iconClassName}
                strokeWidth={2.2}
              />
              <h3 className="my-2 text-lg font-medium">알림 서비스</h3>
              <p className="text-sm lg:px-7 break-keep-all">
                까먹기 쉬운 결제일, 놓치지 않도록 알려드려요
              </p>
            </div>
            <div className="text-center">
              <CalendarCheck
                aria-label="캘린더 아이콘"
                className={iconClassName}
                strokeWidth={2.2}
              />
              <h3 className="my-2 text-lg font-medium">캘린더 제공</h3>
              <p className="text-sm lg:px-8 break-keep-all">
                결제 일정을 캘린더에서 확인하세요
              </p>
            </div>
            <div className="text-center">
              <Users
                aria-label="그룹 아이콘"
                className={iconClassName}
                strokeWidth={2.2}
              />
              <h3 className="my-2 text-lg font-medium">그룹 공유</h3>
              <p className="text-sm lg:px-8 break-keep-all">
                다양한 사람들과 구독 서비스를 공유하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

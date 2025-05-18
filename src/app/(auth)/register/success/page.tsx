'use client'

import Link from 'next/link'
import { Button } from '#components/_common/Button'
import { PATH } from '#app/routes'

export default function RegisterSuccess() {
  return (
    <>
      <div className="flex flex-col items-center m-auto">
        <div className="flex flex-col gap-1 text-center text-2xl font-bold"></div>

        <div className="flex flex-col gap-1 mt-6 text-center text-sub">
          <h1 className="text-lg font-medium">🥳 회원가입을 축하드립니다!</h1>
          <p className="text-sm">
            구똑과 함께 스마트한 구독 생활을 시작해 보세요
          </p>
        </div>

        <Link href={PATH.main} className="mt-8">
          <Button size="lg" className="rounded-lg">
            메인으로 가기
          </Button>
        </Link>
      </div>
    </>
  )
}

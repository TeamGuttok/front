'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '#components/_common/RadioGroup'
import { Label } from '#components/_common/Label'

export function PrivacyPolicy({
  onChange,
}: {
  onChange: (value: 'yes' | 'no') => void
}) {
  const [value, setValue] = useState<'yes' | 'no' | ''>('')

  const handleChange = (val: 'yes' | 'no') => {
    setValue(val)
    onChange(val)
  }

  return (
    <div className="space-y-4 border rounded-xl p-4 mb-4">
      <p className="text-sm font-semibold">[필수] 개인정보 수집 및 이용 동의</p>
      <div className="text-sm text-muted-foreground leading-snug space-y-1">
        <p>서비스 제공을 위해 아래와 같이 개인정보를 수집 및 이용합니다.</p>
        <ul className="list-disc list-inside pl-1">
          <li>수집 항목: 이메일 주소</li>
          <li>수집 목적: 본인 확인, 계정 관리(비밀번호 찾기 등)</li>
          <li>보유 기간: 회원 탈퇴 시까지</li>
        </ul>
        <p>
          ※ 사용자는 동의를 거부할 권리가 있으며, 동의하지 않을 경우 회원가입이
          제한됩니다.
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={handleChange}
        className="flex gap-6 mt-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="agree-yes" />
          <Label htmlFor="agree-yes">예, 동의합니다</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="agree-no" />
          <Label htmlFor="agree-no">아니오</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

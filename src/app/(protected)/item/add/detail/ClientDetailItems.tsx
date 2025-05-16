'use client'

import { useRouter } from 'next/navigation'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import { cn } from '#components/lib/utils'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from '#components/_common/Select'
import CardTitle from '#components/_common/CardTitle'
import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { useCreateSubscription } from '#apis/subscriptionAPI'
import { SubscriptionRequest } from '#types/subscription'
import { KNOWN_SERVICES } from '#constants/knownServices'
import { groupClassName, labelClassName, inputClassName } from '#style/style'
import { Textarea } from '#components/_common/TextArea'
import { PATH } from '#app/routes'

export default function ClientDetailItems() {
  const router = useRouter()
  const mutation = useCreateSubscription()

  const {
    subscriptionData,
    updateField,
    resetSubscriptionData,
    paymentMethodOptions,
    paymentCycleOptions,
    paymentDayOptions,
  } = useSubscriptionStore((state: any) => state)

  const {
    title,
    subscription,
    paymentAmount,
    paymentCycle,
    paymentDay,
    paymentMethod,
    memo,
  } = subscriptionData

  const isCustom = subscription === 'CUSTOM_INPUT'
  const computedTitle = isCustom
    ? title
    : (KNOWN_SERVICES.find((s) => s.id === subscription)?.name ?? '')

  const isFormValid = () => {
    return !!(
      title &&
      paymentAmount &&
      paymentCycle &&
      paymentDay &&
      paymentMethod
    )
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid()) {
      return
    }

    const {
      title,
      subscription,
      paymentAmount,
      paymentCycle,
      paymentDay,
      paymentMethod,
      memo,
    } = subscriptionData

    const payload: SubscriptionRequest = {
      title: isCustom ? title : '',
      subscription,
      paymentAmount,
      paymentCycle,
      paymentDay,
      paymentMethod,
      memo,
    }

    mutation.mutate(payload, {
      onSuccess: (data) => {
        resetSubscriptionData()
        router.push(PATH.main)
      },
    })
  }

  return (
    <CardTitle className="mx-auto lg:mt-10 p-5 flex flex-col min-h-[calc(100vh-4.5rem)] pb-[3rem]">
      <h1 className="text-3xl font-bold justify-center text-center">
        구독 서비스 세부설정
      </h1>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <div className="flex flex-col justify-center items-center my-8">
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSave}>
          <div className="grid grid-cols-1 flex-col gap-2 sm:gap-4">
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel
                aria-labelledby="subscriptionTitle"
                aria-describedby="subscriptionTitle-required"
                aria-required="true"
                className={cn(labelClassName)}
              >
                구독 서비스{' '}
                <span
                  id="subscriptionTitle-required"
                  className="font-light text-sm text-[hsl(var(--destructive))]"
                >
                  필수
                </span>
              </SelectLabel>
              <Input
                type="text"
                maxLength={50}
                aria-labelledby="subscriptionTitle"
                aria-describedby="subscriptionTitle-required"
                value={isCustom ? title : computedTitle}
                onChange={(e) => {
                  if (isCustom) {
                    updateField('title', e.target.value)
                  }
                }}
                readOnly={!isCustom}
                placeholder={isCustom ? '구독명을 입력하세요' : computedTitle}
                className={cn(inputClassName)}
              />
            </SelectGroup>
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel
                aria-labelledby="subscriptionAmount"
                aria-describedby="subscriptionAmount-required"
                aria-required="true"
                className={cn(labelClassName)}
              >
                결제 금액
                <span
                  id="subscriptionAmount-required"
                  className="font-light text-sm text-[hsl(var(--destructive))] ml-2"
                >
                  필수
                </span>
              </SelectLabel>
              <Input
                type="number"
                aria-labelledby="subscriptionAmount"
                aria-describedby="subscriptionAmount-required"
                value={paymentAmount}
                onChange={(e) =>
                  updateField('paymentAmount', Number(e.target.value))
                }
                placeholder="금액을 입력하세요"
                className={cn(inputClassName)}
              />
            </SelectGroup>
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel
                id="paymentCycleLabel"
                aria-labelledby="paymentCycleLabel"
                aria-describedby="paymentCycle-required"
                className={cn(labelClassName)}
              >
                결제 주기
                <span
                  id="subscriptionCycle-required"
                  className="font-light text-sm text-[hsl(var(--destructive))] ml-2"
                >
                  필수
                </span>
              </SelectLabel>
              <div className="flex items-center space-x-2">
                <label
                  id="cyclePrefixLabel"
                  htmlFor="paymentCycle"
                  className="text-sm font-medium"
                >
                  매
                </label>
                <Select
                  onValueChange={(value) => updateField('paymentCycle', value)}
                >
                  <SelectTrigger
                    id="paymentCycle"
                    aria-labelledby="paymentCycleLabel cyclePrefixLabel"
                    aria-describedby="paymentCycle-required"
                    role="combobox"
                    aria-expanded="false"
                    aria-controls="paymentCycle-options"
                    className="flex border rounded-md px-4 sm:w-auto"
                  >
                    {
                      paymentCycleOptions.find(
                        (option) => option.value === paymentCycle,
                      )?.label
                    }
                    <SelectContent
                      id="paymentCycle-options"
                      className="border px-2 py-1 mr-10 rounded-md dark:text-black"
                    >
                      {paymentCycleOptions.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <Select
                  onValueChange={(value) =>
                    updateField('paymentDay', Number(value))
                  }
                >
                  <SelectTrigger
                    id="paymentDay"
                    aria-labelledby="paymentCycleLabel cycleSuffixLabel"
                    aria-describedby="paymentCycle-required"
                    role="combobox"
                    aria-expanded="false"
                    aria-controls="paymentDay-options"
                    className="flex border rounded-md px-4"
                  >
                    {
                      paymentDayOptions.find(
                        (option) => option.value === paymentDay,
                      )?.label
                    }
                    <SelectContent
                      id="paymentDay"
                      className="border px-2 py-1 mr-10 rounded-md dark:text-black block"
                    >
                      {paymentDayOptions.map(({ value, label }) => (
                        <SelectItem key={value} value={String(value)}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <label
                  id="cycleSuffixLabel"
                  htmlFor="paymentDay"
                  className="text-sm font-medium"
                >
                  일
                </label>
              </div>
            </SelectGroup>

            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel
                id="paymentMethodLabel"
                className={cn(labelClassName)}
                aria-labelledby="paymentMethodLabel"
                aria-required="true"
                aria-describedby="paymentMethod-required"
              >
                결제수단
                <span
                  id="subscriptionTitle-required"
                  className="font-light text-sm text-[hsl(var(--destructive))] ml-2"
                >
                  필수
                </span>
              </SelectLabel>
              <Select
                onValueChange={(value) => updateField('paymentMethod', value)}
              >
                <SelectTrigger
                  id="paymentMethod"
                  aria-labelledby="paymentMethodLabel"
                  role="combobox"
                  aria-expanded="false"
                  aria-controls="paymentMethod-options"
                  className="w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem] 
                pl-2 flex tracking-wide text-lg font-medium text-nowrap"
                >
                  {
                    paymentMethodOptions.find(
                      (option) => option.value === paymentMethod,
                    )?.label
                  }
                  <SelectContent
                    id="paymentMethod"
                    className="border rounded-md px-2 py-1 dark:text-black block"
                  >
                    {paymentMethodOptions.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </SelectGroup>
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel className={cn(labelClassName)}>메모</SelectLabel>
              <Textarea
                placeholder="메모를 입력하세요"
                maxLength={200}
                onChange={(e) => updateField('memo', e.target.value)}
                value={memo}
                className="p-2 w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem]  text-sm sm:text-base block 
                bg-white text-black dark:bg-[hsl(var(--secondary))] placeholder-[hsl(var(--muted-foreground))]
                dark:text-white dark:border-white rounded-md border border-gray-300 shadow-sm"
                rows={2}
              />
            </SelectGroup>
          </div>
          <Button
            type="submit"
            aria-label="saveSubscription"
            aria-labelledby="saveSubscription"
            disabled={!isFormValid()}
            className={`w-full py-2 mt-4 text-base text-white shadow ${
              !isFormValid() ? 'bg-gray-400 cursor-not-allowed' : 'primary'
            }`}
          >
            저장하기
          </Button>
        </form>
      </div>
    </CardTitle>
  )
}

'use client'

import Link from 'next/link'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from '#components/_common/Select'
import CardTitle from '#components/_common/CardTitle'
import { useServiceStore } from '#stores/useServiceStore'
import { useSubscriptionStore } from '#stores/useSubscriptionStore'
import { useCreateSubscription } from './CreateSubscriptionHook'

export default function Page() {
  const { selectedService } = useServiceStore()
  const createSubscription = useCreateSubscription()
  const {
    subscriptionData,
    //updateSubscription,
    setSubscriptionData,
    updatePaymentCycle,
    updatePaymentDay,
    updatePaymentMethod,
    paymentMethodOptions,
    paymentCycleOptions,
    paymentDayOptions,
    updateMemo,
    resetSubscriptionData,
  } = useSubscriptionStore()

  const defaultPaymentCycle =
    useSubscriptionStore.getState().subscriptionData.paymentCycle
  const defaultPaymentDay =
    useSubscriptionStore.getState().subscriptionData.paymentDay
  const defaultPaymentMethod =
    useSubscriptionStore.getState().subscriptionData.paymentMethod

  const handleSubmit = (): boolean => {
    const { title, paymentAmount, paymentCycle, paymentDay } = subscriptionData
    return !!(title && paymentAmount && paymentCycle && paymentDay)
  }

  return (
    <CardTitle className="flex">
      <h1 className="text-3xl font-bold justify-center flex">
        구독 서비스 세부설정
      </h1>
      <div className="flex flex-col justify-center items-center my-12">
        <form className="space-y-4 ">
          <div className="grid grid-cols-1 gap-4">
            <SelectGroup className="flex items-center justify-between">
              <SelectLabel
                id="subscriptionTitle"
                aria-labelledby="subscriptionTitle"
                className="block mr-8 tracking-wide text-lg font-medium text-nowrap"
              >
                구독 서비스 *
              </SelectLabel>
              <Input
                type="text"
                value={subscriptionData.title}
                onChange={(e) => setSubscriptionData({ title: e.target.value })}
                readOnly={!selectedService?.isCustom}
                placeholder="넷플릭스, 통신비, etc"
                className="block max-w-60 min-w-60 pl-2 text-sm sm:text-base"
              />
            </SelectGroup>
            <SelectGroup className="flex items-center justify-between">
              <SelectLabel className="block mr-8 tracking-wide text-lg font-medium text-nowrap">
                결제 금액 *
              </SelectLabel>
              <Input
                type="number"
                value={subscriptionData.paymentAmount}
                onChange={(e) =>
                  setSubscriptionData({ paymentAmount: Number(e.target.value) })
                }
                placeholder="금액을 입력하세요"
                className="block max-w-60 min-w-60 pl-2 text-sm sm:text-base"
              />
            </SelectGroup>
            <SelectGroup className="flex items-center justify-between">
              <SelectLabel className="block mr-8 tracking-wide text-lg font-medium text-nowrap">
                결제 주기 *
              </SelectLabel>
              <SelectGroup className="flex items-center space-x-2">
                <label htmlFor="paymentCycle" className="text-sm font-medium">
                  매
                </label>
                <Select onValueChange={(value) => updatePaymentCycle(value)}>
                  <SelectTrigger className="flex border rounded-md px-4">
                    {subscriptionData.paymentCycle || defaultPaymentCycle}
                    <SelectContent
                      id="paymentCycle"
                      className="border px-2 py-1 mr-10 rounded-md dark:text-black block"
                    >
                      {paymentCycleOptions.map((cycle) => (
                        <SelectItem key={cycle} value={cycle}>
                          {cycle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <Select
                  onValueChange={(value) => updatePaymentDay(Number(value))}
                >
                  <SelectTrigger className="flex border rounded-md px-4">
                    {subscriptionData.paymentDay || defaultPaymentDay}
                    <SelectContent
                      id="paymentDay"
                      className="border px-2 py-1 mr-10 rounded-md dark:text-black block"
                    >
                      {paymentDayOptions.map((day) => (
                        <SelectItem key={day} value={String(day)}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <label htmlFor="paymentDay" className="text-sm font-medium">
                  일
                </label>
              </SelectGroup>
            </SelectGroup>
            <SelectGroup className="flex items-center justify-between">
              <SelectLabel className="block mr-8 tracking-wide text-lg font-medium text-nowrap">
                결제수단
              </SelectLabel>
              <Select onValueChange={(value) => updatePaymentMethod(value)}>
                <SelectTrigger className="max-w-60 min-w-60 pl-2 flex tracking-wide text-lg font-medium text-nowrap">
                  {subscriptionData.paymentMethod || defaultPaymentMethod}
                  <SelectContent
                    id="paymentMethod"
                    className="border rounded-md px-2 py-1 dark:text-black block"
                  >
                    {paymentMethodOptions.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </SelectGroup>
            <div className="flex justify-end">
              <Link href="item/add/detail/custom">
                <p className="tracking-wide underline text-base">
                  색깔과 아이콘을 선택해주세요
                </p>
              </Link>
            </div>
            <SelectGroup className="flex justify-between">
              <SelectLabel className="mr-8 tracking-wide block text-lg font-medium text-nowrap">
                메모
              </SelectLabel>
              <textarea
                placeholder="메모를 입력하세요"
                onChange={(e) => updateMemo(e.target.value)}
                value={subscriptionData.memo}
                className="p-2 max-w-60 min-w-60 text-sm sm:text-base block 
                bg-white text-black dark:bg-zinc-800 
                dark:text-white dark:border-white rounded-md border border-gray-300 shadow-sm"
                rows={2}
              />
            </SelectGroup>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                createSubscription.mutate(subscriptionData)
                resetSubscriptionData()
              }}
              disabled={!handleSubmit()}
              className={`w-full py-2 mt-4 text-base text-white shadow ${
                !handleSubmit() ? 'bg-gray-400 cursor-not-allowed' : 'primary'
              }`}
            >
              저장하기
            </Button>
          </div>
        </form>
      </div>
    </CardTitle>
  )
}

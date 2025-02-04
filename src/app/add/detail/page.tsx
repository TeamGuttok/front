'use client'

import Link from 'next/link'
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
import { useServiceStore } from '#stores/useServiceStore'
import { useSubscriptionStore } from '#stores/useSubscriptionStore'
import { useCreateSubscription } from './CreateSubscriptionHook'

export default function Page() {
  const { selectedService } = useServiceStore()
  const { subscriptionData } = useSubscriptionStore()

  const paymentAmount = useSubscriptionStore(
    (state) => state.subscriptionData.paymentAmount,
  )
  const paymentCycle = useSubscriptionStore(
    (state) => state.subscriptionData.paymentCycle,
  )
  const paymentDay = useSubscriptionStore(
    (state) => state.subscriptionData.paymentDay,
  )
  const paymentMethod = useSubscriptionStore(
    (state) => state.subscriptionData.paymentMethod,
  )
  const memo = useSubscriptionStore((state) => state.subscriptionData.memo)

  const createSubscription = useCreateSubscription()
  const {
    //subscriptionData,
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

  const groupClassName = 'flex items-start sm:items-center justify-between'
  const labelClassName =
    'block mb-1 sm:mb-0 tracking-wide text-lg font-medium text-nowrap'
  const inputClassName =
    'block w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem] pl-2 text-sm sm:text-base placeholder-[hsl(var(--muted-foreground))]'

  return (
    <CardTitle className="flex flex-col max-w-[40rem] sm:max-w-[52rem] sm:p-8 sm:rounded-md sm:border sm:border-border m-auto -translate-y-8 px-4">
      <h1 className="text-3xl font-bold justify-center text-center">
        구독 서비스 세부설정
      </h1>
      <div className="flex flex-col justify-center items-center my-8">
        <form className="grid grid-cols-1 gap-4">
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
                구독 서비스
              </SelectLabel>
              <Input
                type="text"
                aria-labelledby="subscriptionTitle"
                aria-describedby="subscriptionTitle-required"
                value={subscriptionData.title}
                onChange={(e) => setSubscriptionData({ title: e.target.value })}
                readOnly={!selectedService?.isCustom}
                placeholder="넷플릭스, 통신비, etc"
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
            <SelectGroup className="flex items-center justify-between">
              <SelectLabel
                id="subscriptionAmount"
                className="block mr-8 tracking-wide text-lg font-medium text-nowrap"
              >
                결제 금액
              </SelectLabel>
              <Input
                type="number"
                aria-labelledby="subscriptionAmount"
                aria-describedby="subscriptionAmount-required"
                value={paymentAmount}
                value={paymentAmount}
                //value={subscriptionData.paymentAmount}
                onChange={(e) =>
                  setSubscriptionData({ paymentAmount: Number(e.target.value) })
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
                className="block max-w-60 min-w-60 pl-2 text-sm sm:text-base"
              />
            </SelectGroup>
            <SelectGroup className="flex items-center justify-between">
              <SelectLabel
                id="paymentCycleLabel"
                className="block mr-8 tracking-wide text-lg font-medium text-nowrap"
              >
                결제 주기 *
              </SelectLabel>
              <SelectGroup className="flex items-center space-x-2">
                <label
                  id="cyclePrefixLabel"
                  htmlFor="paymentCycle"
                  className="text-sm font-medium"
                >
                  매
                </label>
                <Select onValueChange={(value) => updatePaymentCycle(value)}>
                  <SelectTrigger
                    id="paymentCycle"
                    aria-labelledby="paymentCycleLabel cyclePrefixLabel"
                    aria-describedby="paymentCycle-required"
                    role="combobox"
                    aria-expanded="false"
                    aria-controls="paymentCycle-options"
                    className="flex border rounded-md px-4 sm:w-auto"
                  >
                    {paymentCycle || defaultPaymentCycle}
                    <SelectContent
                      id="paymentCycle-options"
                      className="border px-2 py-1 mr-10 rounded-md dark:text-black"
                    className="flex border rounded-md px-4"
                  >
                    {paymentCycle || defaultPaymentCycle}
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
                  <SelectTrigger
                    id="paymentDay"
                    aria-labelledby="paymentCycleLabel cycleSuffixLabel"
                    aria-describedby="paymentCycle-required"
                    role="combobox"
                    aria-expanded="false"
                    aria-controls="paymentDay-options"
                    className="flex border rounded-md px-4"
                  >
                    {paymentDay || defaultPaymentDay}
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
              >
                결제수단
              </SelectLabel>
              <Select onValueChange={(value) => updatePaymentMethod(value)}>
                <SelectTrigger
                  id="paymentMethod"
                  aria-labelledby="paymentMethodLabel"
                  role="combobox"
                  aria-expanded="false"
                  aria-controls="paymentMethod-options"
                  className="w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem] 
                pl-2 flex tracking-wide text-lg font-medium text-nowrap"
                >
              </SelectGroup>
            </SelectGroup>
            <SelectGroup className="flex items-center justify-between">
              <SelectLabel className="block mr-8 tracking-wide text-lg font-medium text-nowrap">
                결제수단
              </SelectLabel>
              <Select onValueChange={(value) => updatePaymentMethod(value)}>
                <SelectTrigger className="max-w-60 min-w-60 pl-2 flex tracking-wide text-lg font-medium text-nowrap">
                  {paymentMethod || defaultPaymentMethod}
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
            <div className="flex justify-end mb-2">
            <div className="flex justify-end">
              <Link href="item/add/detail/custom">
                <p className="tracking-wide underline text-base">
                  색깔과 아이콘을 선택해주세요
                </p>
              </Link>
            </div>
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel className={cn(labelClassName)}>메모</SelectLabel>
            <SelectGroup className="flex justify-between">
              <SelectLabel className="mr-8 tracking-wide block text-lg font-medium text-nowrap">
                메모
              </SelectLabel>
              <textarea
                placeholder="메모를 입력하세요"
                onChange={(e) => updateMemo(e.target.value)}
                value={memo}
                className="p-2 w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem]  text-sm sm:text-base block 
                bg-white text-black dark:bg-[hsl(var(--secondary))] placeholder-[hsl(var(--muted-foreground))]
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

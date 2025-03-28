'use client'

// import Link from 'next/link'
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
import { useServiceStore } from '#stores/subscriptions/useServiceStore'
import { useSubscriptionStore } from '#stores/subscriptions/useSubscriptionStore'
import { useCreateSubscription } from '#apis/common/api'

export default function Page() {
  const router = useRouter()
  const { selectedService } = useServiceStore()
  //const createSubscription = createSubscription()
  const mutation = useCreateSubscription()

  const {
    subscriptionData,
    setSubscriptionData,
    updatePaymentCycle,
    updatePaymentDay,
    updatePaymentMethod,
    updateMemo,
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
  const isCustomInput = subscription === 'CUSTOM_INPUT'
  const computedTitle = isCustomInput ? title : subscription

  const buttonBaseClass = 'w-full py-2 mt-4 text-base text-white shadow'
  // const buttonDynamicClass = isDisabled
  //   ? 'bg-gray-400 cursor-not-allowed'
  //   : 'primary'

  const groupClassName = 'flex items-start sm:items-center justify-between'
  const labelClassName =
    'block mb-1 sm:mb-0 tracking-wide text-lg font-medium text-nowrap'
  const inputClassName =
    'block w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem] pl-2 text-sm sm:text-base placeholder-[hsl(var(--muted-foreground))]'

  const isFormValid = () => {
    return !!(title && paymentAmount && paymentCycle && paymentDay)
  }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
    
      if (!isFormValid()) {
        console.log('입력값이 유효하지 않음:', subscriptionData)
        return
      }
    
      mutation.mutate(undefined, {
        onSuccess: (data) => {
          console.log('구독 항목 생성 성공:', data)
          resetSubscriptionData()
          router.push('/')
        },
        onError: (error) => {
          console.error('구독 항목 생성 실패:', error)
        },
      })
    }



  // const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
  //   const mutation = await useCreateSubscription()
  //   event.preventDefault()

  //   if (!isFormValid()) {
  //     console.log('validation 실패:', subscriptionData)
  //     return
  //   }

  //   mutation.mutate(undefined, {
  //     onSuccess: (data) => {
  //       console.log('구독 항목 생성 성공:', data)
  //       resetSubscriptionData()
  //       router.push('/')
  //     },
  //     onError: (error) => {
  //       console.error('구독 항목 생성 실패:', error)
  //     },
  //   })
  // }

  return (
    <CardTitle className="flex flex-col max-w-[40rem] sm:max-w-[52rem] sm:p-8 sm:rounded-md sm:border sm:border-border m-auto -translate-y-8 px-4">
      <h1 className="text-3xl font-bold justify-center text-center">
        구독 서비스 세부설정
      </h1>
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
                aria-labelledby="subscriptionTitle"
                aria-describedby="subscriptionTitle-required"
                value={computedTitle}
                onChange={(e) => {
                  if (isCustomInput) {
                    setSubscriptionData({ title: e.target.value })
                  }
                }}
                //readOnly={!isCustomInput}
                //onChange={(e) => setSubscriptionData({ title: e.target.value })}
                //readOnly={!selectedService?.isCustom}
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
              </SelectLabel>
              <Input
                type="number"
                aria-labelledby="subscriptionAmount"
                aria-describedby="subscriptionAmount-required"
                value={paymentAmount}
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
                    {
                      paymentDayOptions.find(
                        (option) => option.value === paymentDay,
                      )?.label
                    }
                    {/* {paymentDayOptions.includes(paymentDay) || paymentDay} */}
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
            {/* <div className="flex justify-end mb-2">
              <Link href="item/add/detail/custom">
                <p className="tracking-wide underline text-base">
                  색깔과 아이콘을 선택해주세요
                </p>
              </Link>
            </div> */}
            <SelectGroup className={cn(groupClassName)}>
              <SelectLabel className={cn(labelClassName)}>메모</SelectLabel>
              <textarea
                placeholder="메모를 입력하세요"
                onChange={(e) => updateMemo(e.target.value)}
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
              //className={`${buttonBaseClass} ${buttonDynamicClass}`}
            >
              저장하기
            </Button>
        </form>
      </div>
    </CardTitle>
  )
}

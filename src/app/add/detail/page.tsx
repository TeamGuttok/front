'use client'

import Link from 'next/link'
import { Label } from '#components/_common/Label'
import { Input } from '#components/_common/Input'
import { Button } from '#components/_common/Button'
import CardTitle from '#components/_common/CardTitle'
import { useServiceStore } from '#stores/useServiceStore'
import { useSubscriptionStore } from '#stores/useSubscriptionStore';
import { useCreateSubscription } from './CreateSubscriptionHook';

export default function Page() {
  const { selectedService, setSelectedService } = useServiceStore()
  const {
    subscriptionData,
    setSubscriptionData,
    updatePaymentCycle,
    updatePaymentDay,
    paymentCycleOptions,
    paymentDayOptions,
    resetSubscriptionData,
  } = useSubscriptionStore();

  const createSubscription = useCreateSubscription();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedService?.isCustom) {
      setSelectedService({
        ...selectedService,
        name: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { title, price, paymentAmount, paymentCycle, paymentDay } = subscriptionData;

    if (!title || !price || !paymentAmount || !paymentCycle || !paymentDay) {
      alert('필수 값을 모두 입력해주세요.');
      // TODO
      // [ ] input 아래 경고문구 추가로 변경 
      return;
    }

    createSubscription.mutate(subscriptionData);
    resetSubscriptionData();
  };

  return (
    <CardTitle className="flex">
      <h1 className="text-3xl font-bold justify-center flex">구독 서비스 세부설정</h1>
      <div className="flex flex-col justify-center items-center my-12">
        <form className="space-y-4 ">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <Label className="block mr-8 tracking-wide text-lg font-medium text-nowrap">
                구독 서비스 *
              </Label>
              <Input
                type="text"
                value={selectedService?.name || ''}
                //value={serviceName}
                onChange={handleInputChange}
                placeholder="넷플릭스, 통신비, etc"
                className="block max-w-60 min-w-60 pl-2 text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="block mr-8 tracking-wide text-lg font-medium text-nowrap">
                결제 금액 *
              </Label>
              <Input
                type="number"
                onChange={(e) => setSubscriptionData({ price: Number(e.target.value) })}
                placeholder="금액을 입력하세요"
                className="block max-w-60 min-w-60 pl-2 text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="block mr-8 tracking-wide text-lg font-medium text-nowrap">
                결제 주기 *
              </Label>
              <div className="flex items-center space-x-2">
                <label htmlFor="paymentCycle" className="text-sm font-medium">
                  매
                </label>
                <select
                  id="paymentCycle"
                  value={subscriptionData.paymentCycle}
                  onChange={(e) => updatePaymentCycle(e.target.value)}
                  className="border rounded-md px-2 py-1 dark:text-black"
                >
                  {paymentCycleOptions.map((cycle) => (
                    <option key={cycle} value={cycle}>
                      {cycle}
                    </option>
                  ))}
                </select>
                <select
                  id="paymentDay"
                  value={subscriptionData.paymentDay}
                  onChange={(e) => updatePaymentDay(Number(e.target.value))}
                  className="border rounded-md px-2 py-1 dark:text-black"
                >
                  {paymentDayOptions.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <label htmlFor="paymentDay" className="text-sm font-medium">
                  일
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="block mr-8 tracking-wide text-lg font-medium text-nowrap">
                결제 수단
              </Label>
              <select
                id="paymentMethod"
                value={subscriptionData.paymentMethod}
                onChange={(e) => updatePaymentCycle(e.target.value)}
                className="border rounded-md px-2 py-1 dark:text-black"
              >
                {paymentCycleOptions.map((cycle) => (
                  <option key={cycle} value={cycle}>
                    {cycle}
                  </option>
                ))}
              </select>
              <Input
                type="text"
                placeholder="결제수단을 입력하세요"
                className="pl-2 max-w-60 min-w-60 text-sm sm:text-base"
              />
            </div>
            <div className="flex justify-end">
              <Link href="item/add/detail/custom">
                <p className="tracking-wide underline text-base">
                  색깔과 아이콘을 선택해주세요
                </p>
              </Link>
            </div>
            <div className="flex justify-between">
              <Label className="mr-8 tracking-wide block text-lg font-medium text-nowrap">
                메모
              </Label>
              <textarea
                placeholder="메모를 입력하세요"
                className="p-2 max-w-60 min-w-60 text-sm sm:text-base block dark:text-black rounded-md border border-gray-300 shadow-sm"
                rows={2}
              />
            </div>

            <Button
              type="submit"
              onChange={handleSubmit}
              className="w-full py-2 mt-4 text-base text-white shadow"
            >
              저장하기
            </Button>
          </div>
        </form>
      </div>
    </CardTitle>
  )
}


// TODO
// [x] 결제 주기 추가
// [ ] savaitemapi 불러오는 tanstack query (post) 추가
// [ ] 저장하고 나면 / 페이지에 보이도록 
// [ ] 다크테마 스타일 (input, placeholder, color, 사이드바 다크테마)
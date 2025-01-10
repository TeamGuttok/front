import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl lg:max-w-2xl">
        <h2 className="text-center mt-14 text-xl lg:text-2xl font-semibold mb-6">구독 서비스 세부설정</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">구독 서비스 *</label>
              <input
                type="text"
                placeholder="Netflix"
                className="mt-1 px-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">결제 금액 *</label>
              <input
                type="number"
                placeholder="금액을 입력하세요"
                className="mt-1 px-1 block w-full rounded-md border placeholder:border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">첫 결제 날짜 *</label>
              <input
                type="date"
                className="mt-1 px-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">결제 주기 *</label>
              <input
                type="text"
                placeholder="수정 예정"
                className="mt-1 px-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className='flex flex-end' >
            <Link href="item/add/detail/custom">
              <p className="underline" >색깔과 아이콘을 선택해주세요</p>
            </Link>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">결제 수단</label>
            <input
              type="text"
              placeholder="결제수단을 입력하세요"
              className="mt-1 px-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">메모</label>
            <textarea
              placeholder="메모를 입력하세요"
              className="mt-1 px-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="mb-16 w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};


import { SubscriptionStore } from "#stores/useSubscriptionStore";

export async function CreateSubscriptionAPI(data: SubscriptionStore): Promise<void> {
  const response = await fetch('/api/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('구독 서비스 저장에 실패했습니다.');
  }

  return response.json();
}
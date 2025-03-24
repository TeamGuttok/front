import { KNOWN_SERVICES } from '#constants/knownServices'

export type ServiceId = (typeof KNOWN_SERVICES)[number]['id'] | 'CUSTOM_INPUT'

export const serviceNameLabels: Record<ServiceId, string> = {
  CUSTOM_INPUT: '직접 입력',
  YOUTUBE_PREMIUM: '유튜브 프리미엄',
  NETFLIX: '넷플릭스',
  SPOTIFY: '스포티파이',
  APPLE_MUSIC: '애플 뮤직',
  COUPANG_WOW: '쿠팡 와우',
  WAVVE: '웨이브',
  WATCHA: '왓챠',
  TVING: '티빙',
  DISNEY_PLUS: '디즈니 플러스',
  APPLE_TV: '애플 티비',
  LAFTEL: '라프텔',
  MELON: '멜론',
  GENIE: '지니',
  FLO: '플로',
  AWS: '아마존 웹 서비스',
  GCP: '구글 클라우드 플랫폼',
  CHAT_GPT: 'Chat GPT',
  CLAUDE_AI: 'Claude AI',
  GEMINI: '제미니',
  PERPLEXITY: '퍼플렉시티',
  SPOTV_NOW: '스포티비 NOW',
}

export type PaymentMethod =
  | 'CARD'
  | 'BANK_TRANSFER'
  | 'MOBILE_PAYMENT'
  | 'NAVER_PAY'
  | 'KAKAO_PAY'
  | 'OTHER'

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  CARD: '카드',
  BANK_TRANSFER: '계좌이체',
  NAVER_PAY: '네이버페이',
  KAKAO_PAY: '카카오페이',
  MOBILE_PAYMENT: '휴대폰 결제',
  OTHER: '기타',
}

export const paymentDayLabels: number[] = Array.from(
  { length: 31 },
  (_, i) => i + 1,
)

export type PaymentDay = (typeof paymentDayLabels)[number]

export type PaymentCycle = 'YEARLY' | 'MONTHLY' | 'WEEKLY'

export const paymentCycleLabels: Record<PaymentCycle, string> = {
  YEARLY: '연',
  MONTHLY: '월',
  WEEKLY: '주',
}

export type paymentStatus = 'COMPLETED' | 'PENDING'

export const paymentStatusLabels: Record<paymentStatus, string> = {
  COMPLETED: '결제 완료',
  PENDING: '미결제',
}

export interface SubscriptionContents {
  id: number
  title: string
  subscription: ServiceId
  paymentAmount: number
  paymentMethod: PaymentMethod
  paymentStatus: paymentStatus
  paymentCycle: PaymentCycle
  paymentDay: number
}

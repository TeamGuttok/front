export const CYCLE_LABELS = {
  YEARLY: '연간',
  MONTHLY: '매월',
  WEEKLY: '매주',
} as const

export const METHOD_LABELS = {
  CARD: '카드',
  BANK_TRANSFER: '계좌이체',
} as const

export type CycleLabelsKey = keyof typeof CYCLE_LABELS
export type MethodLabelsKey = keyof typeof METHOD_LABELS

export const CycleEnum = Object.keys(CYCLE_LABELS) as [
  CycleLabelsKey,
  ...CycleLabelsKey[],
]
export const MethodEnum = Object.keys(METHOD_LABELS) as [
  MethodLabelsKey,
  ...MethodLabelsKey[],
]

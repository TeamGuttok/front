import { twMerge } from 'tailwind-merge'

export function getIconClassName() {
  return twMerge(
    'w-16 h-16 mx-auto flex items-center justify-center',
    'stroke-[hsl(var(--primary))]',
  )
}

export function getMenuClassName() {
  return twMerge(
    'flex items-center gap-2 p-3 text-sub hover:text-primary rounded-md',
  )
}

export function getMobileIconClassName() {
  return twMerge('flex flex-col items-center gap-1 w-24 text-gray-400')
}

export const menuClassName =
  'flex items-center gap-2 p-3 text-sub hover:text-primary rounded-md'

export const groupClassName = 'flex items-start sm:items-center justify-between'

export const labelClassName =
  'block mb-1 sm:mb-0 tracking-wide text-lg font-medium text-nowrap'

export const inputClassName =
  'block w-[12.5rem] sm:max-w-[12.5rem] sm:min-w-[12.5rem] pl-2 text-sm sm:text-base placeholder-[hsl(var(--muted-foreground))]'

export const buttonClassName =
  'w-20 bg-primary text-white rounded-md shadow hover:bg-[hsl(var(--primary-hover))]'

export const getBadgeClass = (status: 'PENDING' | 'COMPLETED') => {
  return status === 'COMPLETED'
    ? 'bg-green-100 text-green-800'
    : 'bg-yellow-100 text-yellow-800'
}

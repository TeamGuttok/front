import { cn } from '#components/lib/utils'

type ErrorMessageProps = {
  errors?: string[]
  className?: string
}

export function ErrorMessage({ errors, className }: ErrorMessageProps) {
  if (!errors || errors.length === 0) return null

  return (
    <p className={cn('text-destructive text-sm', className)}>{errors[0]}</p>
  )
}

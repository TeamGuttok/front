import type { ComponentProps } from 'react'
import Image from 'next/image'
import { cn } from '#components/lib/utils'

interface AvatarProps
  extends Omit<
    ComponentProps<typeof Image>,
    'src' | 'alt' | 'width' | 'height'
  > {
  src: string
  size: number
}

const Avatar = ({ src, size, className, ...props }: AvatarProps) => {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt="프로필 이미지"
      className={cn('rounded-[9999] bg-background', className)}
      {...props}
    />
  )
}

export default Avatar

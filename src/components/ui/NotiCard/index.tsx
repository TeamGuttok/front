'use client'

import { Card } from '#components/_common/Card'
import StatusBadge from '#components/ui/StatusBadge'
import { cn } from '#components/lib/utils'
import type { Notification } from '#types/notification'

interface NotiCardProps {
  item: Notification
  onDelete: (id: number) => void
  onMarkAsRead: (id: number) => void
}

export default function NotiCard({ item, onMarkAsRead }: NotiCardProps) {
  const handleClick = () => {
    if (item.status === 'UNREAD') {
      onMarkAsRead(item.id)
    }
  }

  return (
    <Card
      className={cn(
        'flex justify-between items-center p-4 shadow-md rounded-lg dark:bg-gray-800 bg-white hover:bg-slate-200',
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 relative">
        <div className="flex-col gap-1 pr-10">
          <h3 className="font-medium leading-snug sm:mr-3 mr-1">
            {item.message}
          </h3>
          <p className="text-xs text-gray-600">
            {new Date(item.registerDate).toLocaleString('ko-KR')}
          </p>
        </div>
        {item.status === 'UNREAD' && (
          <StatusBadge variant="notification" status={item.status} />
        )}
      </div>
    </Card>
  )
}

'use client'

import { Card } from '#components/_common/Card'
import { Trash2 } from 'lucide-react'
import StatusBadge from '#components/ui/StatusBadge'
import { cn } from '#components/lib/utils'
import type { Notification } from '#types/notification'

interface NotiCardProps {
  item: Notification
  onDelete: (id: number) => void
  onMarkAsRead: (id: number) => void
}

export default function NotiCard({
  item,
  onDelete,
  onMarkAsRead,
}: NotiCardProps) {
  const handleClick = () => {
    if (item.status === 'UNREAD') {
      onMarkAsRead(item.id)
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(item.id)
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
          <h3 className="font-medium leading-snug">{item.message}</h3>
          <p className="text-xs text-gray-600">
            {new Date(item.registerDate).toLocaleString('ko-KR')}
          </p>
        </div>
        {item.status === 'UNREAD' && (
          <StatusBadge variant="notification" status={item.status} />
        )}
      </div>
      <button
        onClick={handleDelete}
        className="text-red rounded-full p-2 lg:p-3 hover:bg-red-500"
      >
        <Trash2 size={20} />
      </button>
    </Card>
  )
}

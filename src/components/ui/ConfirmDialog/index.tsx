'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onConfirm: () => void
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description = '',
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
        <AlertDialog.Content
          className="fixed top-1/2 left-1/2 w-[90%] max-w-sm
        -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
        >
          <AlertDialog.Title className="text-lg font-medium dark:text-black">
            {title}
          </AlertDialog.Title>
          {description && (
            <AlertDialog.Description className="mt-2 text-sm text-gray-600">
              {description}
            </AlertDialog.Description>
          )}
          <div className="mt-6 flex justify-end gap-4">
            <AlertDialog.Action asChild>
              <button
                type="button"
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                예
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                아니오
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

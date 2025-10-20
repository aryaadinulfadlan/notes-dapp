import { NotesdappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useNotesdappCloseMutation } from '@/features/notesdapp/data-access/use-notesdapp-close-mutation'

export function NotesdappUiButtonClose({ account, notesdapp }: { account: UiWalletAccount; notesdapp: NotesdappAccount }) {
  const closeMutation = useNotesdappCloseMutation({ account, notesdapp })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}

import { NotesdappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useNotesdappSetMutation } from '@/features/notesdapp/data-access/use-notesdapp-set-mutation'

export function NotesdappUiButtonSet({ account, notesdapp }: { account: UiWalletAccount; notesdapp: NotesdappAccount }) {
  const setMutation = useNotesdappSetMutation({ account, notesdapp })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', notesdapp.data.count.toString() ?? '0')
        if (!value || parseInt(value) === notesdapp.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}

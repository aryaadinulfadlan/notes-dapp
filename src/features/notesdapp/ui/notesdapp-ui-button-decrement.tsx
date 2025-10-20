import { NotesdappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useNotesdappDecrementMutation } from '../data-access/use-notesdapp-decrement-mutation'

export function NotesdappUiButtonDecrement({ account, notesdapp }: { account: UiWalletAccount; notesdapp: NotesdappAccount }) {
  const decrementMutation = useNotesdappDecrementMutation({ account, notesdapp })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}

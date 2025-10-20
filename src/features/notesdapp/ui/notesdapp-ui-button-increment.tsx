import { NotesdappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useNotesdappIncrementMutation } from '../data-access/use-notesdapp-increment-mutation'

export function NotesdappUiButtonIncrement({ account, notesdapp }: { account: UiWalletAccount; notesdapp: NotesdappAccount }) {
  const incrementMutation = useNotesdappIncrementMutation({ account, notesdapp })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}

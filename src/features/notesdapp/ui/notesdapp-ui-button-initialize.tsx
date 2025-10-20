import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useNotesdappInitializeMutation } from '@/features/notesdapp/data-access/use-notesdapp-initialize-mutation'

export function NotesdappUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useNotesdappInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Notesdapp {mutationInitialize.isPending && '...'}
    </Button>
  )
}

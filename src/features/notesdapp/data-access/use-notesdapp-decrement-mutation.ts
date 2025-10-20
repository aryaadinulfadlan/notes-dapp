import { NotesdappAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useNotesdappAccountsInvalidate } from './use-notesdapp-accounts-invalidate'

export function useNotesdappDecrementMutation({
  account,
  notesdapp,
}: {
  account: UiWalletAccount
  notesdapp: NotesdappAccount
}) {
  const invalidateAccounts = useNotesdappAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ notesdapp: notesdapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

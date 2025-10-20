import { NotesdappAccount, getIncrementInstruction } from '@project/anchor'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useNotesdappAccountsInvalidate } from './use-notesdapp-accounts-invalidate'

export function useNotesdappIncrementMutation({
  account,
  notesdapp,
}: {
  account: UiWalletAccount
  notesdapp: NotesdappAccount
}) {
  const invalidateAccounts = useNotesdappAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ notesdapp: notesdapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

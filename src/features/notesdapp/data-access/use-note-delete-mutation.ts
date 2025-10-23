import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { install as installEd25519 } from '@solana/webcrypto-ed25519-polyfill'
import { getAddressEncoder, getProgramDerivedAddress } from 'gill'
import { getDeleteNoteInstruction, NOTESDAPP_PROGRAM_ADDRESS } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'
import { useNoteAccountsInvalidate } from './use-note-accounts-invalidate'

// polyfill ed25519 for browsers (to allow `generateKeyPairSigner` to work)
installEd25519()
interface Props {
  account: UiWalletAccount
}
export function useNoteDeleteMutation({ account }: Props) {
  const invalidateNotes = useNoteAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      const [notePda] = await getProgramDerivedAddress({
        programAddress: NOTESDAPP_PROGRAM_ADDRESS,
        seeds: [Buffer.from('note', 'utf8'), getAddressEncoder().encode(signer.address), Buffer.from(title, 'utf8')],
      })
      return await signAndSend(getDeleteNoteInstruction({ author: signer, note: notePda, title }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateNotes()
    },
    onError: () => toast.error('Failed to run program'),
  })
}

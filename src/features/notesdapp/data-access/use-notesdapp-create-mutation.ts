import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { install as installEd25519 } from '@solana/webcrypto-ed25519-polyfill'
import { getAddressEncoder, getProgramDerivedAddress } from 'gill'
import { getCreateNoteInstruction, NOTESDAPP_PROGRAM_ADDRESS } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'

// polyfill ed25519 for browsers (to allow `generateKeyPairSigner` to work)
installEd25519()

export function useNotesdappCreateMutation({
  account,
  title,
  content,
}: {
  account: UiWalletAccount
  title: string
  content: string
}) {
  const { cluster } = useSolana()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => {
      // const titleHash = sha256(Buffer.from(title, 'utf8'))
      const [notePda] = await getProgramDerivedAddress({
        programAddress: NOTESDAPP_PROGRAM_ADDRESS,
        seeds: [Buffer.from('note', 'utf8'), getAddressEncoder().encode(signer.address), Buffer.from(title, 'utf8')],
      })
      return await signAndSend(getCreateNoteInstruction({ author: signer, note: notePda, title, content }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await queryClient.invalidateQueries({ queryKey: ['notesdapp', 'accounts', { cluster }] })
    },
    onError: () => toast.error('Failed to run program'),
  })
}

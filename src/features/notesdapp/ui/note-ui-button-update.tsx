import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'
import { useNoteUpdateMutation } from '../data-access/use-note-update-mutation'
import { Dispatch, SetStateAction } from 'react'

export function NoteUIButtonUpdate({
  account,
  title,
  content,
  setEditable,
}: {
  account: UiWalletAccount
  title: string
  content: string
  setEditable: Dispatch<SetStateAction<boolean>>
}) {
  const mutationUpdate = useNoteUpdateMutation({ account, title, content, setEditable })

  return (
    <Button
      onClick={() => mutationUpdate.mutateAsync()}
      disabled={mutationUpdate.isPending || !content.trim()}
      className="bg-blue-700 text-white"
    >
      Update {mutationUpdate.isPending && '...'}
    </Button>
  )
}

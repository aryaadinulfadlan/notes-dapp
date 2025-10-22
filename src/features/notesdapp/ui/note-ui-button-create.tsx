import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'
import { useNoteCreateMutation } from '../data-access/use-note-create-mutation'

export function NoteUIButtonCreate({
  account,
  title,
  content,
}: {
  account: UiWalletAccount
  title: string
  content: string
}) {
  const mutationCreate = useNoteCreateMutation({ account, title, content })

  return (
    <Button
      onClick={() => mutationCreate.mutateAsync()}
      disabled={mutationCreate.isPending || !title.trim() || !content.trim()}
      className="font-bold md:text-lg md:py-5"
    >
      Create Note {mutationCreate.isPending && '...'}
    </Button>
  )
}

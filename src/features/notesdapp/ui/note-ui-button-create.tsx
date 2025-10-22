import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'
import { useNoteCreateMutation } from '../data-access/use-note-create-mutation'
import { Dispatch, SetStateAction } from 'react'

export function NoteUIButtonCreate({
  account,
  title,
  content,
  setTitle,
  setContent,
}: {
  account: UiWalletAccount
  title: string
  content: string
  setTitle: Dispatch<SetStateAction<string>>
  setContent: Dispatch<SetStateAction<string>>
}) {
  const mutationCreate = useNoteCreateMutation({ account, title, content, setTitle, setContent })

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

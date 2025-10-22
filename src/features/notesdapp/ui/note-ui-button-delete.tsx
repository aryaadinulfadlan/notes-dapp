import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useNoteDeleteMutation } from '../data-access/use-note-delete-mutation'
import { UiWalletAccount } from '@wallet-ui/react'

export function NoteUIButtonDelete({ account, title }: { account: UiWalletAccount; title: string }) {
  const mutationDelete = useNoteDeleteMutation({ account, title })
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-600 text-white">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutationDelete.mutateAsync()} disabled={mutationDelete.isPending}>
            Continue {mutationDelete.isPending && '...'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

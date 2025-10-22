import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'
import { useNotesdappCreateMutation } from '../data-access/use-notesdapp-create-mutation'

export function NotesdappUiButtonCreate({
  account,
  title,
  content,
}: {
  account: UiWalletAccount
  title: string
  content: string
}) {
  const mutationCreate = useNotesdappCreateMutation({ account, title, content })

  return (
    <Button
      onClick={() => mutationCreate.mutateAsync()}
      disabled={mutationCreate.isPending || !title.trim() || !content.trim()}
      variant={'default'}
      className="font-bold md:text-lg md:py-5"
    >
      Create Note {mutationCreate.isPending && '...'}
    </Button>
  )
}

import { useQueryClient } from '@tanstack/react-query'
import { useNoteAccountsQueryKey } from './use-note-accounts-query-key'

export function useNoteAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useNoteAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}

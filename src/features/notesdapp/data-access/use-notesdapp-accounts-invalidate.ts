import { useQueryClient } from '@tanstack/react-query'
import { useNotesdappAccountsQueryKey } from './use-notesdapp-accounts-query-key'

export function useNotesdappAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useNotesdappAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}

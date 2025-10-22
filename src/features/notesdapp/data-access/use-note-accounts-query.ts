import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getNotesdappProgramAccounts } from '@project/anchor'
import { useNoteAccountsQueryKey } from './use-note-accounts-query-key'

export function useNoteAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useNoteAccountsQueryKey(),
    queryFn: async () => await getNotesdappProgramAccounts(client.rpc),
  })
}

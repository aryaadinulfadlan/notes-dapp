import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getNotesdappProgramAccounts } from '@project/anchor'
import { useNotesdappAccountsQueryKey } from './use-notesdapp-accounts-query-key'

export function useNotesdappAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useNotesdappAccountsQueryKey(),
    queryFn: async () => await getNotesdappProgramAccounts(client.rpc),
  })
}

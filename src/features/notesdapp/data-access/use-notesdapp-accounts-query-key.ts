import { useSolana } from '@/components/solana/use-solana'

export function useNotesdappAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['notesdapp', 'accounts', { cluster }]
}

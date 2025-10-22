import { useSolana } from '@/components/solana/use-solana'

export function useNoteAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['notesdapp', 'accounts', { cluster }]
}

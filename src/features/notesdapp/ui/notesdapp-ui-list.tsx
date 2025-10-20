import { NotesdappUiCard } from './notesdapp-ui-card'
import { useNotesdappAccountsQuery } from '@/features/notesdapp/data-access/use-notesdapp-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function NotesdappUiList({ account }: { account: UiWalletAccount }) {
  const notesdappAccountsQuery = useNotesdappAccountsQuery()

  if (notesdappAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!notesdappAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {notesdappAccountsQuery.data?.map((notesdapp) => (
        <NotesdappUiCard account={account} key={notesdapp.address} notesdapp={notesdapp} />
      ))}
    </div>
  )
}

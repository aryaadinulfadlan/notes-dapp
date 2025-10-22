import { useNoteAccountsQuery } from '@/features/notesdapp/data-access/use-note-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'
import { NoteUICard } from './note-ui-card'

export function NoteUIList({ account }: { account: UiWalletAccount }) {
  const notesdappAccountsQuery = useNoteAccountsQuery()
  console.log({ notesdappAccountsQuery })

  if (notesdappAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg mx-auto"></span>
  }

  if (!notesdappAccountsQuery.data?.length) {
    return (
      <div className="text-center mt-10">
        <h2 className={'text-2xl'}>No data available</h2>
        Please create one to get started.
      </div>
    )
  }

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <p className="font-bold text-lg md:text-2xl mb-4">Your Notes:</p>
      <div className="grid gap-4">
        {notesdappAccountsQuery.data?.map((notesdapp) => (
          <NoteUICard account={account} key={notesdapp.address} notesdapp={notesdapp} />
        ))}
      </div>
    </div>
  )
}

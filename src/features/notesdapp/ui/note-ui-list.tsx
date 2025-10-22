import { useNoteAccountsQuery } from '@/features/notesdapp/data-access/use-note-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'
import { NoteUICard } from './note-ui-card'
import { NotesdappAccount } from '@project/anchor'

export function NoteUIList({ account }: { account: UiWalletAccount }) {
  const noteAccountsQuery = useNoteAccountsQuery()
  console.log({ noteAccountsQuery })

  if (noteAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg mx-auto"></span>
  }

  if (!noteAccountsQuery.data?.length) {
    return (
      <div className="text-center mt-10">
        <h2 className={'text-2xl'}>No data available</h2>
        Please create one to get started.
      </div>
    )
  }
  const sortedNotes = [...noteAccountsQuery.data].sort((a: NotesdappAccount, b: NotesdappAccount) => {
    const a_updated_at = Number(a.data.updatedAt) * 1000
    const b_updated_at = Number(b.data.updatedAt) * 1000
    return b_updated_at - a_updated_at
  })
  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <p className="font-bold text-lg md:text-2xl mb-4">Your Notes:</p>
      <div className="grid gap-4">
        {sortedNotes.map((notesdapp) => (
          <NoteUICard account={account} key={notesdapp.address} notesdapp={notesdapp} />
        ))}
      </div>
    </div>
  )
}

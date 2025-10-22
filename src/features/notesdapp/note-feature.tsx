'use client'
import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { NoteUIList } from './ui/note-ui-list'
import { NoteUIProgramExplorerLink } from './ui/note-ui-program-explorer-link'
import { NoteUIProgramGuard } from './ui/note-ui-program-guard'
import NoteUICreate from './ui/note-ui-create'

export default function NoteFeature() {
  const { account } = useSolana()

  return (
    <NoteUIProgramGuard>
      <AppHero
        title="Notes Decentralized Application"
        subtitle={
          account
            ? 'A decentralized note-taking application built on the Solana blockchain using Anchor for smart contract development, Gill for client integration, and Next.js for the frontend.'
            : 'Select a wallet to run the program.'
        }
      >
        <NoteUIProgramExplorerLink />
      </AppHero>
      {account ? (
        <NoteUICreate account={account} />
      ) : (
        <div style={{ display: 'inline-block' }}>
          <WalletDropdown />
        </div>
      )}
      {account ? <NoteUIList account={account} /> : null}
    </NoteUIProgramGuard>
  )
}

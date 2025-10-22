'use client'
import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { NotesdappUiList } from './ui/notesdapp-ui-list'
import { NotesdappUiProgramExplorerLink } from './ui/notesdapp-ui-program-explorer-link'
import { NotesdappUiProgramGuard } from './ui/notesdapp-ui-program-guard'
import NoteCreate from './ui/note-create'

export default function NotesdappFeature() {
  const { account } = useSolana()

  return (
    <NotesdappUiProgramGuard>
      <AppHero
        title="Notes Decentralized Application"
        subtitle={
          account
            ? 'A decentralized note-taking application built on the Solana blockchain using Anchor for smart contract development, Gill for client integration, and Next.js for the frontend.'
            : 'Select a wallet to run the program.'
        }
      >
        <NotesdappUiProgramExplorerLink />
      </AppHero>
      {account ? (
        <NoteCreate account={account} />
      ) : (
        <div style={{ display: 'inline-block' }}>
          <WalletDropdown />
        </div>
      )}
      {account ? <NotesdappUiList account={account} /> : null}
    </NotesdappUiProgramGuard>
  )
}

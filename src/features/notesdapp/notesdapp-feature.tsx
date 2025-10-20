import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { NotesdappUiButtonInitialize } from './ui/notesdapp-ui-button-initialize'
import { NotesdappUiList } from './ui/notesdapp-ui-list'
import { NotesdappUiProgramExplorerLink } from './ui/notesdapp-ui-program-explorer-link'
import { NotesdappUiProgramGuard } from './ui/notesdapp-ui-program-guard'

export default function NotesdappFeature() {
  const { account } = useSolana()

  return (
    <NotesdappUiProgramGuard>
      <AppHero
        title="Notesdapp"
        subtitle={
          account
            ? "Initialize a new notesdapp onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <NotesdappUiProgramExplorerLink />
        </p>
        {account ? (
          <NotesdappUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <NotesdappUiList account={account} /> : null}
    </NotesdappUiProgramGuard>
  )
}

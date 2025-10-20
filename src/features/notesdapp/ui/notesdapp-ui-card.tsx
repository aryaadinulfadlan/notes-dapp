import { NotesdappAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { NotesdappUiButtonClose } from './notesdapp-ui-button-close'
import { NotesdappUiButtonDecrement } from './notesdapp-ui-button-decrement'
import { NotesdappUiButtonIncrement } from './notesdapp-ui-button-increment'
import { NotesdappUiButtonSet } from './notesdapp-ui-button-set'

export function NotesdappUiCard({ account, notesdapp }: { account: UiWalletAccount; notesdapp: NotesdappAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notesdapp: {notesdapp.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={notesdapp.address} label={ellipsify(notesdapp.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <NotesdappUiButtonIncrement account={account} notesdapp={notesdapp} />
          <NotesdappUiButtonSet account={account} notesdapp={notesdapp} />
          <NotesdappUiButtonDecrement account={account} notesdapp={notesdapp} />
          <NotesdappUiButtonClose account={account} notesdapp={notesdapp} />
        </div>
      </CardContent>
    </Card>
  )
}

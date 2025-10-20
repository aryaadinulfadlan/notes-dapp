import { NOTESDAPP_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function NotesdappUiProgramExplorerLink() {
  return <AppExplorerLink address={NOTESDAPP_PROGRAM_ADDRESS} label={ellipsify(NOTESDAPP_PROGRAM_ADDRESS)} />
}

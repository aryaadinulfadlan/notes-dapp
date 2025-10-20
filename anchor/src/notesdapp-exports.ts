// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Notesdapp, NOTESDAPP_DISCRIMINATOR, NOTESDAPP_PROGRAM_ADDRESS, getNotesdappDecoder } from './client/js'
import NotesdappIDL from '../target/idl/notesdapp.json'

export type NotesdappAccount = Account<Notesdapp, string>

// Re-export the generated IDL and type
export { NotesdappIDL }

export * from './client/js'

export function getNotesdappProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getNotesdappDecoder(),
    filter: getBase58Decoder().decode(NOTESDAPP_DISCRIMINATOR),
    programAddress: NOTESDAPP_PROGRAM_ADDRESS,
  })
}

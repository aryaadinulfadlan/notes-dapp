// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Note, NOTE_DISCRIMINATOR, NOTESDAPP_PROGRAM_ADDRESS, getNoteDecoder } from './client/js'
import NotesdappIDL from '../target/idl/notesdapp.json'

export type NotesdappAccount = Account<Note, string>

// Re-export the generated IDL and type
export { NotesdappIDL }

export * from './client/js'

export function getNotesdappProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getNoteDecoder(),
    filter: getBase58Decoder().decode(NOTE_DISCRIMINATOR),
    programAddress: NOTESDAPP_PROGRAM_ADDRESS,
  })
}

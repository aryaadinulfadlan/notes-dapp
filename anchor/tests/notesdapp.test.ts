import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  getAddressEncoder,
  getProgramDerivedAddress,
  Instruction,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import { fetchNote, getCreateNoteInstruction, getUpdateNoteInstruction, NOTESDAPP_PROGRAM_ADDRESS } from '../src'

import { loadKeypairSignerFromFile } from 'gill/node'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

describe('notesdapp', () => {
  let payer: KeyPairSigner

  beforeAll(async () => {
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!)
  })

  it('should create note data', async () => {
    expect.assertions(3)
    const title = 'Data Structure'
    const content = 'Why do you need to understand Data Structure concept'
    const [notePda] = await getProgramDerivedAddress({
      programAddress: NOTESDAPP_PROGRAM_ADDRESS,
      seeds: [Buffer.from('note', 'utf8'), getAddressEncoder().encode(payer.address), Buffer.from(title, 'utf8')],
    })
    const ix = getCreateNoteInstruction({
      author: payer,
      title,
      content,
      note: notePda,
    })
    const sx = await sendAndConfirm({ ix, payer })
    expect(sx).toBeDefined()
    const currentNote = await fetchNote(rpc, notePda)
    expect(currentNote.data.title).toEqual(title)
    expect(currentNote.data.content).toEqual(content)
  })
  it('should update note data', async () => {
    expect.assertions(6)
    const title = 'Data Structure New'
    const content = 'Why do you need to understand Data Structure concept New'
    const [notePda] = await getProgramDerivedAddress({
      programAddress: NOTESDAPP_PROGRAM_ADDRESS,
      seeds: [Buffer.from('note', 'utf8'), getAddressEncoder().encode(payer.address), Buffer.from(title, 'utf8')],
    })
    const ix = getCreateNoteInstruction({
      author: payer,
      title,
      content,
      note: notePda,
    })
    const sx = await sendAndConfirm({ ix, payer })
    expect(sx).toBeDefined()
    const currentNote = await fetchNote(rpc, notePda)
    expect(currentNote.data.title).toEqual(title)
    expect(currentNote.data.content).toEqual(content)

    const updatedContent = 'Content updated'
    const ixUpdate = getUpdateNoteInstruction({
      author: payer,
      title,
      content: updatedContent,
      note: notePda,
    })
    const sxUpdate = await sendAndConfirm({ ix: ixUpdate, payer })
    expect(sxUpdate).toBeDefined()
    const updatedNote = await fetchNote(rpc, notePda)
    expect(updatedNote.data.title).toEqual(title)
    expect(updatedNote.data.content).toEqual(updatedContent)
  })
})

let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}

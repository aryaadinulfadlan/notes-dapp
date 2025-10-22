import { NotesdappAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { NoteUIButtonUpdate } from './note-ui-button-update'
import { NoteUIButtonDelete } from './note-ui-button-delete'

interface Props {
  account: UiWalletAccount
  notesdapp: NotesdappAccount
}
export function NoteUICard({ account, notesdapp }: Props) {
  const createdAt = new Date(Number(notesdapp.data.createdAt) * 1000).toLocaleString()
  const updatedAt = new Date(Number(notesdapp.data.updatedAt) * 1000).toLocaleString()
  const [editable, setEditable] = useState(false)
  const [content, setContent] = useState(notesdapp.data.content)
  const handleCancel = () => {
    setEditable(false)
    setContent(notesdapp.data.content)
  }
  return (
    <Card className="py-0 p-2">
      <CardHeader className="px-2">
        <p className="text-sm md:text-base">
          <span className="font-bold">Title:</span> {notesdapp.data.title}
        </p>
        {editable ? (
          <div className="grid gap-1">
            <label htmlFor="content" className="font-bold">
              Content
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content here.."
              className="text-white px-1.5 py-1 rounded-sm border border-gray-300"
            />
          </div>
        ) : (
          <p className="text-sm md:text-base">
            <span className="font-bold">Content:</span> {notesdapp.data.content}
          </p>
        )}
        <p className="text-xs md:text-sm">
          <span className="font-bold">Created At:</span> {createdAt}
        </p>
        <p className="text-xs md:text-sm">
          <span className="font-bold">Updated At:</span> {updatedAt}
        </p>
        <CardDescription>
          Account: <AppExplorerLink address={notesdapp.address} label={ellipsify(notesdapp.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 flex items-center gap-4">
        {editable ? (
          <div className="flex items-center gap-4">
            <Button className="bg-gray-600 text-white" onClick={handleCancel}>
              Cancel
            </Button>
            <NoteUIButtonUpdate
              account={account}
              title={notesdapp.data.title}
              content={content}
              setEditable={setEditable}
            />
          </div>
        ) : (
          <>
            <Button className="bg-gray-600 text-white" onClick={() => setEditable(true)}>
              Edit
            </Button>
            <NoteUIButtonDelete account={account} title={notesdapp.data.title} />
          </>
        )}
        {/* <div className="flex gap-4 justify-evenly">
          <NotesdappUiButtonIncrement account={account} notesdapp={notesdapp} />
          <NotesdappUiButtonSet account={account} notesdapp={notesdapp} />
          <NotesdappUiButtonDecrement account={account} notesdapp={notesdapp} />
          <NotesdappUiButtonClose account={account} notesdapp={notesdapp} />
        </div> */}
      </CardContent>
    </Card>
  )
}

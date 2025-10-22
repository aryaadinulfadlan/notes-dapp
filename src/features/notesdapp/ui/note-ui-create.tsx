import React, { useState } from 'react'
import { NoteUIButtonCreate } from './note-ui-button-create'
import { UiWalletAccount } from '@wallet-ui/react'

interface Props {
  account: UiWalletAccount
}
export default function NoteUICreate({ account }: Props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <div className="flex flex-col gap-4 mt-2 max-w-2xl mx-auto">
      <p className="font-bold">Create New Note</p>
      <div className="grid gap-1.5">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title here.."
          className="text-white px-2 py-1.5 rounded-sm border border-gray-300"
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="content">Content</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content here.."
          className="text-white px-2 py-1.5 rounded-sm border border-gray-300"
        />
      </div>
      <NoteUIButtonCreate account={account} title={title} content={content} />
    </div>
  )
}

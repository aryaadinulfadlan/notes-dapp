import { NotesdappAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { NoteUIButtonDelete } from './note-ui-button-delete'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { useNoteUpdateMutation } from '../data-access/use-note-update-mutation'
import { formatDate } from '@/lib/format'

interface Props {
  account: UiWalletAccount
  notesdapp: NotesdappAccount
}
const formSchema = z.object({
  content: z
    .string()
    .min(20, 'Content must be at least 20 characters.')
    .max(100, 'Content must be at most 100 characters.'),
})
export function NoteUICard({ account, notesdapp }: Props) {
  const createdAt = formatDate(Number(notesdapp.data.createdAt) * 1000)
  const updatedAt = formatDate(Number(notesdapp.data.updatedAt) * 1000)
  const [editable, setEditable] = useState(false)
  const mutationUpdate = useNoteUpdateMutation({ account })
  const { control, handleSubmit, setValue, clearErrors } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: notesdapp.data.content,
    },
  })
  function onSubmit({ content }: z.infer<typeof formSchema>) {
    setEditable(false)
    mutationUpdate.mutateAsync({ title: notesdapp.data.title, content })
  }
  const handleCancel = () => {
    setEditable(false)
    setValue('content', notesdapp.data.content)
    clearErrors('content')
  }
  return (
    <Card className="py-0 p-2 gap-4">
      <CardContent className="px-2 grid gap-1">
        <p className="text-sm md:text-base">
          <span className="font-bold">Title: &nbsp;</span>
          <span>{notesdapp.data.title}</span>
        </p>
        {editable ? (
          <form id="update-note-form" className="grid gap-1" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="content"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="mb-2">
                    <FieldLabel className="font-bold text-base" htmlFor="content">
                      Content
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="content"
                        placeholder="Content here.."
                        rows={4}
                        className="min-h-20 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">{field.value.length}/100 characters</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        ) : (
          <p className="text-sm md:text-base">
            <span className="font-bold">Content: &nbsp;</span>
            {/* <span className="block overflow-hidden whitespace-nowrap text-ellipsis">{notesdapp.data.content}</span> */}
            <span className="wrap-break-word break-all">{notesdapp.data.content}</span>
          </p>
        )}
        <p className="text-xs md:text-sm">
          <span className="font-bold">Created At: &nbsp;</span>
          {createdAt}
        </p>
        <p className="text-xs md:text-sm">
          <span className="font-bold">Updated At: &nbsp;</span>
          {updatedAt}
        </p>
        <CardDescription>
          Account: <AppExplorerLink address={notesdapp.address} label={ellipsify(notesdapp.address)} />
        </CardDescription>
      </CardContent>
      <CardFooter className="px-2 flex items-center gap-4">
        {editable ? (
          <div className="flex items-center gap-4">
            <Button className="bg-gray-600 text-white" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              disabled={mutationUpdate.isPending}
              type="submit"
              form="update-note-form"
              className="font-bold md:col-start-2 bg-blue-700 text-white"
            >
              Update {mutationUpdate.isPending && '..'}
            </Button>
          </div>
        ) : (
          <>
            <Button className="bg-gray-600 text-white" onClick={() => setEditable(true)}>
              Edit
            </Button>
            <NoteUIButtonDelete account={account} title={notesdapp.data.title} />
          </>
        )}
      </CardFooter>
    </Card>
  )
}

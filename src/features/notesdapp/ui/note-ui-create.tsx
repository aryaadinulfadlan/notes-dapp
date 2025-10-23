import { UiWalletAccount } from '@wallet-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'
import { useNoteCreateMutation } from '../data-access/use-note-create-mutation'

interface Props {
  account: UiWalletAccount
}
const formSchema = z.object({
  title: z.string().min(4, 'Title must be at least 4 characters.').max(20, 'Title must be at most 20 characters.'),
  content: z
    .string()
    .min(20, 'Content must be at least 20 characters.')
    .max(100, 'Content must be at most 100 characters.'),
})
export default function NoteUICreate({ account }: Props) {
  const mutationCreate = useNoteCreateMutation({ account })
  const { control, reset, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })
  function onSubmit({ title, content }: z.infer<typeof formSchema>) {
    reset()
    mutationCreate.mutateAsync({ title, content })
  }
  return (
    <div className="flex flex-col gap-4 mt-2 max-w-2xl mx-auto">
      <p className="font-bold">Create New Note</p>
      <form id="create-note-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Title here.."
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="content"
                    placeholder="Content here.."
                    rows={6}
                    className="min-h-24 resize-none"
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
      <div className="grid gap-4 md:grid-cols-2">
        <Button
          disabled={mutationCreate.isPending}
          type="submit"
          form="create-note-form"
          className="font-bold md:col-start-2"
        >
          Create Note {mutationCreate.isPending && '..'}
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="font-semibold md:col-start-1 md:row-start-1"
          onClick={() => reset()}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

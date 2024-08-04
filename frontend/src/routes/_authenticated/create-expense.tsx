import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { api } from "@/lib/api"

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense
})

function CreateExpense() {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0
    },
    onSubmit: async ({value}) => {
        await new Promise(r => setTimeout(r, 3000))
        const res = await api.expenses.$post({ json: value })
        if (!res.ok) {
          throw new Error("Server Error")
        }
        navigate({to: "/expenses"})
    }
  })

    return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          e.stopPropagation(); 
          void form.handleSubmit();
        }}
        className='max-w-xl m-auto' >
        <form.Field
          name='title'
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </>
          )}
        />

        <form.Field
          name='amount'
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='number'
                onChange={e => field.handleChange(Number(e.target.value))}
              />
              {field.state.meta.errors ? (
                <em>{field.state.meta.errors.join(', ')}</em>
              ) : null}
            </>
          )}
        />
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className="mt-4" type='submit' disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
      </div>
    </div>
    )
}
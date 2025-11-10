/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createFileRoute } from '@tanstack/react-router'
import { useForm, type AnyFieldApi } from '@tanstack/react-form'
import type { Bet } from '../../models/Bet'

export const Route = createFileRoute('/bet/new')({
  component: NewBet,
})

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validation...' : null}
    </>
  )
}

function NewBet() {
  const defaultBet: Bet = {
    date: new Date().toISOString().slice(0, 16),
    bookmaker: 'Winamax',
    sport: 'Football',
    type: 'Buteur',
    bet: 10,
    cote: 1,
    isWin: true,
    money: 10,
  }

  const form = useForm({
    defaultValues: defaultBet,
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-4xl p-8">Nouveau Bet</h1>

        <div className="p-8">
          <form
            className="flex flex-col space-y-2"
            onSubmit={(e) => {
              ;(e.preventDefault(), e.stopPropagation(), form.handleSubmit())
            }}
          >
            <form.Field
              name="date"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Une date est requise' : undefined,
                onChangeAsyncDebounceMs: 200,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') &&
                    "Pas d'erreur autorisée dans date"
                  )
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Date:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="datetime-local"
                      className="input"
                    />
                    <FieldInfo field={field} />
                  </>
                )
              }}
            />

            <form.Field
              name="bookmaker"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Un bookmaker est requis' : undefined,
                onChangeAsyncDebounceMs: 200,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') &&
                    "Pas d'erreur autorisée dans bookmaker"
                  )
                },
              }}
              children={(field) => {
                return (
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="select"
                  >
                    <option disabled={true}>Choisi un bookmaker</option>
                    <option>Winamax</option>
                    <option>Unibet</option>
                    <option>Betclic</option>
                  </select>
                )
              }}
            />

            <form.Field
              name="sport"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Un sport est requis' : undefined,
                onChangeAsyncDebounceMs: 200,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') &&
                    "Pas d'erreur autorisée dans sport"
                  )
                },
              }}
              children={(field) => {
                return (
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="select"
                  >
                    <option disabled={true}>Choisi un sport</option>
                    <option>Tennis</option>
                    <option>Football</option>
                    <option>Basket</option>
                  </select>
                )
              }}
            />

            <form.Field
              name="type"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Un type est requis' : undefined,
                onChangeAsyncDebounceMs: 200,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') &&
                    "Pas d'erreur autorisée dans type"
                  )
                },
              }}
              children={(field) => {
                return (
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="select"
                  >
                    <option disabled={true}>Choisi un type de paris</option>
                    <option>1N2</option>
                    <option>Mi-temps</option>
                    <option>Set gagnant</option>
                  </select>
                )
              }}
            />

            <form.Field
              name="bet"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Une mise est requise' : undefined,
                onChangeAsyncDebounceMs: 200,
                onChangeAsync: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Mise</label>
                    <input
                      defaultValue={field.state.value}
                      name={field.name}
                      type="number"
                      className="input validator"
                      required
                      placeholder="10"
                      min="1"
                      max="1000"
                      title="Mise"
                    />
                    <p className="validator-hint">Doit être entre 1 et 1000</p>
                  </>
                )
              }}
            />

            <form.Field
              name="cote"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Une cote est requise' : undefined,
                onChangeAsyncDebounceMs: 200,
                onChangeAsync: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Côte</label>
                    <input
                      defaultValue={field.state.value}
                      name={field.name}
                      type="number"
                      className="input validator"
                      required
                      placeholder="10"
                      min="1"
                      max="100"
                      title={field.name}
                    />
                    <p className="validator-hint">Doit être entre 1 et 100</p>
                  </>
                )
              }}
            />

            <form.Field name="isWin">
              {(field) => (
                <div>
                  <div className="flex flex-col space-x-1">
                    <label htmlFor={field.name}>
                      <input
                        defaultChecked
                        type="radio"
                        name={field.name}
                        onChange={() => {
                          field.handleChange(true)
                        }}
                      />
                      Oui
                    </label>
                  </div>
                  <div>
                    <label htmlFor={field.name}>
                      <input
                        type="radio"
                        name={field.name}
                        onChange={() => {
                          field.handleChange(false)
                        }}
                      />
                      Non
                    </label>
                  </div>
                  {field.state.meta.errors?.length ? (
                    <p className="validator-hint">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field
              name="money"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Une mise est requise' : undefined,
                onChangeAsyncDebounceMs: 200,
                onChangeAsync: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                },
              }}
              children={(field) => {
                return (
                  <>
                    <input
                      defaultValue={field.state.value}
                      name={field.name}
                      type="number"
                      className="input validator"
                      required
                      placeholder="10"
                      min="1"
                      max="100000"
                      title="Mise"
                    />
                    <p className="validator-hint">Doit être rempli</p>
                  </>
                )
              }}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="border-2 border-white-200 w-1/3"
                >
                  {isSubmitting ? '...' : 'Submit'}
                </button>
              )}
            />
          </form>
        </div>
      </div>
    </>
  )
}

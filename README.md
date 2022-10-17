# React Store

This library is an experiment attempting to solve the problem of a "gap" between simple storage via React APIs and complex storage via `useReducer` and Redux RTK, among others. This "gap" problem has arguably been solved by Immer, but what remains are certain ergonomic issues, or developer experience (DX) issues.

React Store is a _very_ light wrapper around Immer and exposes a consistent storage interface.

## When should I use this?

`useStore` is useful when you want a bit more convenience over `useImmer`. `useImmer` does not have a concept of `merge`, taking a data partial. Also, `mutate` return is ignored, while the `useImmer` set-function return is affecting. (If you want to leverage the `useImmer` return functionality, you should use Immer.)

`createContextStore` is a useful abstraction over the "migration to contexts". It's a simple transition from `useStore` to `useStore`, with no changes in behavior, but now in a reusable context-based store.

## API

### `useStore`

`useStore` takes an initial state and returns `{ state, mutate, merge }`

```js
const { state, mutate, merge } = useState({ a: 1, b: 'two' })

state.a // 1
state.b // 'two'

mutate((s) => (s.a = 3))

merge({ b: 'four' })
```

- `state`: The current state
- `mutate`: A function that updates state based on a provided Immer draft-function.
- `merge`: A function that updates state based on a state partial.

### `createContextStore`

`createContextStore` takes an initial state and returns `{ Store, useStore }`

```js
const { Store, useStore } = createContextStore({ a: 1, b: 'two' })

function Parent() {
  return (
    <Store>
      <Child />
    </Store>
  )
}

function Child() {
  const { state, mutate, merge } = useStore()

  state.a // 1
  state.b // 'two'

  mutate((s) => (s.a = 3)) // ... a: 3

  merge({ b: 'four' }) // ... b: 'four'
}
```

- `Store`: A context-provider component
- `useStore`: A hook with the same API as it's "simpler" version, except it
  takes no arguments. (The initial state is provided via `createContextStore`
  instead.)

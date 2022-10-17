import { createContext, useContext } from 'react'
import { DraftFunction, useImmer, Updater } from 'use-immer'

function buildMutate<State>(setState: Updater<State>) {
  return (f: DraftFunction<State>) => {
    setState((draft) => {
      f(draft)
    })
  }
}

function buildMerge<State>(setState: Updater<State>) {
  return (partial: Partial<State>) => {
    setState((draft) => {
      Object.entries(partial).forEach(([k, v]) => {
        draft[k] = v
      })
    })
  }
}

export function useStore<State>(initState: State) {
  const [state, setState] = useImmer(initState)
  return { state, mutate: buildMutate(setState), merge: buildMerge(setState) }
}

export function createContextStore<State>(initState: State) {
  const StateContext = createContext<{
    state: State
    mutate: (f: DraftFunction<State>) => void
    merge: (p: Partial<State>) => void
  }>({
    state: initState,
    mutate: () => undefined,
    merge: () => undefined,
  })

  return {
    Store({ children }) {
      const [state, setState] = useImmer(initState)

      return (
        <StateContext.Provider
          value={{
            state,
            mutate: buildMutate(setState),
            merge: buildMerge(setState),
          }}
        >
          {children}
        </StateContext.Provider>
      )
    },
    useStore() {
      const { state, mutate, merge } = useContext(StateContext)
      return { state, mutate, merge }
    },
  }
}

import { createContext, useContext } from 'react'
import { DraftFunction, Updater, useImmer } from 'use-immer'

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

export function useStore<State>(defaultState: State) {
  const [state, setState] = useImmer(defaultState)
  return { state, mutate: buildMutate(setState), merge: buildMerge(setState) }
}

export function createContextStore<State>(defaultState: State) {
  const StateContext = createContext<{
    state: State
    mutate: (f: DraftFunction<State>) => void
    merge: (p: Partial<State>) => void
  }>({
    state: defaultState,
    mutate: () => undefined,
    merge: () => undefined,
  })

  return {
    Store({ children }) {
      const [state, setState] = useImmer(defaultState)

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

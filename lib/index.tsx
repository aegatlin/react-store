import { createContext, ReactNode, useContext } from 'react'
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

interface UseStoreReturn<State> {
  state: State
  merge: (partial: Partial<State>) => void
  mutate: (f: DraftFunction<State>) => void
}

/**
 * @function useStore
 * @param {State} defaultState - the initial state
 * @returns {UseStoreReturn<State>} { state, mutate, merge }
 */
export function useStore<State>(defaultState: State): UseStoreReturn<State> {
  const [state, setState] = useImmer(defaultState)
  return { state, mutate: buildMutate(setState), merge: buildMerge(setState) }
}

/**
 * @function createContextStore
 * @param {State} defaultState - the initial state
 */
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
    Store({ state, children }: { state?: State; children: ReactNode }) {
      const [_state, _setState] = useImmer(state || defaultState)

      return (
        <StateContext.Provider
          value={{
            state: _state,
            mutate: buildMutate(_setState),
            merge: buildMerge(_setState),
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

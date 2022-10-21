import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { useImmer } from 'use-immer';
function buildMutate(setState) {
    return (f) => {
        setState((draft) => {
            f(draft);
        });
    };
}
function buildMerge(setState) {
    return (partial) => {
        setState((draft) => {
            Object.entries(partial).forEach(([k, v]) => {
                draft[k] = v;
            });
        });
    };
}
/**
 * @function useStore
 * @param {State} defaultState - the initial state
 * @returns {UseStoreReturn<State>} { state, mutate, merge }
 */
export function useStore(defaultState) {
    const [state, setState] = useImmer(defaultState);
    return { state, mutate: buildMutate(setState), merge: buildMerge(setState) };
}
/**
 * @function createContextStore
 * @param {State} defaultState - the initial state
 */
export function createContextStore(defaultState) {
    const StateContext = createContext({
        state: defaultState,
        mutate: () => undefined,
        merge: () => undefined,
    });
    return {
        Store({ state, children }) {
            const [_state, _setState] = useImmer(state || defaultState);
            return (_jsx(StateContext.Provider, Object.assign({ value: {
                    state: _state,
                    mutate: buildMutate(_setState),
                    merge: buildMerge(_setState),
                } }, { children: children })));
        },
        useStore() {
            const { state, mutate, merge } = useContext(StateContext);
            return { state, mutate, merge };
        },
    };
}

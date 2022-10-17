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
export function useStore(initState) {
    const [state, setState] = useImmer(initState);
    return { state, mutate: buildMutate(setState), merge: buildMerge(setState) };
}
export function createContextStore(initState) {
    const StateContext = createContext({
        state: initState,
        mutate: () => undefined,
        merge: () => undefined,
    });
    return {
        Store({ children }) {
            const [state, setState] = useImmer(initState);
            return (_jsx(StateContext.Provider, Object.assign({ value: {
                    state,
                    mutate: buildMutate(setState),
                    merge: buildMerge(setState),
                } }, { children: children })));
        },
        useStore() {
            const { state, mutate, merge } = useContext(StateContext);
            return { state, mutate, merge };
        },
    };
}

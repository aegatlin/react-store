import { ReactNode } from 'react';
import { DraftFunction } from 'use-immer';
interface UseStoreReturn<State> {
    state: State;
    merge: (partial: Partial<State>) => void;
    mutate: (f: DraftFunction<State>) => void;
}
/**
 * @function useStore
 * @param {State} defaultState - the initial state
 * @returns {UseStoreReturn<State>} { state, mutate, merge }
 */
export declare function useStore<State>(defaultState: State): UseStoreReturn<State>;
/**
 * @function createContextStore
 * @param {State} defaultState - the initial state
 */
export declare function createContextStore<State>(defaultState: State): {
    Store({ state, children }: {
        state?: State;
        children: ReactNode;
    }): JSX.Element;
    useStore(): {
        state: State;
        mutate: (f: DraftFunction<State>) => void;
        merge: (p: Partial<State>) => void;
    };
};
export {};

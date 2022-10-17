import { DraftFunction } from 'use-immer';
export declare function useStore<State>(initState: State): {
    state: State;
    mutate: (f: DraftFunction<State>) => void;
    merge: (partial: Partial<State>) => void;
};
export declare function createContextStore<State>(initState: State): {
    Store({ children }: {
        children: any;
    }): JSX.Element;
    useStore(): {
        state: State;
        mutate: (f: DraftFunction<State>) => void;
        merge: (p: Partial<State>) => void;
    };
};

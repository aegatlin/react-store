import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { create } from 'react-test-renderer';
import { useStore } from './index.js';
function Parent() {
    const { state, merge, mutate } = useStore({ a: 1, b: { c: 3 } });
    console.log('from parent', state);
    useEffect(() => {
        merge({ b: { c: 'wow' } });
        mutate((s) => (s.a = s.a + 1));
    }, []);
    return (_jsxs("div", { children: [_jsx("div", Object.assign({ id: "a" }, { children: state.a })), _jsx("div", Object.assign({ id: "b" }, { children: state.b.c }))] }));
}
let root;
root = create(_jsx(Parent, {}));
const a = root.root.findByProps({ id: 'a' });
const b = root.root.findByProps({ id: 'b' });
console.log(a.type, a.props, a.children);
console.log(b.type, b.props, b.children);
root.update(_jsx(Parent, {}));
const aa = root.root.findByProps({ id: 'a' });
const bb = root.root.findByProps({ id: 'b' });
console.log(aa.type, aa.props, aa.children);
console.log(bb.type, bb.props, bb.children);

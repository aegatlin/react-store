import assert from 'assert/strict'
import { describe, it } from 'node:test'
import { createElement, useEffect } from 'react'
import { create } from 'react-test-renderer'
import { createContextStore } from '../dist/index.js'

describe('createContextStore', () => {
  it('works with merge', () => {
    const { Store, useStore } = createContextStore({ a: 1 })

    function Parent() {
      return createElement(Store, null, createElement(Child, null, null))
    }

    function Child() {
      const { state, merge } = useStore()
      useEffect(() => merge({ a: 5 }), [])
      return createElement('div', { a: state.a }, null)
    }

    const c = createElement(Parent, null, null)
    const testRenderer = create(c)
    let actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 1)

    testRenderer.update(c)
    actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 5)
  })

  it('works with mutate', () => {
    const { Store, useStore } = createContextStore({ a: 1 })

    function Parent() {
      return createElement(Store, null, createElement(Child, null, null))
    }

    function Child() {
      const { state, mutate } = useStore()
      useEffect(() => mutate((s) => (s.a = 6)), [])
      return createElement('div', { a: state.a }, null)
    }

    const c = createElement(Parent, null, null)
    const testRenderer = create(c)
    let actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 1)

    testRenderer.update(c)
    actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 6)
  })

  it('works with Store prop "state"', () => {
    const { Store, useStore } = createContextStore({ a: 1 })

    function Parent() {
      return createElement(
        Store,
        { state: { a: 2 } },
        createElement(Child, null, null)
      )
    }

    function Child() {
      const { state, merge } = useStore()
      useEffect(() => merge({ a: 7 }), [])
      return createElement('div', { a: state.a }, null)
    }

    const c = createElement(Parent, null, null)
    const testRenderer = create(c)
    let actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 2)

    testRenderer.update(c)
    actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 7)
  })
})

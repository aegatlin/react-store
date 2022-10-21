import React, { useEffect } from 'react'
import { create } from 'react-test-renderer'
import { useStore } from '../dist/index.js'
import assert from 'assert/strict'
import { it, describe } from 'node:test'

describe('useStore', () => {
  it('updates via mutate', () => {
    function C() {
      const { state, mutate } = useStore({ a: 1 })
      useEffect(() => mutate((s) => (s.a = 3)), [])
      return React.createElement('div', { a: state.a }, null)
    }

    const c = React.createElement(C, null, null)
    const testRenderer = create(c)
    let actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 1)

    testRenderer.update(c)
    actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 3)
  })

  it('updates via merge', () => {
    function C() {
      const { state, merge } = useStore({ a: 1 })
      useEffect(() => merge({ a: 4 }), [])
      return React.createElement('div', { a: state.a }, null)
    }

    const c = React.createElement(C, null, null)
    const testRenderer = create(c)
    let actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 1)

    testRenderer.update(c)
    actual = testRenderer.root.findByType('div').props.a

    assert.deepEqual(actual, 4)
  })
})

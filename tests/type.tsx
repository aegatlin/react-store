import { useEffect } from 'react'
import { useStore } from '../lib/index'

// All these examples should throw type errors
// I use VSCode and make sure each line has a squiggly red line
function Component() {
  const { state, merge, mutate } = useStore({ a: 1, b: { c: 3 } })

  // Valid updates
  useEffect(() => {
    merge({})
  })

  // Invalid updates: Type errors
  // Should have a squiggly red line in vscode
  useEffect(() => {
    merge({ b: { c: 'wow' } })
    merge({ b: { c: {} } })
    merge({ b: {} })
    merge({ b: '' })
    merge({ d: 5 })

    mutate((s) => (s.a = 'wow'))
    mutate((s) => (s.a = {}))
    mutate((s) => (s.d = 5))
    mutate((s) => (s.b = {}))
  }, [])

  return null
}

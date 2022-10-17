import { useEffect } from 'react'
import { useStore } from '../lib/index'

function Parent() {
  const { state, merge, mutate } = useStore({ a: 1, b: { c: 3 } })

  useEffect(() => {
    merge({ b: { c: 'wow' } })
    merge({ b: { c: {} } })
    merge({ b: '' })
    merge({})
    merge({ d: 5 })

    mutate((s) => (s.a = 'wow'))
    mutate((s) => (s.a = {}))
    mutate((s) => (s.d = 5))
  }, [])

  return <div></div>
}

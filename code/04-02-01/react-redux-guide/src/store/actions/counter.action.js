// import { DECREMENT, INCREMENT, INCREMENT_ASYNC } from '../const/counter.const'
//
// export const increment = (payload) => ({ type: INCREMENT, payload })
// export const decrement = (payload) => ({ type: DECREMENT, payload })
//
// export const increment_async = (payload) => ({ type: INCREMENT_ASYNC, payload })

import { createAction } from 'redux-actions'

export const increment = createAction('increment')
export const decrement = createAction('decrement')
export const increment_async = createAction('increment_async')

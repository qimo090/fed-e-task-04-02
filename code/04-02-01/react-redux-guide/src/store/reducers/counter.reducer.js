// import { DECREMENT, INCREMENT } from '../const/counter.const'
//
// const initialState = {
//   count: 0,
// }
//
// export default function countReducer (state = initialState, action) {
//   switch (action.type) {
//     case INCREMENT:
//       return { ...state, count: state.count + action.payload }
//     case DECREMENT:
//       return { ...state, count: state.count - action.payload }
//     default:
//       return state
//   }
// }

import { handleActions } from 'redux-actions'
import { decrement, increment } from '../actions/counter.action'

const initialState = { count: 0 }

export default handleActions({
  [increment]: (state, action) => ({ count: state.count + action.payload }),
  [decrement]: (state, action) => ({ count: state.count - action.payload }),
}, initialState)


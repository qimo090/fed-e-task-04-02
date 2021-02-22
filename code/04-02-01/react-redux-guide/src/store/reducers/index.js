import { combineReducers } from 'redux'

import CountReducer from './counter.reducer'
import ModalReducer from './modal.reducer'

// { counter: { count: 0 }, modal: { show: false } }
export default combineReducers({
  counter: CountReducer,
  modal: ModalReducer,
})

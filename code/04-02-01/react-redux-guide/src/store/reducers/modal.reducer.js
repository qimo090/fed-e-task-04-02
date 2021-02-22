import { HIDE_MODAL, SHOW_MODAL } from '../const/modal.const'

const initialState = {
  show: false,
}

export default function modalReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, show: true }
    case HIDE_MODAL:
      return { ...state, show: false }
    default:
      return state
  }
}

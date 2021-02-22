import { handleActions } from 'redux-actions'
import { saveProducts } from '../actions/product.action'

const initialState = []

const handleSaveProducts = (state, action) => action.payload

export default handleActions({
  [saveProducts]: handleSaveProducts,
}, initialState)

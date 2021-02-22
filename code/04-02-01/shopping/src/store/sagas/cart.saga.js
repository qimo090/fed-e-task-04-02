import { takeEvery, put } from 'redux-saga/effects'
import {
  addProductToCart,
  addProductToLocalCart, changeLocalProductNumber, changeServiceProductNumber,
  deleteProductFromCart, deleteProductFromLocalCart,
  loadCarts,
  saveCarts,
} from '../actions/cart.action'
import axios from 'axios'

// 将商品添加到购物车中
function * handleAddProductToCart (action) {
  const { data } = yield axios.post('http://localhost:3005/cart/add', { gid: action.payload })
  yield put(addProductToLocalCart(data))
}

function * handleLoadCarts () {
  const { data } = yield axios.get('http://localhost:3005/cart')
  yield put(saveCarts(data))
}

function * handleDeleteProductFromCart (action) {
  const { data } = yield axios.delete('http://localhost:3005/cart/delete', { params: { cid: action.payload } })
  yield put(deleteProductFromLocalCart(data.index))
}

function * handleChangeServiceProductNumber (action) {
  const { data } = yield axios.put('http://localhost:3005/cart', action.payload)
  yield put(changeLocalProductNumber(data))
}

export default function * cartSaga () {
  // 将商品添加到购物车中
  yield takeEvery(addProductToCart, handleAddProductToCart)
  // 请求购物车列表数据
  yield takeEvery(loadCarts, handleLoadCarts)
  // 发送请求，删除商品
  yield takeEvery(deleteProductFromCart, handleDeleteProductFromCart)
  // 发送请求，更改某一个商品的数量
  yield takeEvery(changeServiceProductNumber, handleChangeServiceProductNumber)
}

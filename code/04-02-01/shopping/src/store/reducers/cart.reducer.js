import { handleActions } from 'redux-actions'
import {
  addProductToLocalCart,
  changeLocalProductNumber,
  deleteProductFromLocalCart,
  saveCarts,
} from '../actions/cart.action'

const initialState = []

// 将商品添加到本地的购物车数据中
const handleAddProductToLocalCart = (state, action) => {
  // 不直接操作参数state，拷贝一份
  const newState = JSON.parse(JSON.stringify(state))
  const product = newState.find(product => product.id === action.payload.id)
  if (product) {
    // 2. 已有商品，数量递增
    product.count = product.count + 1
  } else {
    // 1. 新添加商品，直接添加
    newState.push(action.payload)
  }
  return newState
}

// 请求购物车列表数据，回填到本地购物车
const handleSaveCarts = (state, action) => action.payload

// 删除本地购物车商品
const handleDeleteProductFromLocalCart = (state, action) => {
  // 不直接操作参数state，拷贝一份
  const newState = JSON.parse(JSON.stringify(state))
  newState.splice(action.payload, 1)
  return newState
}

// 更改本地购物车中的某一个商品的数量
const handleChangeLocalProductNumber = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  const product = newState.find(product => product.id === action.payload.id)
  product.count = action.payload.count
  return newState
}

export default handleActions({
  // 将商品添加到本地的购物车数据中
  [addProductToLocalCart]: handleAddProductToLocalCart,
  // 请求购物车列表数据，回填到本地购物车
  [saveCarts]: handleSaveCarts,
  // 删除本地购物车商品
  [deleteProductFromLocalCart]: handleDeleteProductFromLocalCart,
  // 更改本地购物车中的某一个商品的数量
  [changeLocalProductNumber]: handleChangeLocalProductNumber,
}, initialState)

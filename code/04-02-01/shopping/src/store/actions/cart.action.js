import { createAction } from 'redux-actions'

// 1. 添加购物车
export const addProductToCart = createAction('addProductToCart')
// 2. 将商品添加到本地的购物车数据中
export const addProductToLocalCart = createAction('addProductToLocalCart')

// 3. 请求购物车列表数据
export const loadCarts = createAction('loadCarts')
// 4. 将服务器端返回的购物车列表同步到本地的购物车中
export const saveCarts = createAction('saveCarts')

// 5. 发送请求，删除商品
export const deleteProductFromCart = createAction('deleteProductFromCart')

// 6. 删除本地购物车商品
export const deleteProductFromLocalCart = createAction('deleteProductFromLocalCart')

// 7. 发送请求，更改某一个商品的数量
export const changeServiceProductNumber = createAction('changeServiceProductNumber')
// 8. 更改本地购物车中的某一个商品的数量
export const changeLocalProductNumber = createAction('changeLocalProductNumber')

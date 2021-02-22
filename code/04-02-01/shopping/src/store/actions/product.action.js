import { createAction } from 'redux-actions'

// 发送请求，获取商品列表数据
export const loadProducts = createAction('load products')
// 将请求的数据保存到本地 store 中
export const saveProducts = createAction('save products')

import { applyMiddleware, createStore } from 'redux'
import reducer from './reducers'
// import thunk from 'redux-thunk'
// import logger from './middlewares/logger'
// import thunk from './middlewares/thunk'
import createSagaMiddleware from 'redux-saga'
import indexSaga from './sagas'

// 创建 sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer, applyMiddleware(sagaMiddleware))

// 启动
sagaMiddleware.run(indexSaga)

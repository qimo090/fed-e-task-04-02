/*
  createStore(reducer, preloadedState, enhancer)
  {
    getState, dispatch, subscribe
  }
 */
function createStore (reducer, preloadedState, enhancer) {
  // 约束参数 reducer 类型
  if (typeof reducer !== 'function') {
    throw new Error('reducer must be a function')
  }
  // 判断 enhancer 参数有没有传递
  if (typeof enhancer !== 'undefined') {
    // 判断 enhancer 是不是一个函数
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer must be a function')
    }
    return enhancer(createStore)(reducer, preloadedState)
  }
  // store 对象中存储的状态
  let currentState = preloadedState
  // 存放订阅者函数
  let currentListeners = []

  // 获取状态
  function getState () {
    return currentState
  }

  // 触发 action
  function dispatch (action) {
    // 判断 action 是否是对象
    if (!isPlainObject(action)) {
      throw new Error('action must be a object')
    }
    // 判断对象中是否具有 type 属性
    if (typeof action.type === 'undefined') {
      throw new Error('action must has a type prototype')
    }
    currentState = reducer(currentState, action)
    // 循环数组，调用订阅者
    for (let i = 0; i < currentListeners.length; i++) {
      // 获取订阅者
      let listener = currentListeners[i]
      // 调用订阅者
      listener()
    }
  }

  // 订阅状态
  function subscribe (listener) {
    currentListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}

// 判断 obj 是否是对象
function isPlainObject (obj) {
  // 排除基本数据类型和 null
  if (typeof obj !== 'object' || obj === null) {
    return false
  }
  // 区分数组和对象
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(obj) === proto
}

function applyMiddleware (...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      // 创建 store
      let store = createStore(reducer, preloadedState)
      // 阉割版的 store
      let middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch,
      }
      // 调用中间件的第一层函数，传递阉割版的store对象
      let chain = middlewares.map(middleware => middleware(middlewareAPI))
      let dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch,
      }
    }
  }
}

function compose () {
  let funcs = [...arguments]
  return function (dispatch) {
    for (let i = funcs.length - 1; i >= 0; i--) {
      dispatch = funcs[i](dispatch)
    }
    return dispatch
  }
}

function bindActionCreators (actionCreators, dispatch) {
  let boundActionCreators = {}

  for (let key in actionCreators) {
    boundActionCreators[key] = function () {
      dispatch(actionCreators[key]())
    }
  }

  return boundActionCreators
}

function combineReducers (reducers) {
  // 1. 检查reducer类型，必须是函数
  let reducerKeys = Object.keys(reducers)
  for (let i = 0; i < reducerKeys.length; i++) {
    let key = reducerKeys[i]
    if (typeof reducers[key] !== 'function') {
      throw new Error('reducer must be a function')
    }
  }
  // 2. 调用一个个小reducer，将每个小reducer返回的状态存储到一个大对象中返回
  return function (state, action) {
    let nextState = {}
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i]
      let reducer = reducers[key]
      let prevStateForKey = state[key]

      nextState[key] = reducer(prevStateForKey, action)
    }
    return nextState
  }
}

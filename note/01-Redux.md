# 资源

[Redux - A predictable state container for JavaScript apps. | Redux](https://redux.js.org/)

[自述](https://www.redux.org.cn/)

# 目录

1. Redux 核心
2. React + Redux
3. Redux 中间件
4. Redux 常用中间件
5. Redux 综合案例

# 1. Redux 核心

## 1.1 Redux 介绍

Javascript 状态容器，提供可预测化的状态管理

```jsx
const state = {
	modelOpen: 'yes',
	btnClicked: 'no',
	btnActiveClass: 'active',
	page: 5,
	size: 10
}
```

## 1.2 获取 Redux

[官网](https://redux.js.org/)

[CDN](https://www.bootcdn.cn/redux/)

```jsx
<script src="https://cdn.bootcdn.net/ajax/libs/redux/4.0.5/redux.min.js"></script>
```

## 1.3 Redux 核心概念及工作流程

![redux](https://tva1.sinaimg.cn/large/008eGmZEgy1gn215du43fj30p80am3yx.jpg)
- Store：存储状态的容器，Javascript 对象
- View：视图，HTML 页面
- Actions：对象，描述对状态进行怎样的操作
- Reducers：函数，操作状态并返回新的状态

## 1.4 Redux 核心

```jsx
// 创建 Store 状态容器
const store = Redux.createStore(reducer);
// 创建用于处理状态的 reducer 函数
function reducer (state = initialState, action) {}
// 获取状态
store.getState();
// 订阅状态
store.subscribe(function () {})
// 触发 Action
store.dispatch({ type: 'description...' })
```

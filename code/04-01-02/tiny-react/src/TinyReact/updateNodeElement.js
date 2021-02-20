export default function updateNodeElement (newElement, virtualDOM = {}, oldVirtualDOM = {}) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}
  Object.keys(newProps).forEach(propName => {
    // 获取属性值
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否是 事件属性
      if (propName.slice(0, 2) === 'on') {
        // 事件名称
        const eventName = propName.toLowerCase().slice(2)
        // 添加事件
        newElement.addEventListener(eventName, newPropsValue)
        // 删除原有的事件处理函数
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue)
        }
      } else if (['value', 'checked'].includes(propName)) {
        // value, checked 表单项特殊属性处理
        newElement[propName] = newPropsValue
      } else if (propName !== 'children') {
        // 剔除 children 属性
        if (propName === 'className') {
          // className
          newElement.setAttribute('class', newPropsValue)
        } else {
          // 普通属性
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }

  })

  // 判断属性被删的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (!newPropsValue) {
      // 属性被删除
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })
}

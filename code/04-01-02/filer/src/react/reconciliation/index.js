import { arrified, createStateNode, createTaskQueue, getRoot, getTag } from '../Misc'
import { updateNodeElement } from '../DOM'

// 任务队列
const taskQueue = createTaskQueue()
// 要执行的子任务
let subTask = null
//
let pendingCommit = null

const commitAllWork = fiber => {
  fiber.effects.forEach(item => {

    if (item.tag === 'class_component') {
      item.stateNode.__fiber = item
    }

    if (item.effectTag === 'delete') {
      item.parent.stateNode.removeChild(item.stateNode)
    } else if (item.effectTag === 'update') {
      /**
       * 更新
       */
      if (item.type === item.alternate.type) {
        /**
         * 节点类型相同
         */
        updateNodeElement(item.stateNode, item, item.alternate)
      } else {
        /**
         * 节点类型不同
         */
        item.parent.stateNode.replaceChild(item.stateNode, item.alternate.stateNode)
      }
    } else if (item.effectTag === 'placement') {
      let fiber = item
      let parentFiber = item.parent
      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent
      }
      if (fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(fiber.stateNode)
      }
    }
  })
  /**
   * 备份旧的 fiber 节点对象
   */
  fiber.stateNode.__rootFiberContainer = fiber
}

const getFirstTask = () => {
  /*
  * 从任务队列中获取任务
  * */
  const task = taskQueue.pop()

  if (task.from === 'class_component') {
    /**
     * 组件状态更新任务
     */
    const root = getRoot(task.instance)
    task.instance.__fiber.partialState = task.partialState

    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: 'host_root',
      effects: [],
      child: null,
      alternate: root,
    }
  }

  /**
   * 返回最外层节点的 fiber 对象
   */
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer,
  }
}

const reconcileChildren = (fiber, children) => {
  /**
   * children 可能是对象，也可能是数组，统一转为数组
   */
  const arrifiedChildren = arrified(children)

  let index = 0
  let numberOfElements = arrifiedChildren.length
  let element = null
  let newFiber = null
  let prevFiber = null
  let alternate = null

  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child
  }

  while (index < numberOfElements || alternate) {
    element = arrifiedChildren[index]

    if (!element && alternate) {
      /**
       * 删除操作
       */
      alternate.effectTag = 'delete'
      fiber.effects.push(alternate)
    } else if (element && alternate) {
      /**
       * 更新
       */
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: 'update',
        parent: fiber,
        alternate,
      }
      if (element.type === alternate.type) {
        /**
         * 类型相同
         */
        newFiber.stateNode = alternate.stateNode
      } else {
        /**
         * 类型不同
         */
        newFiber.stateNode = createStateNode(newFiber)
      }
    } else if (element && !alternate) {
      /**
       * 初始化渲染
       */
      // 子级 fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: 'placement',
        parent: fiber,
      }
      /**
       * 为 fiber 节点添加DOM对象或组件实例对象
       */
      newFiber.stateNode = createStateNode(newFiber)
    }

    if (index === 0) {
      fiber.child = newFiber
    } else if (element) {
      prevFiber.sibling = newFiber
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling
    } else {
      alternate = null
    }

    prevFiber = newFiber
    index++
  }
}

const executeTask = fiber => {
  /**
   * 构建子级fiber对象
   */
  if (fiber.tag === 'class_component') {

    if (fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState,
      }
    }

    reconcileChildren(fiber, fiber.stateNode.render())
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  } else {
    reconcileChildren(fiber, fiber.props.children)
  }
  /**
   * 如果子级存在，返回子级
   * 并将这个子级当作父级，构建这个父级下的子级
   */
  if (fiber.child) {
    return fiber.child
  }

  let currentExecutelyFiber = fiber

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber]),
    )
    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling
    }
    currentExecutelyFiber = currentExecutelyFiber.parent
  }

  pendingCommit = currentExecutelyFiber
}

const workLoop = (deadline) => {
  // 如果子任务不存在，就去获取子任务
  if (!subTask) {
    subTask = getFirstTask()
  }

  /**
   * 如果任务存在并且浏览器有空余时间，
   * 就调用 executeTask 方法执行任务，接受任务并返回新的任务
   */
  while (subTask && deadline.timeRemaining() > 0) {
    subTask = executeTask(subTask)
  }

  if (pendingCommit) {
    commitAllWork(pendingCommit)
  }
}

const performTask = (deadline) => {
  // 执行任务
  workLoop(deadline)
  /*
  * 判断任务是否存在且任务队列中是否还有任务存在，
  * 告诉浏览器空闲时间继续执行任务
  * */
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask)
  }
}

export const render = (element, dom) => {
  /**
   * 1. 向任务队列添加任务
   * 2. 指定浏览器空闲时执行任务
   */
  /**
   * 任务就是通过 vdom 对象构建 fiber 对象
   */
  taskQueue.push({
    dom,
    props: {
      children: element,
    },
  })

  requestIdleCallback(performTask)

}

export const scheduleUpdate = (instance, partialState) => {
  taskQueue.push({
    from: 'class_component',
    instance,
    partialState,
  })
  requestIdleCallback(performTask)
}

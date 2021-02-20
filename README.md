1. 请简述 React 16 版本中初始渲染的流程

   要将 React 元素渲染到页面中，分为两个阶段，render 阶段和 commit 阶段。

    1. render 阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作。

    2. commit 阶段负责根据 Fiber 节点标记 ( effectTag ) 进行相应的 DOM 操作。

2. 为什么 React 16 版本中 render 阶段放弃了使用递归

   React 16 之前的版本比对更新 VirtualDOM 的过程是采用循环加递归实现的， 这种比对方式有一个问题，就是一旦任务开始进行就无法中断，如果应用中组件数量庞大，主线程被长期占用，直到整棵 VirtualDOM
   树比对更新完成之后主线程才能被释放，主线程才能执行其他任务。 这就会导致一些用户交互，动画等任务无法立即得到执行，页面就会产生卡顿, 非常的影响用户体验。

   **核心问题：** 递归无法中断，执行重任务耗时长。 JavaScript 又是单线程，无法同时执行其他任务，导致任务延迟页面卡顿，用户体验差。

3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

    + `before mutation` 阶段（执行 `DOM` 操作前）

      在 `before mutation` 阶段，会遍历 `effectList`，依次执行：

        1. 处理 `DOM` 节点 渲染/删除后的 `autoFocus`、`blur` 逻辑

        2. 调用 `getSnapshotBeforeUpdate` 生命周期钩子

        3. 调度 `useEffect`

    + `mutation` 阶段（执行 `DOM` 操作）

      `mutation` 阶段会遍历 `effectList`，依次执行 `commitMutationEffects`。该方法的主要工作为“根据 `effectTag` 调用不同的处理函数处理 `Fiber` 。

        1. 根据 `ContentReset effectTag` 重置文字节点
        2. 更新 `ref`
        3. 根据 `effectTag` 分别处理，其中 `effectTag` 包括(`Placement | Update | Deletion | Hydrating`)
        4. `Placement`

           获取父级DOM节点。其中 `finishedWork` 为传入的Fiber节点 获取Fiber节点的DOM兄弟节点 根据DOM兄弟节点是否存在决定调用 `parentNode.insertBefore`
           或 `parentNode.appendChild` 执行DOM插入操作

        5. `Update`

           执行所有 `useLayoutEffect hook` 的销毁函数。 调用 `commitWork`

        6. `Deletion`

           递归调用Fiber节点及其子孙Fiber节点中 `fiber.tag` 为 ClassComponent 的 `componentWillUnmount`
           生命周期钩子，从页面移除Fiber节点对应DOM节点

           解绑 `ref`

           调度 `useEffect` 的销毁函数

    + `layout` 阶段（执行 `DOM` 操作后）

      `layout` 阶段会遍历 `effectList`，依次执行 `commitLayoutEffects` 。该方法的主要工作为“根据 `effectTag` 调用不同的处理函数处理Fiber并更新 `ref`

        1. 调用 `componentDidxxx`
        2. 调用 `this.setState` 第二个参数回调函数
        3. 调用 `useLayoutEffect hook` 的回调函数(与 `mutation` 的销毁函数是同步的)，调度 `useEffect` 的销毁与回调函数(在 `before mutation`
           只是先调度加入异步任务，在这里才真正执行),因此 `useLayoutEffect` 是同步的，`useEffect` 是异步的
        4. 获取DOM实例，更新 `ref`
        5. `current Fiber` 树切换(`workInProgress Fiber` 树在 `commit` 阶段完成渲染后会变为 `current Fiber` 树)

4. 请简述 workInProgress Fiber 树存在的意义是什么

   在`React`中最多会同时存在两棵`Fiber树`。当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。

   `current Fiber树`中的`Fiber节点`被称为`current fiber`，`workInProgress Fiber树`中的`Fiber节点`被称为`workInProgress fiber`
   ，他们通过`alternate`属性连接。

    ```js
      currentFiber.alternate === workInProgressFiber;
      workInProgressFiber.alternate === currentFiber;
    ```

   `React`应用的根节点通过`current`指针在不同`Fiber树`的`rootFiber`间切换来实现`Fiber树`的切换。

   当`workInProgress Fiber树`构建完成交给`Renderer`渲染在页面上后，应用根节点的`current`指针指向`workInProgress Fiber树`，此时`workInProgress Fiber树`
   就变为`current Fiber树`。

   每次状态更新都会产生新的`workInProgress Fiber树`，通过`current`与`workInProgress`的替换，完成`DOM`更新。

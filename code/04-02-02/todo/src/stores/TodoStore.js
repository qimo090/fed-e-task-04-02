import { action, computed, observable } from 'mobx'

class TodoStore {
  // todolist
  @observable todos = []

  // 筛选条件
  @observable filter = 'All'

  /**
   * 添加任务
   * @param {string} taskName - 任务名称
   */
  @action.bound todoAdd (taskName) {
    this.todos.push({
      taskName,
      isCompleted: false,
    })
  }

  /**
   * 删除任务
   * @param {number} index - 当前任务对应的索引
   */
  @action.bound todoDelete (index) {
    this.todos.splice(index, 1)
  }

  /**
   * 更改任务的状态
   * @param {number} index - 当前任务对应的索引
   * @param {boolean} flag - 当前任务是否已完成
   */
  @action.bound changeCompleted (index, flag) {
    this.todos[index].isCompleted = flag
  }

  @computed get unfinishedTodoCount () {
    return this.todos.reduce((acc, cur) => cur.isCompleted ? acc : acc + 1, 0)
  }

  /**
   * 更改筛选条件
   * @param {string} condition - 筛选条件
   */
  @action.bound changeFilter (condition) {
    this.filter = condition
  }

  // 监听筛选条件，返回对应的todo列表
  @computed get filterTodo () {
    switch (this.filter) {
      case 'All':
        return this.todos
      case 'Active':
        return this.todos.filter(todo => todo.isCompleted === false)
      case 'Completed':
        return this.todos.filter(todo => todo.isCompleted === true)
      default:
        return this.todos
    }
  }

  // 清空已完成任务
  @action.bound clearCompleted () {
    this.todos = this.todos.filter(todo => todo.isCompleted === false)
  }
}

const todo = new TodoStore()

export default todo

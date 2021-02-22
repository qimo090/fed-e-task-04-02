import AddTodo from './addTodo'
import TodoList from './todoList'
import TodoExtra from './todoExtra'

function App () {
  return (
    <section className="todoapp">
      <AddTodo/>
      <TodoList/>
      <TodoExtra/>
    </section>
  )
}

export default App

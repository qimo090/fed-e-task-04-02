import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
import { Provider } from 'mobx-react'
import todo from './stores/TodoStore'

ReactDOM.render(
  <React.StrictMode>
    <Provider todo={todo}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'mobx-react'
import apples from './stores/AppleStore'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={apples}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)


import React, { render, Component } from './react'

const root = document.getElementById('root')

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hi Fiber</p>
  </div>
)

// render(jsx, root)
//
// setTimeout(() => {
//   const jsx = (
//     <div>
//       <p>Update React</p>
//     </div>
//   )
//   render(jsx, root)
// }, 2000)

class Greeting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'tom',
    }
  }

  render () {
    return (
      <div>
        {this.props.title} hahahah {this.state.name}
        <button onClick={() => this.setState({ name: 'jack' })}>Changed</button>
      </div>
    )
  }
}

render(<Greeting title="hi"/>, root)

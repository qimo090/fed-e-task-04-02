import React, { Component } from 'react'

const Person = props => (
  <input type="text" value={props.name} onChange={props.changed} />
)

export default class extends Component {
  constructor() {
    super()
    this.state = {
      name: '张三',
    }
    this.nameChanged = this.nameChanged.bind(this)
  }

  nameChanged(event) {
    this.setState({
      name: event.target.value,
    })
  }

  render() {
    return (
      <div>
        {this.state.name}
        <Person name={this.state.name} changed={this.nameChanged} />
      </div>
    )
  }
}

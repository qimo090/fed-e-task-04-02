import React, { Component } from 'react'

export default class Input extends Component {
  constructor() {
    super()
    this.inputRef = React.createRef()
    this.focusInput = this.focusInput.bind(this)
  }
  focusInput() {
    this.inputRef.current.focus()
  }
  render() {
    return <input type="text" ref={this.inputRef} />
  }
}

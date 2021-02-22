import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as counterActions from '../store/actions/counter.action'

function Counter ({ count, increment, decrement, increment_async }) {
  return (
    <div>
      <button onClick={() => decrement(10)}>-</button>
      <span>{count}</span>
      <button onClick={() => increment(10)}>+</button>
      <button onClick={() => increment_async(10)}>+ async</button>
    </div>
  )
}

const mapStateToProps = state => ({
  count: state.counter.count,
})

const mapDispatchToProps = dispatch => bindActionCreators(counterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

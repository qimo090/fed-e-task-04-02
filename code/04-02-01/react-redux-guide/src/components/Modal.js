import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../store/actions/modal.action'

/**
 * 弹出框
 * @param {boolean} showStatus - 控制弹出框的显示
 * @param {function} show - 控制显示
 * @param {function} hide - 控制隐藏
 * @return {JSX.Element}
 * @constructor
 */
function Modal ({ showStatus, show, hide, show_async }) {
  const styles = {
    width: 200,
    height: 200,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -100,
    marginTop: -100,
    backgroundColor: 'skyblue',
    display: showStatus ? 'block' : 'none',
  }
  return (
    <div>
      <button onClick={show_async}>显示</button>
      <button onClick={hide}>隐藏</button>
      <div style={styles}>1</div>
    </div>
  )
}

const mapStateToProps = state => ({
  showStatus: state.modal.show,
})

const mapActionToProps = dispatch => bindActionCreators(modalActions, dispatch)

export default connect(mapStateToProps, mapActionToProps)(Modal)

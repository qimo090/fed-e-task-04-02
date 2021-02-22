import React from 'react'
import '../assets/styles/appleItem.scss'
import { observer } from 'mobx-react'

@observer
class AppleItem extends React.Component {
  render () {
    let { apple, eatApple } = this.props

    return (
      <div className="appleItem">
        <div className="apple"><img src={require('../assets/images/apple.png')} alt=""/></div>
        <div className="info">
          <div className="name">红苹果 - {apple.id}号</div>
          <div className="weight">{apple.weight}克</div>
        </div>
        <div className="btn-div">
          <button onClick={() => eatApple(apple.id)}> 吃掉</button>
        </div>
      </div>
    )
  }
}

export default AppleItem

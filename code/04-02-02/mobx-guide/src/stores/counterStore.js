// 1. 创建 store 对象，存储默认状态 0
// 2. 将 store 对象放在全局
// 3. 让组件获取 store 对象中的状态
import { observable, action, configure, runInAction, flow, computed, autorun } from 'mobx'
import axios from 'axios'

configure({ enforceActions: 'observed' })

class CounterStore {

  constructor () {
    autorun(() => {
      try {
        uniqueUsername(this.username)
        console.log('用户名可用')
      } catch (e) {
        console.log(e.message)
      }
    }, {
      delay: 2000,
    })
  }

  @observable count = 0
  @observable users = []
  @observable username = ''

  @action.bound increment () {
    this.count += 1
  }

  @action.bound decrement () {
    this.count -= 1
  }

  // @action.bound
  // async getData () {
  //   let { data } = await axios.get('https://api.github.com/users')
  //   runInAction(() => this.users = data)
  // }
  // getData = flow(function * () {
  //   let { data } = yield axios.get('https://api.github.com/users')
  //   this['users'] = data
  // }).bind(this)

  @computed get getResult () {
    return this.count * 10
  }

  @action.bound changeUsername (username) {
    this.username = username
  }
}

const counter = new CounterStore()

function uniqueUsername (username) {
  return new Promise((resolve, reject) => {
    if (username === 'admin') {
      reject('用户名已存在')
    } else {
      resolve()
    }
  })
}

export default counter

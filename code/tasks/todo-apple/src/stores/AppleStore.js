import { action, computed, observable } from 'mobx'

class AppleStore {
  // 苹果列表
  @observable apples = []
  // 新苹果的id
  @observable newAppleId = 3
  // 是否在采摘中
  @observable isPicking = false
  // 底部按钮文本
  @observable buttonText = '摘苹果'

  /**  计算当前已吃和未吃苹果的状态 */
  @computed get status () {
    let status = {
      appleNow: {
        quantity: 0,
        weight: 0,
      },
      appleEaten: {
        quantity: 0,
        weight: 0,
      },
    }
    this.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten' : 'appleNow'
      status[selector].quantity++
      status[selector].weight += apple.weight
    })
    return status
  }

  /* 摘苹果的异步操作 */
  @action.bound pickApple () {
    /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
    if (this.isPicking) {
      return false
    }

    this.isPicking = true
    this.buttonText = '正在采摘...'
    // 模拟异步
    fetch('https://api.github.com/users')
      .then(res => {
        let weight = Math.floor(200 + Math.random() * 50)
        this.isPicking = false
        this.buttonText = '摘苹果'
        this.apples.push({
          id: this.newAppleId++,
          weight: weight,
          isEaten: false,
        })
      })
  }

  // 吃苹果
  @action.bound eatApple (appleId) {
    let targetIndex = ''
    this.apples.forEach((apple, index) => {
      if (apple.id === appleId) {
        targetIndex = index
      }
    })
    this.apples[targetIndex].isEaten = true
  }
}

const apples = new AppleStore()

export default apples

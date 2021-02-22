import { takeEvery, put, delay } from 'redux-saga/effects'
import { increment } from '../actions/counter.action'
import { INCREMENT_ASYNC } from '../const/counter.const'
// takeEvery 接受 action
// put 触发 action

function * increment_async_fn (action) {
  yield delay(2000)
  yield put(increment(action.payload))
}

export default function * counterSaga () {
  // 接受 action
  yield takeEvery(INCREMENT_ASYNC, increment_async_fn)
}

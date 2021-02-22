import { takeEvery, put, delay } from 'redux-saga/effects'
import { SHOW_MODAL_ASYNC } from '../const/modal.const'
import { show } from '../actions/modal.action'

function * showModal_async_fn () {
  yield delay(2000)
  yield put(show())
}

export default function *modalSaga () {
  yield takeEvery(SHOW_MODAL_ASYNC, showModal_async_fn)
}

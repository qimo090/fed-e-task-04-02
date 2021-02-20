import mountNativeElement from './mountNativeElement'
import isFunction from './isFuntion'
import mountComponent from './mountComponent'

export default function mountElement (virtualDOM, container, oldDOM) {
  // Component VS NativeElement
  if (isFunction(virtualDOM)) {
    // Component
    mountComponent(virtualDOM, container, oldDOM)
  } else {
    // NativeElement
    mountNativeElement(virtualDOM, container, oldDOM)
  }
}

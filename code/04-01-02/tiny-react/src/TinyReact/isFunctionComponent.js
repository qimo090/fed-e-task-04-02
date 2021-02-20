import isFunction from './isFuntion'

export default function isFunctionComponent (virtualDOM) {
  const type = virtualDOM.type
  return type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
}
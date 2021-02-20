export default function createElement (type, props = {}, ...children) {
  const childElements = [].concat(...children).reduce((result, child) => {
    if (![false, true, null].includes(child)) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        // 文本节点需要特殊处理
        result.push(createElement('text', { textContent: child }))
      }
    }
    return result
  }, [])
  return {
    type,
    props: Object.assign({ children: childElements }, props),
  }
}

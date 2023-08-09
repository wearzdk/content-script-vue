function imitateInput(el: any, val: string) {
  if (!el)
    return
  el.focus()
  const keyboardEventInit = { bubbles: false, cancelable: false, composed: false, key: '', code: '', location: 0 }
  el.dispatchEvent(new KeyboardEvent('keydown', keyboardEventInit))
  const lastValue = el.value
  el.value = val
  el.dispatchEvent(new KeyboardEvent('keyup', keyboardEventInit))
  // el.dispatchEvent(new Event('change', { bubbles: true })) // usually not needed
  const inputEvent = new Event('input', { bubbles: true }) as any
  // hack React15
  inputEvent.simulated = true

  // hack React16 内部定义了descriptor拦截value，此处重置状态
  const tracker = el._valueTracker
  if (tracker)
    tracker.setValue(lastValue)
  el.dispatchEvent(inputEvent)
}

function imitateClick(el: any) {
  if (!el)
    return
  el.focus()
  el.dispatchEvent(new Event('mousedown', { bubbles: true }))
  el.dispatchEvent(new Event('click', { bubbles: true }))
  el.click()
}

export {
  imitateInput,
  imitateClick,
}

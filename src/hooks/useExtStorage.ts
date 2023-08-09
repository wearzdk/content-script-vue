import type { WatchOptions } from 'vue'

interface ExtStorage {
  get: (key: string) => Promise<{ [key: string]: any } | null>
  set: (data: { [key: string]: any }) => Promise<void>
}

// localStorage engine
const localStorageExt: ExtStorage = {
  get: (key: string) => {
    return new Promise((resolve) => {
      const value = localStorage.getItem(key)
      if (value) {
        resolve({ [key]: JSON.parse(value) })
        return
      }
      resolve(null)
    })
  },
  set: (data: { [key: string]: any }) => {
    return new Promise((resolve) => {
      for (const item in data)
        localStorage.setItem(item, JSON.stringify(data[item]))

      resolve()
    })
  },
}

// 定义类型
declare const chrome: any
declare const browser: any
declare const GM_setValue: any
declare const GM_getValue: any

// GM engine
const GMExt: ExtStorage = {
  get: (key: string) => {
    return new Promise((resolve) => {
      const value = GM_getValue(key)
      if (value) {
        resolve({ [key]: JSON.parse(value) })
        return
      }
      resolve(null)
    })
  },
  set: (data: { [key: string]: any }) => {
    return new Promise((resolve) => {
      for (const item in data)
        GM_setValue(item, JSON.stringify(data[item]))

      resolve()
    })
  },
}

function getEngine() {
  if (chrome?.storage?.local)
    return chrome.storage.local as ExtStorage
  // firefox
  if (browser?.storage?.local)
    return browser.storage.local as ExtStorage
  if (typeof GM_setValue === 'function' && typeof GM_getValue === 'function')
    return GMExt
  return localStorageExt
}

const $db = getEngine()
export function useExtStorage<T>(key: string, defaultValue: T, option?: WatchOptions) {
  const data = ref<T>(defaultValue)
  const sync = async () => {
    const res = await $db.get(key)
    console.log(res)
    if (res && res[key])
      data.value = res[key]
    else
      $db.set({ [key]: toRaw(data.value) })
  }
  sync().then(() => {
    watch(data, () => {
      $db.set({ [key]: toRaw(data.value) })
    }, option)
  })
  return data
}

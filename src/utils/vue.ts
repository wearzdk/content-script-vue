/**
 * 获取 Vue 实例指定名称的组件
 * @param instance
 * @param name 组件名称
 * @returns 组件实例
 */
export function findComponentByName<T = any>(instance: any, name: string): T | null {
  if (!instance)
    return null

  if (instance.$options.name === name) {
    return instance
  }
  for (let i = 0; i < instance.$children.length; i++) {
    const found = findComponentByName(instance.$children[i], name)
    if (found) {
      return found
    }
  }

  return null
}
